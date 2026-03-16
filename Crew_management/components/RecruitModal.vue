<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    
    <div class="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-md flex flex-col gap-5">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-white font-bold text-xl">Recruit New Agent</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-white text-xl transition">
          ✕
        </button>
      </div>

      <!-- Champs du formulaire -->
      <div class="flex flex-col gap-4">

        <div class="flex flex-col gap-1">
          <label class="text-gray-400 text-sm">Operative Alias</label>
          <input 
            v-model="form.alias"
            type="text" 
            placeholder="your_codename"
            class="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-gray-400 text-sm">Role</label>
          <select 
            v-model="form.role"
            class="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500">
            <option value="">Select a role</option>
            <option value="Agent">Agent</option>
            <option value="Driver">Driver</option>
            <option value="Hacker">Hacker</option>
            <option value="Lookout">Lookout</option>
            <option value="Godfather">Godfather</option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-gray-400 text-sm">Specialization</label>
          <input 
            v-model="form.specialization"
            type="text" 
            placeholder="ex: Driver - Extractor"
            class="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-gray-400 text-sm">Retinal Scan (Password)</label>
          <input 
            v-model="form.retinalScan"
            type="password" 
            placeholder="••••••••••••"
            class="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

      </div>

      <!-- Boutons -->
      <div class="flex gap-3 mt-2">
        <button 
          @click="$emit('close')"
          class="flex-1 border border-gray-600 text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
          Cancel
        </button>
        <button 
          @click="submitForm"
          class="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition">
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
  retinalScan: ''
})

const submitForm = () => {


  if (!form.value.alias || !form.value.role) return


  const newAgent = {
    id: Date.now(),
    alias: form.value.alias,
    role: form.value.role,
    specialization: form.value.specialization,
    isOnline: false,
    heist: 0,
    missions: 0,
    roleInHeist: form.value.role
  }

  emit('recruit', newAgent)


  form.value = { alias: '', role: '', specialization: '', retinalScan: '' }
}

</script>
