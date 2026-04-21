<script setup>
import { computed, ref } from 'vue'
import BoardHeader from '../components/board/BoardHeader.vue'
import BoardStats from '../components/board/BoardStats.vue'
import BoardColumn from '../components/board/BoardColumn.vue'
import AddMissionModal from '../components/modals/AddMissionModal.vue'
import { missions, boardColumns } from '../data/boardData'
import { agents } from '../data/agents.js'

const showAddModal = ref(false)
const defaultStatus = ref('The Plan')

const missionsByStatus = computed(() => {
  const grouped = {}
  for (const col of boardColumns) {
    grouped[col.key] = missions.filter((m) => m.status === col.key)
  }
  return grouped
})

const boardStats = computed(() => [
  { label: 'THE PLAN', value: missionsByStatus.value['The Plan'].length, tone: 'plan' },
  { label: 'IN PROGRESS', value: missionsByStatus.value['In Progress'].length, tone: 'progress' },
  { label: 'THE LOOT', value: missionsByStatus.value['The Loot'].length, tone: 'loot' },
  { label: 'OPERATIVES', value: agents.length, tone: 'operatives' },
])

function openAddModal(status) {
  defaultStatus.value = status || 'The Plan'
  showAddModal.value = true
}
</script>

<template>
  <div class="space-y-8">
    <BoardHeader @new-mission="openAddModal()" />

    <BoardStats :stats="boardStats" />

    <section class="grid gap-5 lg:grid-cols-3">
      <BoardColumn
        v-for="col in boardColumns"
        :key="col.key"
        :column="col"
        :missions="missionsByStatus[col.key]"
        @add-mission="openAddModal"
      />
    </section>
  </div>

  <AddMissionModal :show="showAddModal" :default-status="defaultStatus" @close="showAddModal = false" />
</template>
