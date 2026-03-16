<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
    <div
      class="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d0f15] p-6 shadow-2xl"
    >
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-white">Recruit New Agent</h2>
          <p class="mt-1 text-sm text-gray-500">
            Add a new operative to the crew.
          </p>
        </div>

        <button
          @click="$emit('close')"
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div class="grid gap-4">
        <div>
          <label class="mb-2 block text-sm text-gray-400">Operative Alias</label>
          <input
            v-model="form.alias"
            type="text"
            placeholder="your_codename"
            class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/40"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm text-gray-400">Role</label>
          <select
            v-model="form.role"
            class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
          >
            <option value="" class="bg-[#0d0f15]">Select a role</option>
            <option value="Agent" class="bg-[#0d0f15]">Agent</option>
            <option value="Godfather" class="bg-[#0d0f15]">Godfather</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm text-gray-400">Specialization</label>
          <input
            v-model="form.specialization"
            type="text"
            placeholder="ex: Driver - Extractor"
            class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/40"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm text-gray-400">Role in Heist</label>
          <input
            v-model="form.roleInHeist"
            type="text"
            placeholder="Driver / Hacker / Lookout..."
            class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/40"
          />
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          @click="$emit('close')"
          class="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="flex-1 rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          + Recruit Agent
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'recruit'])

const form = ref({
  alias: '',
  role: '',
  specialization: '',
  roleInHeist: ''
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
    recruitmentDate: new Date().toISOString().slice(0, 10)
  }

  emit('recruit', newAgent)

  form.value = {
    alias: '',
    role: '',
    specialization: '',
    roleInHeist: ''
  }
}
</script>