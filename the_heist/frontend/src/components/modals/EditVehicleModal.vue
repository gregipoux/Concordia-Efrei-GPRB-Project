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

const emit = defineEmits(['close', 'update'])

const form = reactive({
  vehicle: '',
  year: '',
  color: '',
  colorHex: '#777777',
  plate: '',
  driverId: null,
  stashLocation: '',
  status: 'In Garage',
})

const locationLocked = computed(
  () => form.status === 'In Use' || form.status === 'Sold'
)
const driverLocked = computed(() => form.status === 'Dumped')

watch(
  () => props.vehicle,
  (value) => {
    if (!value) return
    form.vehicle = value.vehicle || value.name || ''
    form.year = value.year || ''
    form.color = value.color || ''
    form.colorHex = value.colorHex || '#777777'
    form.plate = value.plate || ''
    form.driverId = value.driverId ?? null
    form.stashLocation = value.stashLocation === '—' ? '' : value.stashLocation || ''
    form.status = value.status || 'In Garage'
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
  emit('update', {
    id: props.vehicle.id,
    payload: {
      name: form.vehicle.trim(),
      year: form.year.trim(),
      color: form.color.trim(),
      colorHex: form.colorHex,
      plate: form.plate.trim(),
      status: form.status,
      driverId: driverLocked.value ? null : form.driverId,
      stashLocation: locationLocked.value ? null : form.stashLocation.trim() || null,
    },
  })
}
</script>

<template>
  <BaseModal :show="show" title="Edit Vehicle" max-width="max-w-3xl" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Vehicle</label>
          <input v-model="form.vehicle" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Year</label>
          <input v-model="form.year" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Color name</label>
          <input v-model="form.color" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Color swatch</label>
          <input v-model="form.colorHex" type="color" class="modal-input h-12 p-1" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Plate</label>
          <input v-model="form.plate" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Status</label>
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
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Stash Location</label>
          <input
            v-model="form.stashLocation"
            class="modal-input"
            :disabled="locationLocked"
            :placeholder="locationLocked ? 'Locked for this status' : ''"
          />
        </div>
      </div>

      <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>

      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="submit" class="primary-btn" :disabled="submitting">
          {{ submitting ? 'Saving…' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>
