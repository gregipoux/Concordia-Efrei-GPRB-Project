<script setup>
import { computed, onMounted, ref } from 'vue'
import CrewHeader from '../components/crew/CrewHeader.vue'
import CrewStats from '../components/crew/CrewStats.vue'
import CrewGrid from '../components/crew/CrewGrid.vue'
import RecruitModal from '../components/crew/RecruitModal.vue'
import { agentsApi, ApiError } from '../services/api.js'

const showModal = ref(false)
const vaultName = 'Golden Vault'
const agents = ref([])
const loading = ref(true)
const error = ref(null)
const recruitError = ref(null)

const onlineAgents = computed(() => agents.value.filter((a) => a.isOnline).length)
const godfatherCount = computed(
  () => agents.value.filter((a) => a.role === 'Godfather').length
)
const activeMissionCount = computed(
  () => agents.value.filter((a) => a.status === 'On Mission').length
)

async function loadAgents() {
  loading.value = true
  error.value = null
  try {
    agents.value = await agentsApi.list()
  } catch (err) {
    error.value =
      err instanceof ApiError ? err.code : 'Failed to load the crew.'
  } finally {
    loading.value = false
  }
}

async function addAgent(newAgent) {
  recruitError.value = null
  try {
    const created = await agentsApi.recruit({
      alias: newAgent.alias,
      role: newAgent.role,
      specialization: newAgent.specialization || null,
      roleInHeist: newAgent.roleInHeist || null,
    })
    agents.value.push(created)
    showModal.value = false
  } catch (err) {
    if (err instanceof ApiError && err.code === 'alias_taken') {
      recruitError.value = 'This alias is already taken.'
    } else if (err instanceof ApiError && err.code === 'invalid_input') {
      recruitError.value = 'Check the recruitment form (alias 3+ chars, role required).'
    } else {
      recruitError.value = 'Recruitment failed. Try again.'
    }
  }
}

onMounted(loadAgents)
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

  <p
    v-if="loading"
    class="mt-8 text-center text-sm text-gray-500"
  >
    Loading crew…
  </p>

  <p
    v-else-if="error"
    class="mt-8 text-center text-sm text-rose-400"
  >
    {{ error }}
  </p>

  <CrewGrid
    v-else
    :agents="agents"
    @recruit="showModal = true"
  />

  <RecruitModal
    v-if="showModal"
    @close="showModal = false; recruitError = null"
    @recruit="addAgent"
  />

  <p
    v-if="recruitError"
    class="fixed bottom-6 right-6 z-50 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
  >
    {{ recruitError }}
  </p>
</template>
