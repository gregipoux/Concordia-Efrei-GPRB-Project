<script setup>
import { computed, ref } from 'vue'
import FilterTabs from '../components/ui/FilterTabs.vue'
import GarageHeader from '../components/garage/GarageHeader.vue'
import GarageStats from '../components/garage/GarageStats.vue'
import GarageTable from '../components/garage/GarageTable.vue'
import AddVehicleModal from '../components/modals/AddVehicleModal.vue'
import EditVehicleModal from '../components/modals/EditVehicleModal.vue'
import MoveVehicleModal from '../components/modals/MoveVehicleModal.vue'
import { garageStats, garageTabs, garageVehicles } from '../data/garageData'

const activeTab = ref('All vehicles')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showMoveModal = ref(false)
const selectedVehicle = ref(null)

const filteredVehicles = computed(() => {
  if (activeTab.value === 'All vehicles') return garageVehicles
  return garageVehicles.filter((v) => v.status === activeTab.value)
})

function openEditModal(vehicle) {
  selectedVehicle.value = vehicle
  showEditModal.value = true
}

function openMoveModal(vehicle) {
  selectedVehicle.value = vehicle
  showMoveModal.value = true
}
</script>

<template>
  <div class="space-y-8">
    <GarageHeader @add-vehicle="showAddModal = true" />

    <GarageStats :stats="garageStats" />

    <FilterTabs
      :tabs="garageTabs"
      :active-tab="activeTab"
      @update:activeTab="activeTab = $event"
    />

    <GarageTable
      :vehicles="filteredVehicles"
      @edit="openEditModal"
      @move="openMoveModal"
    />
  </div>

  <AddVehicleModal :show="showAddModal" @close="showAddModal = false" />
  <EditVehicleModal :show="showEditModal" :vehicle="selectedVehicle" @close="showEditModal = false" />
  <MoveVehicleModal :show="showMoveModal" :vehicle="selectedVehicle" @close="showMoveModal = false" />
</template>
