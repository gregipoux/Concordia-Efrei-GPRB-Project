<script setup>
import { computed, ref } from 'vue'
import CrewHeader from '../components/crew/CrewHeader.vue'
import CrewStats from '../components/crew/CrewStats.vue'
import CrewGrid from '../components/crew/CrewGrid.vue'
import RecruitModal from '../components/crew/RecruitModal.vue'
import { agents as initialAgents } from '../data/agents.js'

const showModal = ref(false)
const vaultName = 'Golden Vault'
const agents = ref([...initialAgents])

const onlineAgents = computed(() =>
  agents.value.filter((a) => a.isOnline).length
)

const godfatherCount = computed(() =>
  agents.value.filter((a) => a.role === 'Godfather').length
)

const activeMissionCount = computed(() =>
  agents.value.filter((a) => a.status === 'On Mission').length
)

function addAgent(newAgent) {
  agents.value.push({
    ...newAgent,
    status: newAgent.status || 'Available',
  })
  showModal.value = false
}
</script>

<template>
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

  <RecruitModal
    v-if="showModal"
    @close="showModal = false"
    @recruit="addAgent"
  />
</template>
