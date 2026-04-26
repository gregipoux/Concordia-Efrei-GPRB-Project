<script setup>
import { reactive, watch } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: Boolean,
  mission: { type: Object, default: null },
  agents: { type: Array, default: () => [] },
  submitting: Boolean,
  error: String,
})

const emit = defineEmits(['close', 'update'])

const form = reactive({
  title: '',
  priority: 'High',
  status: 'The Plan',
  assigneeId: null,
})

watch(
  () => props.mission,
  (value) => {
    if (!value) return
    form.title = value.title || ''
    form.priority = value.priority || 'High'
    form.status = value.status || 'The Plan'
    form.assigneeId = value.assigneeId ?? null
  },
  { immediate: true }
)

function submit() {
  if (!props.mission || !form.title.trim()) return
  emit('update', {
    id: props.mission.id,
    payload: {
      title: form.title.trim(),
      priority: form.priority,
      status: form.status,
      assigneeId: form.assigneeId,
    },
  })
}
</script>

<template>
  <BaseModal :show="show" title="Edit Mission" max-width="max-w-2xl" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="submit">
      <div>
        <label class="mb-2 block text-sm text-zinc-400">Mission Title</label>
        <input v-model="form.title" class="modal-input" />
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
        <select v-model="form.assigneeId" class="modal-input">
          <option :value="null">Unassigned</option>
          <option v-for="agent in agents" :key="agent.id" :value="agent.id">
            {{ agent.alias }}
          </option>
        </select>
      </div>

      <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>

      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="submit" class="primary-btn" :disabled="submitting || !form.title.trim()">
          {{ submitting ? 'Saving…' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>
