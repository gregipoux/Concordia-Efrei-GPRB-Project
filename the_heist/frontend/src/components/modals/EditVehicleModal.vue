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
  vehicle: '',
  year: '',
  color: '',
  plate: '',
  driver: '',
  stashLocation: '',
  status: 'In Garage',
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
    form.vehicle = value.vehicle || ''
    form.year = value.year || ''
    form.color = value.color || ''
    form.plate = value.plate || ''
    form.driver = value.driver || ''
    form.stashLocation = value.stashLocation || ''
    form.status = value.status || 'In Garage'
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
  <BaseModal :show="show" title="Edit Vehicle" max-width="max-w-3xl" @close="emit('close')">
    <form class="space-y-5">
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm text-zinc-400">Vehicle</label>
          <input v-model="form.vehicle" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-zinc-400">Year</label>
          <input v-model="form.year" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-zinc-400">Color</label>
          <input v-model="form.color" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-zinc-400">Plate</label>
          <input v-model="form.plate" class="modal-input" />
        </div>

        <div>
          <label class="mb-2 block text-sm text-zinc-400">Driver</label>
          <input
            v-model="form.driver"
            class="modal-input"
            :disabled="driverLocked"
            :placeholder="driverLocked ? 'Locked for dumped status' : ''"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm text-zinc-400">Status</label>
          <select v-model="form.status" class="modal-input">
            <option>In Garage</option>
            <option>In Use</option>
            <option>Dumped</option>
            <option>Sold</option>
          </select>
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-zinc-400">Stash Location</label>
        <input
          v-model="form.stashLocation"
          class="modal-input"
          :disabled="locationLocked"
          :placeholder="locationLocked ? 'Locked for this status' : ''"
        />
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="button" class="primary-btn">Save Changes</button>
      </div>
    </form>
  </BaseModal>
</template>