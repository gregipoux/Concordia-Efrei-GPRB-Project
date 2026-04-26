<script setup>
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import FilterTabs from '../components/ui/FilterTabs.vue'
import GarageHeader from '../components/garage/GarageHeader.vue'
import GarageStats from '../components/garage/GarageStats.vue'
import GarageTable from '../components/garage/GarageTable.vue'
import AddVehicleModal from '../components/modals/AddVehicleModal.vue'
import EditVehicleModal from '../components/modals/EditVehicleModal.vue'
import MoveVehicleModal from '../components/modals/MoveVehicleModal.vue'
import { vehiclesApi, agentsApi, ApiError } from '../services/api.js'

const garageTabs = ['All vehicles', 'In Garage', 'In Use', 'Dumped', 'Sold']

const vehicles = ref([])
const agents = ref([])
const loading = ref(true)
const error = ref(null)

const activeTab = ref('All vehicles')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showMoveModal = ref(false)
const selectedVehicle = ref(null)

const submitting = ref(false)
const submitError = ref('')

const filteredVehicles = computed(() => {
  if (activeTab.value === 'All vehicles') return vehicles.value
  return vehicles.value.filter((v) => v.status === activeTab.value)
})

const garageStats = computed(() => [
  {
    label: 'In Garage',
    value: vehicles.value.filter((v) => v.status === 'In Garage').length,
    tone: 'garage',
  },
  {
    label: 'In Use',
    value: vehicles.value.filter((v) => v.status === 'In Use').length,
    tone: 'use',
  },
  {
    label: 'Dumped',
    value: vehicles.value.filter((v) => v.status === 'Dumped').length,
    tone: 'dumped',
  },
  {
    label: 'Sold',
    value: vehicles.value.filter((v) => v.status === 'Sold').length,
    tone: 'sold',
  },
])

async function loadAll() {
  loading.value = true
  error.value = null
  try {
    const [vehiclesData, agentsData] = await Promise.all([
      vehiclesApi.list(),
      agentsApi.list(),
    ])
    vehicles.value = vehiclesData
    agents.value = agentsData
  } catch (err) {
    error.value =
      err instanceof ApiError ? err.code : 'Failed to load garage.'
  } finally {
    loading.value = false
  }
}

function openEditModal(vehicle) {
  selectedVehicle.value = vehicle
  submitError.value = ''
  showEditModal.value = true
}

function openMoveModal(vehicle) {
  selectedVehicle.value = vehicle
  submitError.value = ''
  showMoveModal.value = true
}

function describeError(err) {
  if (!(err instanceof ApiError)) return 'Operation failed.'
  switch (err.code) {
    case 'plate_taken':
      return 'A vehicle with this plate already exists.'
    case 'invalid_driver':
      return 'Selected driver no longer exists.'
    case 'invalid_input':
      return 'Check the form (name, year, plate, color hex required).'
    case 'not_found':
      return 'Vehicle no longer exists.'
    default:
      return 'Operation failed.'
  }
}

async function createVehicle(payload) {
  submitting.value = true
  submitError.value = ''
  try {
    const created = await vehiclesApi.create(payload)
    vehicles.value.unshift(created)
    showAddModal.value = false
    toast.success(`Vehicle "${created.vehicle}" added to the garage`)
  } catch (err) {
    submitError.value = describeError(err)
    toast.error(submitError.value)
  } finally {
    submitting.value = false
  }
}

async function updateVehicle({ id, payload }, closeModal) {
  submitting.value = true
  submitError.value = ''
  try {
    const updated = await vehiclesApi.update(id, payload)
    const idx = vehicles.value.findIndex((v) => v.id === id)
    if (idx !== -1) vehicles.value.splice(idx, 1, updated)
    closeModal()
    toast.success(`Vehicle "${updated.vehicle}" updated (${updated.status})`)
  } catch (err) {
    submitError.value = describeError(err)
    toast.error(submitError.value)
  } finally {
    submitting.value = false
  }
}

onMounted(loadAll)
</script>

<template>
  <div class="space-y-8">
    <GarageHeader
      :total-vehicles="vehicles.length"
      @add-vehicle="submitError = ''; showAddModal = true"
    />

    <GarageStats :stats="garageStats" />

    <FilterTabs
      :tabs="garageTabs"
      :active-tab="activeTab"
      @update:activeTab="activeTab = $event"
    />

    <p
      v-if="loading"
      class="text-center text-sm text-zinc-500"
    >
      Loading garage…
    </p>
    <p
      v-else-if="error"
      class="text-center text-sm text-rose-400"
    >
      {{ error }}
    </p>

    <GarageTable
      v-else
      :vehicles="filteredVehicles"
      @edit="openEditModal"
      @move="openMoveModal"
    />
  </div>

  <AddVehicleModal
    :show="showAddModal"
    :agents="agents"
    :submitting="submitting"
    :error="submitError"
    @close="showAddModal = false"
    @create="createVehicle"
  />
  <EditVehicleModal
    :show="showEditModal"
    :vehicle="selectedVehicle"
    :agents="agents"
    :submitting="submitting"
    :error="submitError"
    @close="showEditModal = false"
    @update="updateVehicle($event, () => (showEditModal = false))"
  />
  <MoveVehicleModal
    :show="showMoveModal"
    :vehicle="selectedVehicle"
    :agents="agents"
    :submitting="submitting"
    :error="submitError"
    @close="showMoveModal = false"
    @move="updateVehicle($event, () => (showMoveModal = false))"
  />
</template>
