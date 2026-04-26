// Mapping bidirectionnel entre les enums Prisma (SCREAMING_SNAKE) côté backend
// et les libellés Title-Case utilisés historiquement par le frontend.
// Centralisé ici pour ne pas avoir à toucher aux composants UI.

const MISSION_STATUS_TO_FRONT = {
  THE_PLAN: 'The Plan',
  IN_PROGRESS: 'In Progress',
  THE_LOOT: 'The Loot',
}
const MISSION_STATUS_TO_BACK = {
  'The Plan': 'THE_PLAN',
  'In Progress': 'IN_PROGRESS',
  'The Loot': 'THE_LOOT',
}

const MISSION_PRIORITY_TO_FRONT = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  LOW: 'Low',
}
const MISSION_PRIORITY_TO_BACK = {
  Critical: 'CRITICAL',
  High: 'HIGH',
  Low: 'LOW',
}

const VEHICLE_STATUS_TO_FRONT = {
  IN_GARAGE: 'In Garage',
  IN_USE: 'In Use',
  DUMPED: 'Dumped',
  SOLD: 'Sold',
}
const VEHICLE_STATUS_TO_BACK = {
  'In Garage': 'IN_GARAGE',
  'In Use': 'IN_USE',
  Dumped: 'DUMPED',
  Sold: 'SOLD',
}

const AGENT_ROLE_TO_FRONT = { GODFATHER: 'Godfather', AGENT: 'Agent' }
const AGENT_ROLE_TO_BACK = { Godfather: 'GODFATHER', Agent: 'AGENT' }

const AGENT_STATUS_TO_FRONT = {
  ACTIVE: 'Active',
  STANDBY: 'Standby',
  ON_MISSION: 'On Mission',
  AVAILABLE: 'Available',
}
const AGENT_STATUS_TO_BACK = {
  Active: 'ACTIVE',
  Standby: 'STANDBY',
  'On Mission': 'ON_MISSION',
  Available: 'AVAILABLE',
}

const AUTHOR_COLOR_BY_ALIAS = {
  the_godfather: 'bg-violet-500',
  shadow_fox: 'bg-sky-500',
  ghost_rider: 'bg-amber-500',
  iron_wraith: 'bg-emerald-500',
}

function getInitials(alias) {
  if (!alias) return null
  return alias
    .split('_')
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2)
}

function formatShortDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function formatLongDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isoToDateOnly(iso) {
  if (!iso) return ''
  return new Date(iso).toISOString().slice(0, 10)
}

function authorColorFor(alias) {
  return AUTHOR_COLOR_BY_ALIAS[alias] || 'bg-indigo-500'
}

// ===== Mission =====

export function missionFromApi(m) {
  return {
    id: m.id,
    title: m.title,
    priority: MISSION_PRIORITY_TO_FRONT[m.priority] || m.priority,
    status: MISSION_STATUS_TO_FRONT[m.status] || m.status,
    assignee: m.assignee?.alias || null,
    assigneeInitials: m.assignee ? getInitials(m.assignee.alias) : null,
    assigneeId: m.assigneeId ?? null,
    date: formatShortDate(m.date),
  }
}

export function missionToApi(m) {
  const out = {}
  if (m.title !== undefined) out.title = m.title
  if (m.priority !== undefined) {
    out.priority = MISSION_PRIORITY_TO_BACK[m.priority] || m.priority
  }
  if (m.status !== undefined) {
    out.status = MISSION_STATUS_TO_BACK[m.status] || m.status
  }
  if (m.assigneeId !== undefined) out.assigneeId = m.assigneeId
  return out
}

// ===== Vehicle =====

export function vehicleFromApi(v) {
  return {
    id: v.id,
    vehicle: v.name,
    name: v.name,
    year: v.year,
    color: v.color,
    colorHex: v.colorHex,
    plate: v.plate,
    status: VEHICLE_STATUS_TO_FRONT[v.status] || v.status,
    driver: v.driver?.alias || 'Unassigned',
    driverInitials: v.driver ? getInitials(v.driver.alias) : '—',
    driverId: v.driverId ?? null,
    stashLocation: v.stashLocation || '—',
  }
}

export function vehicleToApi(v) {
  const out = {}
  if (v.name !== undefined || v.vehicle !== undefined) {
    out.name = v.name ?? v.vehicle
  }
  if (v.year !== undefined) out.year = String(v.year)
  if (v.color !== undefined) out.color = v.color
  if (v.colorHex !== undefined) out.colorHex = v.colorHex
  if (v.plate !== undefined) out.plate = v.plate
  if (v.status !== undefined) {
    out.status = VEHICLE_STATUS_TO_BACK[v.status] || v.status
  }
  if (v.driverId !== undefined) out.driverId = v.driverId
  if (v.stashLocation !== undefined) {
    out.stashLocation = v.stashLocation === '—' ? null : v.stashLocation
  }
  return out
}

// ===== Intel =====

export function intelFromApi(f) {
  let tags = []
  try {
    tags = f.tags ? JSON.parse(f.tags) : []
    if (!Array.isArray(tags)) tags = [String(tags)]
  } catch {
    tags = f.tags ? [f.tags] : []
  }
  return {
    id: f.id,
    title: f.title,
    description: f.description,
    tags,
    isPinned: !!f.isPinned,
    author: f.author?.alias || '',
    authorInitials: f.author ? getInitials(f.author.alias) : '',
    authorColor: authorColorFor(f.author?.alias),
    date: formatLongDate(f.createdAt),
  }
}

export function intelToApi(f) {
  const out = {}
  if (f.title !== undefined) out.title = f.title
  if (f.description !== undefined) out.description = f.description
  if (f.tags !== undefined) {
    out.tags = Array.isArray(f.tags) ? JSON.stringify(f.tags) : f.tags
  }
  if (f.isPinned !== undefined) out.isPinned = !!f.isPinned
  return out
}

// ===== Agent =====

export function agentFromApi(a) {
  return {
    id: a.id,
    alias: a.alias,
    role: AGENT_ROLE_TO_FRONT[a.role] || a.role,
    specialization: a.specialization || '',
    roleInHeist: a.roleInHeist || '',
    isOnline: !!a.isOnline,
    heist: a.heistCount ?? 0,
    missions: a.missionsCount ?? 0,
    status: AGENT_STATUS_TO_FRONT[a.status] || a.status,
    recruitmentDate: a.recruitmentDate ? isoToDateOnly(a.recruitmentDate) : '',
  }
}

export function agentToApi(a) {
  const out = {}
  if (a.alias !== undefined) out.alias = a.alias
  if (a.password !== undefined) out.password = a.password
  if (a.role !== undefined) {
    out.role = AGENT_ROLE_TO_BACK[a.role] || a.role
  }
  if (a.specialization !== undefined) out.specialization = a.specialization
  if (a.roleInHeist !== undefined) out.roleInHeist = a.roleInHeist
  return out
}
