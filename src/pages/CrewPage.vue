<script setup>
import { computed, ref } from 'vue'
import TopNavbar from '../components/layout/TopNavbar.vue'
import ConfirmLogoutModal from '../components/modals/ConfirmLogoutModal.vue'
import CrewHeader from '../components/crew/CrewHeader.vue'
import CrewStats from '../components/crew/CrewStats.vue'
import CrewGrid from '../components/crew/CrewGrid.vue'
import RecruitModal from '../components/crew/RecruitModal.vue'
import { agents as initialAgents } from '../data/agents.js'

const showLogoutModal = ref(false)
const showModal = ref(false)
const vaultName = 'Golden Vault'
const agents = ref([...initialAgents])

function openLogoutModal() {
  showLogoutModal.value = true
}

const onlineAgents = computed(() => {
  return agents.value.filter((agent) => agent.isOnline).length
})

const godfatherCount = computed(() => {
  return agents.value.filter((agent) => agent.role === 'Godfather').length
})

const activeMissionCount = computed(() => {
  return agents.value.filter((agent) => agent.status === 'On Mission').length
})

function addAgent(newAgent) {
  agents.value.push({
    ...newAgent,
    status: newAgent.status || 'Available',
  })
  showModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#05070d] text-white">
    <TopNavbar :on-sign-out-click="openLogoutModal" />

    <main class="mx-auto max-w-[1400px] px-6 py-8">
      <CrewHeader
        :total-agents="agents.length"
        :online-agents="onlineAgents"
        :vault-name="vaultName"
        @recruit="showModal = true"
      />

      <div class="mt-6">
        <CrewStats
          :total-agents="agents.length"
          :online-count="onlineAgents"
          :godfather-count="godfatherCount"
          :active-missions="activeMissionCount"
        />
      </div>

      <CrewGrid
        :agents="agents"
        @recruit="showModal = true"
      />
    </main>

    <ConfirmLogoutModal :show="showLogoutModal" @close="showLogoutModal = false" />

    <RecruitModal
      v-if="showModal"
      @close="showModal = false"
      @recruit="addAgent"
    />
  </div>
</template>