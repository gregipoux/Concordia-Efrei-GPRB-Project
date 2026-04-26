<script setup>
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import StatCard from '../components/ui/StatCard.vue'
import IntelHeader from '../components/intel/IntelHeader.vue'
import IntelSearch from '../components/intel/IntelSearch.vue'
import IntelFileList from '../components/intel/IntelFileList.vue'
import AddIntelModal from '../components/modals/AddIntelModal.vue'
import EditIntelModal from '../components/modals/EditIntelModal.vue'
import { intelApi, ApiError } from '../services/api.js'

const files = ref([])
const loading = ref(true)
const error = ref(null)

const searchQuery = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedFile = ref(null)
const submitting = ref(false)
const submitError = ref('')

const filteredFiles = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return files.value
  return files.value.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q))
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

function describeError(err) {
  if (!(err instanceof ApiError)) return 'Operation failed.'
  switch (err.code) {
    case 'invalid_input':
      return 'Title, content and at least one tag are required.'
    case 'not_found':
      return 'Intel file no longer exists.'
    default:
      return 'Operation failed.'
  }
}

async function loadFiles() {
  loading.value = true
  error.value = null
  try {
    files.value = await intelApi.list()
  } catch (err) {
    error.value =
      err instanceof ApiError ? err.code : 'Failed to load intel.'
  } finally {
    loading.value = false
  }
}

async function togglePin(id) {
  const file = files.value.find((f) => f.id === id)
  if (!file) return
  const previous = file.isPinned
  file.isPinned = !previous
  try {
    const updated = await intelApi.togglePin(id, previous)
    const idx = files.value.findIndex((f) => f.id === id)
    if (idx !== -1) files.value.splice(idx, 1, updated)
  } catch {
    file.isPinned = previous
    toast.error('Failed to update pin status.')
  }
}

async function addFile(payload) {
  submitting.value = true
  submitError.value = ''
  try {
    const created = await intelApi.create(payload)
    files.value.unshift(created)
    showAddModal.value = false
    toast.success(`Intel "${created.title}" filed`)
  } catch (err) {
    submitError.value = describeError(err)
    toast.error(submitError.value)
  } finally {
    submitting.value = false
  }
}

function openEditModal(file) {
  selectedFile.value = file
  submitError.value = ''
  showEditModal.value = true
}

async function updateFile({ id, payload }) {
  submitting.value = true
  submitError.value = ''
  try {
    const updated = await intelApi.update(id, payload)
    const idx = files.value.findIndex((f) => f.id === id)
    if (idx !== -1) files.value.splice(idx, 1, updated)
    showEditModal.value = false
    toast.success(`Intel "${updated.title}" updated`)
  } catch (err) {
    submitError.value = describeError(err)
    toast.error(submitError.value)
  } finally {
    submitting.value = false
  }
}

async function deleteFile(file) {
  if (!window.confirm(`Delete intel "${file.title}"?`)) return
  try {
    await intelApi.remove(file.id)
    files.value = files.value.filter((f) => f.id !== file.id)
    toast.success(`Intel "${file.title}" deleted`)
  } catch (err) {
    toast.error(describeError(err))
  }
}

onMounted(loadFiles)
</script>

<template>
  <div class="space-y-8">
    <IntelHeader
      :total-files="files.length"
      @new-file="submitError = ''; showAddModal = true"
    />

    <section class="grid grid-cols-2 gap-5 lg:grid-cols-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :value="stat.value"
        :label="stat.label"
        :tone="stat.tone"
      />
    </section>

    <IntelSearch v-model="searchQuery" />

    <p
      v-if="loading"
      class="text-center text-sm text-[var(--text-muted)]"
    >
      Loading intel files…
    </p>
    <p
      v-else-if="error"
      class="text-center text-sm text-rose-400"
    >
      {{ error }}
    </p>

    <IntelFileList
      v-else
      :pinned-files="pinnedFiles"
      :all-files="unPinnedFiles"
      @toggle-pin="togglePin"
      @edit="openEditModal"
      @delete="deleteFile"
    />
  </div>

  <AddIntelModal
    :show="showAddModal"
    :submitting="submitting"
    :error="submitError"
    @close="showAddModal = false"
    @add-file="addFile"
  />
  <EditIntelModal
    :show="showEditModal"
    :file="selectedFile"
    :submitting="submitting"
    :error="submitError"
    @close="showEditModal = false"
    @update="updateFile"
  />
</template>
