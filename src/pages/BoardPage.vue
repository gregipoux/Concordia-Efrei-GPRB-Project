<script setup>
import { computed, ref } from 'vue'
import TopNavbar from '../components/layout/TopNavbar.vue'
import BackgroundGlow from '../components/ui/BackgroundGlow.vue'
import PageTransition from '../components/ui/PageTransition.vue'
import BoardHeader from '../components/board/BoardHeader.vue'
import BoardStats from '../components/board/BoardStats.vue'
import BoardColumn from '../components/board/BoardColumn.vue'
import AddMissionModal from '../components/modals/AddMissionModal.vue'
import ConfirmLogoutModal from '../components/modals/ConfirmLogoutModal.vue'
import { missions, boardColumns } from '../data/boardData'
import { agents } from '../data/agents.js'

const showAddModal = ref(false)
const showLogoutModal = ref(false)
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

function openLogoutModal() {
  showLogoutModal.value = true
}
</script>

<template>
  <div class="min-h-screen bg-[#05070d] bg-gradient-to-b from-[#06080f] to-[#04060b]">
    <BackgroundGlow />
    <TopNavbar :on-sign-out-click="openLogoutModal" />

    <PageTransition>
      <main class="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
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
      </main>
    </PageTransition>

    <AddMissionModal :show="showAddModal" :default-status="defaultStatus" @close="showAddModal = false" />
    <ConfirmLogoutModal :show="showLogoutModal" @close="showLogoutModal = false" />
  </div>
</template>
