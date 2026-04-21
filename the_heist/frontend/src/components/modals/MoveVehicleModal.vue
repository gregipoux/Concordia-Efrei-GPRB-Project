<script setup>
import { reactive, watch, computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: Boolean,
  vehicle: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const form = reactive({
  status: 'In Garage',
  stashLocation: '',
  driver: '',
})

const locationLocked = computed(() =>
  form.status === 'In Use' || form.status === 'Sold'
)

const driverLocked = computed(() =>
  form.status === 'Dumped'
)

watch(
  () => props.vehicle,
  (value) => {
    if (!value) return
    form.status = value.status || 'In Garage'
    form.stashLocation = value.stashLocation || ''
    form.driver = value.driver || ''
  },
  { immediate: true }
)

watch(
  () => form.status,
  (status) => {
    if (status === 'In Use' || status === 'Sold') {
      form.stashLocation = '—'
    } else if (form.stashLocation === '—') {
      form.stashLocation = ''
    }

    if (status === 'Dumped') {
      form.driver = 'Unassigned'
    } else if (form.driver === 'Unassigned') {
      form.driver = ''
    }
  }
)
</script>

<template>
  <BaseModal :show="show" title="Move Vehicle" max-width="max-w-lg" @close="emit('close')">
    <div class="space-y-5">
      <div v-if="vehicle" class="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
        <div class="text-sm text-zinc-400">Selected Vehicle</div>
        <div class="mt-1 text-base font-semibold text-white">
          {{ vehicle.vehicle }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-zinc-400">New Status</label>
        <select v-model="form.status" class="modal-input">
          <option>In Garage</option>
          <option>In Use</option>
          <option>Dumped</option>
          <option>Sold</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm text-zinc-400">Driver</label>
        <input
          v-model="form.driver"
          class="modal-input"
          :disabled="driverLocked"
          :placeholder="driverLocked ? 'Locked for dumped status' : 'ghost_rider'"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm text-zinc-400">New Location</label>
        <input
          v-model="form.stashLocation"
          class="modal-input"
          :disabled="locationLocked"
          :placeholder="locationLocked ? 'Locked for this status' : 'Docks — Unit 7B'"
        />
      </div>

      <div class="flex justify-end gap-3">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="button" class="primary-btn">Confirm Move</button>
      </div>
    </div>
  </BaseModal>
</template>