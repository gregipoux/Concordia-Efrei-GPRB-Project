<template>
  <div class="min-h-screen bg-[#07080c] text-white">
    <!-- Top bar -->
    <header class="border-b border-white/5 bg-[#0b0c11]/95 backdrop-blur">
      <div class="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-[11px] font-bold"
            >
              T
            </div>
            <span class="text-sm font-semibold tracking-wide text-white">The Heist</span>
          </div>

          <nav class="hidden items-center gap-1 md:flex">
            <button
              v-for="item in navItems"
              :key="item"
              :class="[
                'rounded-lg px-3 py-1.5 text-xs transition',
                item === 'Crew'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              ]"
            >
              {{ item }}
            </button>
          </nav>
        </div>

        <div class="flex items-center gap-3">
          <span
            class="hidden rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300 sm:inline-flex"
          >
            Golden Vault
          </span>

          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white"
          >
            GR
          </div>

          <button class="text-xs text-gray-400 transition hover:text-white">Sign Out</button>
        </div>
      </div>
    </header>

    <!-- Page -->
    <main class="mx-auto max-w-[1400px] px-6 py-8">
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight text-white">Crew Management</h1>
          <p class="mt-2 text-sm text-gray-500">
            {{ agents.length }} operatives • {{ onlineAgents }} online • Operations:
            {{ vaultName }}
          </p>
        </div>

        <button
          @click="showModal = true"
          class="inline-flex items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:bg-violet-400"
        >
          + Recruit Agent
        </button>
      </div>

      <StatsBar
        :totalAgents="agents.length"
        :onlineCount="onlineAgents"
        :godfatherCount="godfatherCount"
        :activeMissions="activeMissionCount"
      />

      <section class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <AgentCard
          v-for="agent in agents"
          :key="agent.id"
          :agent="agent"
        />

        <!-- Recruit tile -->
        <button
          @click="showModal = true"
          class="group flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#0d0f15] p-6 text-center transition hover:border-violet-400/20 hover:bg-[#10131b]"
        >
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl text-violet-300 transition group-hover:bg-violet-500/10"
          >
            +
          </div>
          <p class="text-sm font-medium text-gray-300">Recruit a new agent</p>
          <p class="mt-1 text-xs text-gray-500">Send an encrypted invite link</p>
        </button>
      </section>
    </main>

    <RecruitModal
      v-if="showModal"
      @close="showModal = false"
      @recruit="addAgent"
    />
  </div>
</template>

<script>
import AgentCard from '../components/AgentCard.vue'
import RecruitModal from '../components/RecruitModal.vue'
import StatsBar from '../components/StatsBar.vue'
import { agents } from '../data/agents.js'

export default {
  name: 'CrewManagement',
  components: {
    AgentCard,
    RecruitModal,
    StatsBar
  },
  data() {
    return {
      agents: [...agents],
      showModal: false,
      navItems: ['Board', 'Crew', 'Garage', 'Intel'],
      vaultName: 'Golden Vault'
    }
  },
  computed: {
    onlineAgents() {
      return this.agents.filter((agent) => agent.isOnline).length
    },
    godfatherCount() {
      return this.agents.filter((agent) => agent.role === 'Godfather').length
    },
    activeMissionCount() {
      return this.agents.filter((agent) => agent.status === 'On Mission').length
    }
  },
  methods: {
    addAgent(newAgent) {
      this.agents.push({
        ...newAgent,
        status: newAgent.status || 'Available'
      })
      this.showModal = false
    }
  }
}
</script>