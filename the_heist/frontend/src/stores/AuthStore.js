import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, setToken, ApiError } from '../services/api.js'

const TOKEN_KEY = 'heistToken'
const AGENT_KEY = 'heistAgent'

function readStoredAgent() {
  const raw = sessionStorage.getItem(AGENT_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    sessionStorage.removeItem(AGENT_KEY)
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const currentAgent = ref(readStoredAgent())
  const token = ref(sessionStorage.getItem(TOKEN_KEY) || null)
  const error = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => currentAgent.value !== null && token.value !== null)
  const currentAgentId = computed(() => currentAgent.value?.id ?? null)

  function persistAgent(agent) {
    if (agent) sessionStorage.setItem(AGENT_KEY, JSON.stringify(agent))
    else sessionStorage.removeItem(AGENT_KEY)
  }

  async function login(alias, password) {
    error.value = null
    loading.value = true
    try {
      const { token: t, agent } = await authApi.login(alias, password)
      token.value = t
      currentAgent.value = agent
      setToken(t)
      persistAgent(agent)
      return true
    } catch (err) {
      error.value = err instanceof ApiError ? err.code : 'network_error'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    // Best-effort: tell the backend to flip isOnline=false BEFORE we drop the token
    if (token.value) {
      try {
        await authApi.logout()
      } catch {
        // ignore — we proceed with local clear regardless
      }
    }
    currentAgent.value = null
    token.value = null
    error.value = null
    setToken(null)
    persistAgent(null)
  }

  async function refreshMe() {
    if (!token.value) return null
    try {
      const agent = await authApi.me()
      currentAgent.value = agent
      persistAgent(agent)
      return agent
    } catch {
      logout()
      return null
    }
  }

  return {
    currentAgent,
    currentAgentId,
    token,
    error,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshMe,
  }
})
