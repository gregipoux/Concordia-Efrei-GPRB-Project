<script setup>
import { reactive, watch, computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: Boolean,
  vehicle: { type: Object, default: null },
  agents: { type: Array, default: () => [] },
  submitting: Boolean,
  error: String,
})

const emit = defineEmits(['close', 'move'])

const form = reactive({
  status: 'In Garage',
  stashLocation: '',
  driverId: null,
})

const locationLocked = computed(
  () => form.status === 'In Use' || form.status === 'Sold'
)
const driverLocked = computed(() => form.status === 'Dumped')

watch(
  () => props.vehicle,
  (value) => {
    if (!value) return
    form.status = value.status || 'In Garage'
    form.stashLocation = value.stashLocation === '—' ? '' : value.stashLocation || ''
    form.driverId = value.driverId ?? null
  },
  { immediate: true }
)

watch(
  () => form.status,
  (status) => {
    if (status === 'In Use' || status === 'Sold') form.stashLocation = ''
    if (status === 'Dumped') form.driverId = null
  }
)

function submit() {
  if (!props.vehicle) return
  emit('move', {
    id: props.vehicle.id,
    payload: {
      status: form.status,
      driverId: driverLocked.value ? null : form.driverId,
      stashLocation: locationLocked.value ? null : form.stashLocation.trim() || null,
    },
  })
}
</script>

<template>
  <BaseModal :show="show" title="Move Vehicle" max-width="max-w-lg" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div v-if="vehicle" class="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
        <div class="text-sm text-zinc-400">Selected Vehicle</div>
        <div class="mt-1 text-base font-semibold text-white">
          {{ vehicle.vehicle }}
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-[var(--text-secondary)]">New Status</label>
        <select v-model="form.status" class="modal-input">
          <option>In Garage</option>
          <option>In Use</option>
          <option>Dumped</option>
          <option>Sold</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm text-[var(--text-secondary)]">Driver</label>
        <select
          v-model="form.driverId"
          class="modal-input"
          :disabled="driverLocked"
        >
          <option :value="null">{{ driverLocked ? 'Locked (dumped)' : 'Unassigned' }}</option>
          <option v-for="a in agents" :key="a.id" :value="a.id">{{ a.alias }}</option>
        </select>
      </div>

      <div>
        <label class="mb-2 block text-sm text-[var(--text-secondary)]">New Location</label>
        <input
          v-model="form.stashLocation"
          class="modal-input"
          :disabled="locationLocked"
          :placeholder="locationLocked ? 'Locked for this status' : 'Docks — Unit 7B'"
        />
      </div>

      <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>

      <div class="flex justify-end gap-3">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="submit" class="primary-btn" :disabled="submitting">
          {{ submitting ? 'Moving…' : 'Confirm Move' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>
