import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' })
  }

  const token = header.slice(7).trim()
  if (!token) {
    return res.status(401).json({ error: 'Empty token' })
  }

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? 'token_expired' : 'invalid_token'
    return res.status(401).json({ error: code })
  }

  const agent = await prisma.agent.findUnique({
    where: { id: payload.sub },
    select: { id: true, alias: true, role: true, specialization: true, roleInHeist: true, status: true, isOnline: true },
  })

  if (!agent) {
    return res.status(401).json({ error: 'Agent not found' })
  }

  req.agent = agent
  next()
}
