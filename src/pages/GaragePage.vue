<script setup>
import { computed, ref } from 'vue'
import TopNavbar from '../components/layout/TopNavbar.vue'
import FilterTabs from '../components/ui/FilterTabs.vue'
import GarageHeader from '../components/garage/GarageHeader.vue'
import GarageStats from '../components/garage/GarageStats.vue'
import GarageTable from '../components/garage/GarageTable.vue'
import AddVehicleModal from '../components/modals/AddVehicleModal.vue'
import ConfirmLogoutModal from '../components/modals/ConfirmLogoutModal.vue'
import EditVehicleModal from '../components/modals/EditVehicleModal.vue'
import MoveVehicleModal from '../components/modals/MoveVehicleModal.vue'
import { garageStats, garageTabs, garageVehicles } from '../data/garageData'

const activeTab = ref('All vehicles')

const showAddModal = ref(false)
const showLogoutModal = ref(false)
const showEditModal = ref(false)
const showMoveModal = ref(false)

const selectedVehicle = ref(null)

const filteredVehicles = computed(() => {
  if (activeTab.value === 'All vehicles') return garageVehicles
  return garageVehicles.filter((vehicle) => vehicle.status === activeTab.value)
})

function openAddModal() {
  showAddModal.value = true
}

function openLogoutModal() {
  showLogoutModal.value = true
}

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
  <div class="min-h-screen bg-[#05070d] text-white">
    <TopNavbar :on-sign-out-click="openLogoutModal" />

    <main class="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
      <div class="garage-enter space-y-8">
        <GarageHeader @add-vehicle="openAddModal" />

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
    </main>

    <AddVehicleModal :show="showAddModal" @close="showAddModal = false" />
    <ConfirmLogoutModal :show="showLogoutModal" @close="showLogoutModal = false" />
    <EditVehicleModal :show="showEditModal" :vehicle="selectedVehicle" @close="showEditModal = false" />
    <MoveVehicleModal :show="showMoveModal" :vehicle="selectedVehicle" @close="showMoveModal = false" />
  </div>
</template>

<style scoped>
.garage-enter {
  animation: garageFade 0.45s ease;
}

@keyframes garageFade {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>