<script setup>
import { reactive, watch } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close', 'add-file'])

const availableTags = ['Classified', 'Urgent', 'Recon', 'Strategy']

const form = reactive({
  title: '',
  description: '',
  tags: [],
  isPinned: false,
})

watch(
  () => props.show,
  (val) => {
    if (!val) {
      form.title = ''
      form.description = ''
      form.tags = []
      form.isPinned = false
    }
  },
)

function toggleTag(tag) {
  const idx = form.tags.indexOf(tag)
  if (idx === -1) {
    form.tags.push(tag)
  } else {
    form.tags.splice(idx, 1)
  }
}

const tagActiveClasses = {
  Classified: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  Urgent: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  Recon: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
  Strategy: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
}

const tagInactiveClasses = 'bg-transparent text-zinc-500 border-white/10 hover:border-white/20 hover:text-zinc-300'

function handleSubmit() {
  if (!form.title.trim()) return
  emit('add-file', { ...form, tags: [...form.tags] })
  emit('close')
}
</script>

<template>
  <BaseModal :show="show" title="New Intel File" max-width="max-w-2xl" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="handleSubmit">
      <!-- Title -->
      <div>
        <label class="mb-2 block text-sm text-zinc-400">Title</label>
        <input
          v-model="form.title"
          class="modal-input"
          placeholder="Guard rotation schedule — East Wing"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="mb-2 block text-sm text-zinc-400">Content</label>
        <textarea
          v-model="form.description"
          class="modal-input min-h-[100px] resize-none"
          placeholder="Describe the intelligence details..."
        />
      </div>

      <!-- Tags -->
      <div>
        <label class="mb-2 block text-sm text-zinc-400">Tags</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag"
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150"
            :class="form.tags.includes(tag) ? tagActiveClasses[tag] : tagInactiveClasses"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Pin toggle -->
      <div class="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
        <div>
          <p class="text-sm text-zinc-300">Pin this file</p>
          <p class="text-xs text-zinc-600">Pinned files appear at the top of the board</p>
        </div>
        <button
          type="button"
          class="relative h-6 w-11 rounded-full transition-all duration-200"
          :class="form.isPinned ? 'bg-violet-500' : 'bg-zinc-700'"
          @click="form.isPinned = !form.isPinned"
        >
          <span
            class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
            :class="form.isPinned ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button type="submit" class="primary-btn" :disabled="!form.title.trim()">Save File</button>
      </div>
    </form>
  </BaseModal>
</template>
