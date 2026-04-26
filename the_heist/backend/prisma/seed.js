import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const SEED_PASSWORD = 'heist2026'
const BCRYPT_ROUNDS = 10

async function main() {
  const hash = await bcrypt.hash(SEED_PASSWORD, BCRYPT_ROUNDS)

  const agents = [
    {
      alias: 'the_godfather',
      role: 'GODFATHER',
      specialization: 'Operations Lead',
      roleInHeist: 'Godfather',
      status: 'ACTIVE',
      isOnline: true,
      heistCount: 3,
      missionsCount: 12,
      recruitmentDate: new Date('2026-01-15'),
    },
    {
      alias: 'ghost_rider',
      role: 'AGENT',
      specialization: 'Driver - Extractor',
      roleInHeist: 'Driver',
      status: 'STANDBY',
      isOnline: false,
      heistCount: 2,
      missionsCount: 5,
      recruitmentDate: new Date('2026-02-03'),
    },
    {
      alias: 'shadow_fox',
      role: 'AGENT',
      specialization: 'Infiltration - Hacker',
      roleInHeist: 'Hacker',
      status: 'ON_MISSION',
      isOnline: false,
      heistCount: 2,
      missionsCount: 4,
      recruitmentDate: new Date('2026-02-10'),
    },
    {
      alias: 'iron_wraith',
      role: 'AGENT',
      specialization: 'Perimeter - Lookout',
      roleInHeist: 'Lookout',
      status: 'AVAILABLE',
      isOnline: false,
      heistCount: 1,
      missionsCount: 3,
      recruitmentDate: new Date('2026-03-02'),
    },
  ]

  for (const a of agents) {
    await prisma.agent.upsert({
      where: { alias: a.alias },
      update: {},
      create: { ...a, password: hash },
    })
  }

  const byAlias = Object.fromEntries(
    (await prisma.agent.findMany()).map((a) => [a.alias, a.id])
  )

  const missions = [
    { title: 'Hack the vault security grid', priority: 'CRITICAL', status: 'THE_PLAN', assignee: null, date: '2026-03-10' },
    { title: 'Acquire fake IDs for border crossing', priority: 'HIGH', status: 'THE_PLAN', assignee: 'shadow_fox', date: '2026-03-08' },
    { title: 'Scout the museum floor plan', priority: 'LOW', status: 'THE_PLAN', assignee: null, date: '2026-03-15' },
    { title: 'Intercept guard rotation schedule', priority: 'CRITICAL', status: 'IN_PROGRESS', assignee: 'ghost_rider', date: '2026-03-05' },
    { title: 'Steal getaway vehicles — 3 units', priority: 'HIGH', status: 'IN_PROGRESS', assignee: 'iron_wraith', date: '2026-03-06' },
    { title: 'Bribe the night watchman', priority: 'LOW', status: 'THE_LOOT', assignee: 'shadow_fox', date: '2026-03-01' },
    { title: 'Set up safe house in the docks', priority: 'HIGH', status: 'THE_LOOT', assignee: 'ghost_rider', date: '2026-02-28' },
  ]

  await prisma.mission.deleteMany()
  for (const m of missions) {
    await prisma.mission.create({
      data: {
        title: m.title,
        priority: m.priority,
        status: m.status,
        date: new Date(m.date),
        assigneeId: m.assignee ? byAlias[m.assignee] : null,
      },
    })
  }

  const vehicles = [
    { name: 'Ferrari 458', year: '2022', color: 'Rosso Corsa', colorHex: '#a61d24', plate: 'GV-4421', status: 'IN_GARAGE', driver: 'ghost_rider', stashLocation: 'Docks — Unit 7B' },
    { name: 'BMW M3', year: '2023', color: 'Midnight Black', colorHex: '#111111', plate: 'GV-8873', status: 'IN_USE', driver: 'iron_wraith', stashLocation: null },
    { name: 'Audi RS6', year: '2021', color: 'Nardo Grey', colorHex: '#8f9396', plate: 'GV-1190', status: 'IN_GARAGE', driver: 'shadow_fox', stashLocation: 'Warehouse 12 — East' },
    { name: 'Porsche 911', year: '2020', color: 'Arctic Silver', colorHex: '#c8ccd1', plate: 'GV-3356', status: 'DUMPED', driver: null, stashLocation: 'River Bridge' },
    { name: 'Mercedes G63', year: '2023', color: 'Obsidian Black', colorHex: '#1a1a1a', plate: 'GV-7741', status: 'SOLD', driver: 'ghost_rider', stashLocation: null },
  ]

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { plate: v.plate },
      update: {},
      create: {
        name: v.name,
        year: v.year,
        color: v.color,
        colorHex: v.colorHex,
        plate: v.plate,
        status: v.status,
        stashLocation: v.stashLocation,
        driverId: v.driver ? byAlias[v.driver] : null,
      },
    })
  }

  const intel = [
    { title: 'Golden Vault — Master Plan Overview', description: 'Full breakdown of the vault entry strategy, guard schedules, escape routes and contingency protocols. Last updated by the_godfather. Do not share outside crew.', tags: ['Classified'], isPinned: true, author: 'the_godfather', date: '2026-03-03' },
    { title: 'Guard Rotation Schedule — East Wing', description: 'Guards rotate every 4 hours. Blind spot identified between 02:00–02:20. Window confirmed by shadow_fox on-site observation.', tags: ['Urgent', 'Recon'], isPinned: false, author: 'shadow_fox', date: '2026-03-01' },
    { title: 'Vault Access Codes — Alpha Layer', description: 'First layer digital codes obtained from inside contact. Expires in 72h. Use only on the night of operation. Do not log digitally.', tags: ['Classified'], isPinned: false, author: 'the_godfather', date: '2026-03-02' },
    { title: 'Escape Route — Northern Docks', description: 'Primary extraction point through northern docks. Boat confirmed available 01:00–03:00. Backup: river bridge crossing via ghost_rider.', tags: ['Recon'], isPinned: false, author: 'ghost_rider', date: '2026-02-28' },
    { title: 'Security Camera Blind Spots Map', description: 'Full layout of camera coverage gaps. Three dead zones identified on floors 2 and 3. Use stairwell B for vertical movement.', tags: ['Recon', 'Urgent'], isPinned: false, author: 'shadow_fox', date: '2026-02-25' },
    { title: 'Inside Contact — Vault Manager Profile', description: 'Background on internal asset. Schedule, habits, and leverage points documented. Handle with extreme discretion.', tags: ['Classified', 'Urgent'], isPinned: false, author: 'iron_wraith', date: '2026-02-22' },
  ]

  await prisma.intelFile.deleteMany()
  for (const i of intel) {
    await prisma.intelFile.create({
      data: {
        title: i.title,
        description: i.description,
        tags: JSON.stringify(i.tags),
        isPinned: i.isPinned,
        authorId: byAlias[i.author],
        createdAt: new Date(i.date),
      },
    })
  }

  console.log(`Seed OK — ${agents.length} agents, ${missions.length} missions, ${vehicles.length} vehicles, ${intel.length} intel files.`)
  console.log(`Seed password for all agents: "${SEED_PASSWORD}"`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
