// Service HTTP unique vers le backend the-heist.
// Le proxy Vite (vite.config.js) renvoie /api → http://localhost:3001
// Tous les payloads sont mappés via ./mappers.js (enum Prisma ↔ Title-Case UI).

import {
  missionFromApi,
  missionToApi,
  vehicleFromApi,
  vehicleToApi,
  intelFromApi,
  intelToApi,
  agentFromApi,
  agentToApi,
} from './mappers.js'

const TOKEN_KEY = 'heistToken'

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  constructor(status, code, raw) {
    super(code || 'api_error')
    this.status = status
    this.code = code
    this.raw = raw
  }
}

async function request(method, path, { body, query, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let url = path
  if (query) {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== '') params.set(k, String(v))
    }
    const qs = params.toString()
    if (qs) url += `?${qs}`
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 204) return null

  let data = null
  try {
    data = await res.json()
  } catch {
    /* no body */
  }

  if (!res.ok) {
    throw new ApiError(res.status, data?.error || `http_${res.status}`, data)
  }
  return data
}

// === Auth ===
export const authApi = {
  async login(alias, password) {
    const data = await request('POST', '/api/auth/login', {
      body: { alias, password },
      auth: false,
    })
    return { token: data.token, agent: agentFromApi(data.agent) }
  },
  async me() {
    const data = await request('GET', '/api/auth/me')
    return agentFromApi(data.agent)
  },
  async logout() {
    await request('POST', '/api/auth/logout')
  },
}

// === Missions ===
export const missionsApi = {
  async list({ status } = {}) {
    const data = await request('GET', '/api/missions', {
      query: { status: status ? missionToApi({ status }).status : undefined },
    })
    return data.missions.map(missionFromApi)
  },
  async create(payload) {
    const data = await request('POST', '/api/missions', { body: missionToApi(payload) })
    return missionFromApi(data.mission)
  },
  async update(id, payload) {
    const data = await request('PUT', `/api/missions/${id}`, { body: missionToApi(payload) })
    return missionFromApi(data.mission)
  },
  async remove(id) {
    await request('DELETE', `/api/missions/${id}`)
  },
}

// === Vehicles ===
export const vehiclesApi = {
  async list({ status } = {}) {
    const data = await request('GET', '/api/vehicles', {
      query: { status: status ? vehicleToApi({ status }).status : undefined },
    })
    return data.vehicles.map(vehicleFromApi)
  },
  async create(payload) {
    const data = await request('POST', '/api/vehicles', { body: vehicleToApi(payload) })
    return vehicleFromApi(data.vehicle)
  },
  async update(id, payload) {
    const data = await request('PUT', `/api/vehicles/${id}`, { body: vehicleToApi(payload) })
    return vehicleFromApi(data.vehicle)
  },
  async remove(id) {
    await request('DELETE', `/api/vehicles/${id}`)
  },
}

// === Intel ===
export const intelApi = {
  async list({ search } = {}) {
    const data = await request('GET', '/api/intel', { query: { search } })
    return data.intelFiles.map(intelFromApi)
  },
  async create(payload) {
    const data = await request('POST', '/api/intel', { body: intelToApi(payload) })
    return intelFromApi(data.intelFile)
  },
  async update(id, payload) {
    const data = await request('PUT', `/api/intel/${id}`, { body: intelToApi(payload) })
    return intelFromApi(data.intelFile)
  },
  async togglePin(id, currentPinned) {
    const data = await request('PUT', `/api/intel/${id}`, {
      body: { isPinned: !currentPinned },
    })
    return intelFromApi(data.intelFile)
  },
  async remove(id) {
    await request('DELETE', `/api/intel/${id}`)
  },
}

// === Agents ===
export const agentsApi = {
  async list() {
    const data = await request('GET', '/api/agents')
    return data.agents.map(agentFromApi)
  },
  async recruit(payload) {
    const data = await request('POST', '/api/agents', { body: agentToApi(payload) })
    return agentFromApi(data.agent)
  },
}
