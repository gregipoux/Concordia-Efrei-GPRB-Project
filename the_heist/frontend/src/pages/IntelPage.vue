<script setup>
import { computed, ref } from 'vue'
import TopNavbar from '../components/layout/TopNavbar.vue'
import BackgroundGlow from '../components/ui/BackgroundGlow.vue'
import PageTransition from '../components/ui/PageTransition.vue'
import StatCard from '../components/ui/StatCard.vue'
import IntelHeader from '../components/intel/IntelHeader.vue'
import IntelSearch from '../components/intel/IntelSearch.vue'
import IntelFileList from '../components/intel/IntelFileList.vue'
import AddIntelModal from '../components/modals/AddIntelModal.vue'
import ConfirmLogoutModal from '../components/modals/ConfirmLogoutModal.vue'
import { intelFiles as initialFiles, intelStats } from '../data/intelData'
import { useAuthStore } from '../stores/AuthStore.js'

const auth = useAuthStore()

const files = ref([...initialFiles])
const searchQuery = ref('')
const showAddModal = ref(false)
const showLogoutModal = ref(false)

const filteredFiles = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return files.value
  return files.value.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q)),
  )
})

const pinnedFiles = computed(() => filteredFiles.value.filter((f) => f.isPinned))
const unPinnedFiles = computed(() => filteredFiles.value.filter((f) => !f.isPinned))

const stats = computed(() => [
  { label: 'TOTAL FILES', value: files.value.length, tone: 'operatives' },
  {
    label: 'CLASSIFIED',
    value: files.value.filter((f) => f.tags.includes('Classified')).length,
    tone: 'loot',
  },
  {
    label: 'URGENT',
    value: files.value.filter((f) => f.tags.includes('Urgent')).length,
    tone: 'use',
  },
  {
    label: 'PINNED',
    value: files.value.filter((f) => f.isPinned).length,
    tone: 'plan',
  },
])

function togglePin(id) {
  const file = files.value.find((f) => f.id === id)
  if (file) file.isPinned = !file.isPinned
}

function addFile(newFile) {
  const agent = auth.currentAgent
  files.value.unshift({
    id: Date.now(),
    title: newFile.title,
    description: newFile.description,
    tags: newFile.tags,
    isPinned: newFile.isPinned,
    author: agent?.alias ?? 'unknown',
    authorInitials: agent?.alias
      ? agent.alias
          .split('_')
          .map((w) => w[0].toUpperCase())
          .join('')
          .slice(0, 2)
      : '??',
    authorColor: 'bg-violet-500',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  })
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
          <!-- Header -->
          <IntelHeader :total-files="files.length" @new-file="showAddModal = true" />

          <!-- Stats -->
          <section class="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <StatCard
              v-for="stat in stats"
              :key="stat.label"
              :value="stat.value"
              :label="stat.label"
              :tone="stat.tone"
            />
          </section>

          <!-- Search -->
          <IntelSearch v-model="searchQuery" />

          <!-- File list -->
          <IntelFileList
            :pinned-files="pinnedFiles"
            :all-files="unPinnedFiles"
            @toggle-pin="togglePin"
          />
        </div>
      </main>
    </PageTransition>

    <AddIntelModal :show="showAddModal" @close="showAddModal = false" @add-file="addFile" />
    <ConfirmLogoutModal :show="showLogoutModal" @close="showLogoutModal = false" />
  </div>
</template>
