<script setup>
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import BoardHeader from '../components/board/BoardHeader.vue'
import BoardStats from '../components/board/BoardStats.vue'
import BoardColumn from '../components/board/BoardColumn.vue'
import AddMissionModal from '../components/modals/AddMissionModal.vue'
import EditMissionModal from '../components/modals/EditMissionModal.vue'
import { missionsApi, agentsApi, ApiError } from '../services/api.js'

const boardColumns = [
  { key: 'The Plan', label: 'The Plan', subtitle: 'Targets identified', dot: 'bg-violet-500' },
  { key: 'In Progress', label: 'In Progress', subtitle: 'Active operations', dot: 'bg-amber-400' },
  { key: 'The Loot', label: 'The Loot', subtitle: 'Secured & complete', dot: 'bg-emerald-400' },
]

const missions = ref([])
const agents = ref([])
const loading = ref(true)
const error = ref(null)

const showAddModal = ref(false)
const showEditModal = ref(false)
const defaultStatus = ref('The Plan')
const selectedMission = ref(null)
const submitting = ref(false)
const submitError = ref('')

const missionsByStatus = computed(() => {
  const grouped = {}
  for (const col of boardColumns) {
    grouped[col.key] = missions.value.filter((m) => m.status === col.key)
  }
  return grouped
})

const onlineOperatives = computed(
  () => agents.value.filter((a) => a.isOnline).length
)

const boardStats = computed(() => [
  { label: 'THE PLAN', value: missionsByStatus.value['The Plan'].length, tone: 'plan' },
  { label: 'IN PROGRESS', value: missionsByStatus.value['In Progress'].length, tone: 'progress' },
  { label: 'THE LOOT', value: missionsByStatus.value['The Loot'].length, tone: 'loot' },
  { label: 'OPERATIVES', value: agents.value.length, tone: 'operatives' },
])

async function loadAll() {
  loading.value = true
  error.value = null
  try {
    const [missionsData, agentsData] = await Promise.all([
      missionsApi.list(),
      agentsApi.list(),
    ])
    missions.value = missionsData
    agents.value = agentsData
  } catch (err) {
    error.value =
      err instanceof ApiError ? err.code : 'Failed to load the board.'
  } finally {
    loading.value = false
  }
}

function openAddModal(status) {
  defaultStatus.value = status || 'The Plan'
  submitError.value = ''
  showAddModal.value = true
}

function describeError(err) {
  if (!(err instanceof ApiError)) return 'Operation failed.'
  switch (err.code) {
    case 'invalid_assignee':
      return 'Selected operative no longer exists.'
    case 'invalid_input':
      return 'Check the mission form (title, priority required).'
    case 'not_found':
      return 'Mission no longer exists.'
    default:
      return 'Operation failed.'
  }
}

async function createMission(payload) {
  submitting.value = true
  submitError.value = ''
  try {
    const created = await missionsApi.create(payload)
    missions.value.push(created)
    showAddModal.value = false
    toast.success(`Mission "${created.title}" added to ${created.status}`)
  } catch (err) {
    submitError.value = describeError(err)
    toast.error(submitError.value)
  } finally {
    submitting.value = false
  }
}

function openEditModal(mission) {
  selectedMission.value = mission
  submitError.value = ''
  showEditModal.value = true
}

async function updateMission({ id, payload }) {
  submitting.value = true
  submitError.value = ''
  try {
    const updated = await missionsApi.update(id, payload)
    const idx = missions.value.findIndex((m) => m.id === id)
    if (idx !== -1) missions.value.splice(idx, 1, updated)
    showEditModal.value = false
    toast.success(`Mission "${updated.title}" updated`)
  } catch (err) {
    submitError.value = describeError(err)
    toast.error(submitError.value)
  } finally {
    submitting.value = false
  }
}

async function deleteMission(mission) {
  if (!window.confirm(`Delete mission "${mission.title}"?`)) return
  try {
    await missionsApi.remove(mission.id)
    missions.value = missions.value.filter((m) => m.id !== mission.id)
    toast.success(`Mission "${mission.title}" deleted`)
  } catch (err) {
    toast.error(describeError(err))
  }
}

onMounted(loadAll)
</script>

<template>
  <div class="space-y-8">
    <BoardHeader
      :total-missions="missions.length"
      :online-operatives="onlineOperatives"
      @new-mission="openAddModal()"
    />

    <BoardStats :stats="boardStats" />

    <p
      v-if="loading"
      class="text-center text-sm text-zinc-500"
    >
      Loading missions…
    </p>
    <p
      v-else-if="error"
      class="text-center text-sm text-rose-400"
    >
      {{ error }}
    </p>

    <section
      v-else
      class="grid gap-5 lg:grid-cols-3"
    >
      <BoardColumn
        v-for="col in boardColumns"
        :key="col.key"
        :column="col"
        :missions="missionsByStatus[col.key]"
        @add-mission="openAddModal"
        @edit-mission="openEditModal"
        @delete-mission="deleteMission"
      />
    </section>
  </div>

  <AddMissionModal
    :show="showAddModal"
    :default-status="defaultStatus"
    :agents="agents"
    :submitting="submitting"
    :error="submitError"
    @close="showAddModal = false"
    @create="createMission"
  />
  <EditMissionModal
    :show="showEditModal"
    :mission="selectedMission"
    :agents="agents"
    :submitting="submitting"
    :error="submitError"
    @close="showEditModal = false"
    @update="updateMission"
  />
</template>
