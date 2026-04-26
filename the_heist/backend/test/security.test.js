import test from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import request from 'supertest'

process.env.JWT_SECRET = 'test-secret'
process.env.JWT_EXPIRES_IN = '1h'

const { app } = await import('../src/app.js')
const { prisma } = await import('../src/lib/prisma.js')

const godfather = {
  id: 1,
  alias: 'godfather',
  role: 'GODFATHER',
  specialization: null,
  roleInHeist: null,
  status: 'AVAILABLE',
  isOnline: true,
}

const agent = { ...godfather, id: 2, alias: 'agent', role: 'AGENT' }

function tokenFor(user, options = {}) {
  return jwt.sign({ sub: user.id, alias: user.alias, role: user.role }, process.env.JWT_SECRET, options)
}

function mockAuthUser(user = godfather) {
  prisma.agent.findUnique = async () => user
}

test.after(async () => {
  await prisma.$disconnect()
})

test('CRUD routes reject missing bearer token before hitting the database', async () => {
  const res = await request(app).get('/api/missions')

  assert.equal(res.status, 401)
  assert.equal(res.body.error, 'Missing or malformed Authorization header')
})

test('CRUD routes reject expired tokens with token_expired', async () => {
  const expiredToken = tokenFor(godfather, { expiresIn: '-1s' })

  const res = await request(app)
    .get('/api/vehicles')
    .set('Authorization', `Bearer ${expiredToken}`)

  assert.equal(res.status, 401)
  assert.equal(res.body.error, 'token_expired')
})

test('CRUD routes reject malformed tokens with invalid_token', async () => {
  const res = await request(app)
    .get('/api/intel')
    .set('Authorization', 'Bearer definitely-not-a-jwt')

  assert.equal(res.status, 401)
  assert.equal(res.body.error, 'invalid_token')
})

test('mission creation rejects invalid enums after auth', async () => {
  mockAuthUser(godfather)

  const res = await request(app)
    .post('/api/missions')
    .set('Authorization', `Bearer ${tokenFor(godfather)}`)
    .send({ title: 'Vault job', priority: 'INVALID', status: 'THE_PLAN' })

  assert.equal(res.status, 400)
  assert.equal(res.body.error, 'invalid_input')
})

test('vehicle creation rejects invalid numeric foreign keys after auth', async () => {
  mockAuthUser(godfather)

  const res = await request(app)
    .post('/api/vehicles')
    .set('Authorization', `Bearer ${tokenFor(godfather)}`)
    .send({
      name: 'Van',
      year: '2024',
      color: 'Black',
      colorHex: '#000000',
      plate: 'ABC-123',
      driverId: 'not-a-number',
    })

  assert.equal(res.status, 400)
  assert.equal(res.body.error, 'invalid_input')
})

test('non-GODFATHER agents cannot recruit accounts', async () => {
  mockAuthUser(agent)

  const res = await request(app)
    .post('/api/agents')
    .set('Authorization', `Bearer ${tokenFor(agent)}`)
    .send({ alias: 'new-agent', password: 'strongpass123', role: 'AGENT' })

  assert.equal(res.status, 403)
  assert.equal(res.body.error, 'forbidden')
})

test('GODFATHER recruitment validates and sanitizes numeric fields', async () => {
  mockAuthUser(godfather)

  let createInput
  prisma.agent.create = async (args) => {
    createInput = args.data
    return {
      id: 3,
      alias: args.data.alias,
      role: args.data.role,
      specialization: args.data.specialization,
      roleInHeist: args.data.roleInHeist,
      status: args.data.status,
      isOnline: args.data.isOnline,
      heistCount: args.data.heistCount,
      missionsCount: args.data.missionsCount,
      recruitmentDate: new Date(),
    }
  }

  const res = await request(app)
    .post('/api/agents')
    .set('Authorization', `Bearer ${tokenFor(godfather)}`)
    .send({
      alias: 'new-agent',
      password: 'strongpass123',
      role: 'AGENT',
      status: 'ACTIVE',
      heistCount: '2',
      missionsCount: '5',
    })

  assert.equal(res.status, 201)
  assert.equal(createInput.heistCount, 2)
  assert.equal(createInput.missionsCount, 5)
})
