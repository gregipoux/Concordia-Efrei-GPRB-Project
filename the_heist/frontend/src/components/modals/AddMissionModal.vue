<script setup>
import { reactive } from 'vue'
import BaseModal from './BaseModal.vue'

defineProps({
  show: Boolean,
  defaultStatus: {
    type: String,
    default: 'The Plan',
  },
})

const emit = defineEmits(['close'])

const form = reactive({
  title: '',
  priority: 'High',
  status: 'The Plan',
  assignee: '',
})
</script>

<template>
  <BaseModal :show="show" title="New Mission" max-width="max-w-2xl" @close="emit('close')">
    <form class="space-y-5">
      <div>
        <label class="mb-2 block text-sm text-zinc-400">Mission Title</label>
        <input v-model="form.title" class="modal-input" placeholder="Hack the vault security grid" />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm text-zinc-400">Priority</label>
          <select v-model="form.priority" class="modal-input">
            <option>Critical</option>
            <option>High</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm text-zinc-400">Status</label>
          <select v-model="form.status" class="modal-input">
            <option>The Plan</option>
            <option>In Progress</option>
            <option>The Loot</option>
          </select>
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-zinc-400">Assignee</label>
        <select v-model="form.assignee" class="modal-input">
          <option value="">Unassigned</option>
          <option value="ghost_rider">ghost_rider</option>
          <option value="shadow_fox">shadow_fox</option>
          <option value="iron_wraith">iron_wraith</option>
        </select>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="button" class="primary-btn">Create Mission</button>
      </div>
    </form>
  </BaseModal>
</template>
