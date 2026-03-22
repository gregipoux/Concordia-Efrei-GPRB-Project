import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { agents } from '../data/agents.js'

export const useAuthStore = defineStore('auth', () => {

    const stored = sessionStorage.getItem('agentId')
    const currentAgentId = ref(stored ? Number(stored) : null)

    const currentAgent = computed(() =>
        currentAgentId.value !== null
            ? agents.find(a => a.id === currentAgentId.value) ?? null
            : null
    )

    const isAuthenticated = computed(() => currentAgent.value !== null)

    function login(alias) {
        const agent = agents.find(
            a => a.alias.toLowerCase() === alias.trim().toLowerCase()
        )
        if (!agent) return false
        currentAgentId.value = agent.id
        sessionStorage.setItem('agentId', String(agent.id))
        return true
    }


    function loginDefault() {
        if (currentAgentId.value !== null) return
        const fallback = agents[1]
        currentAgentId.value = fallback.id
        sessionStorage.setItem('agentId', String(fallback.id))
    }

    function logout() {
        currentAgentId.value = null
        sessionStorage.removeItem('agentId')
    }

    return { currentAgentId, currentAgent, isAuthenticated, login, loginDefault, logout }
})