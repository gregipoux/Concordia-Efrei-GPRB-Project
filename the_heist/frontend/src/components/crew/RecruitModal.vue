<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'recruit'])

const form = ref({
  alias: '',
  role: '',
  specialization: '',
  roleInHeist: '',
})

const submitForm = () => {
  if (!form.value.alias || !form.value.role) return

  const newAgent = {
    id: Date.now(),
    alias: form.value.alias.trim(),
    role: form.value.role,
    specialization: form.value.specialization.trim(),
    isOnline: false,
    heist: 0,
    missions: 0,
    roleInHeist: form.value.roleInHeist.trim() || form.value.role,
    status: 'Available',
    recruitmentDate: new Date().toISOString().slice(0, 10),
  }

  emit('recruit', newAgent)

  form.value = {
    alias: '',
    role: '',
    specialization: '',
    roleInHeist: '',
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-2xl"
    >
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-[var(--text-primary)]">Recruit New Agent</h2>
          <p class="mt-1 text-sm text-[var(--text-muted)]">
            Add a new operative to the crew.
          </p>
        </div>

        <button
          type="button"
          @click="$emit('close')"
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition hover:bg-[var(--bg-overlay-strong)] hover:text-[var(--text-primary)]"
        >
          ✕
        </button>
      </div>

      <div class="grid gap-4">
        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Operative Alias</label>
          <input
            v-model="form.alias"
            type="text"
            placeholder="your_codename"
            class="modal-input"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Role</label>
          <select
            v-model="form.role"
            class="modal-input"
          >
            <option value="">Select a role</option>
            <option value="Agent">Agent</option>
            <option value="Godfather">Godfather</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Specialization</label>
          <input
            v-model="form.specialization"
            type="text"
            placeholder="ex: Driver - Extractor"
            class="modal-input"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm text-[var(--text-secondary)]">Role in Heist</label>
          <input
            v-model="form.roleInHeist"
            type="text"
            placeholder="Driver / Hacker / Lookout..."
            class="modal-input"
          />
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          type="button"
          @click="$emit('close')"
          class="flex-1 secondary-btn"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="submitForm"
          class="flex-1 primary-btn"
        >
          + Recruit Agent
        </button>
      </div>
    </div>
  </div>
</template>