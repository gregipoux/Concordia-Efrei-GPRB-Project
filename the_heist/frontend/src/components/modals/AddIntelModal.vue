<script setup>
import { reactive, watch } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: Boolean,
  submitting: Boolean,
  error: String,
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
  }
)

function toggleTag(tag) {
  const idx = form.tags.indexOf(tag)
  if (idx === -1) form.tags.push(tag)
  else form.tags.splice(idx, 1)
}

const tagActiveClasses = {
  Classified: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  Urgent: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  Recon: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
  Strategy: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
}

const tagInactiveClasses =
  'bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'

function handleSubmit() {
  if (!form.title.trim() || !form.description.trim()) return
  emit('add-file', {
    title: form.title.trim(),
    description: form.description.trim(),
    tags: [...form.tags],
    isPinned: form.isPinned,
  })
}
</script>

<template>
  <BaseModal :show="show" title="New Intel File" max-width="max-w-2xl" @close="emit('close')">
    <form class="space-y-5" @submit.prevent="handleSubmit">
      <div>
        <label class="mb-2 block text-sm text-[var(--text-secondary)]">Title</label>
        <input
          v-model="form.title"
          class="modal-input"
          placeholder="Guard rotation schedule — East Wing"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm text-[var(--text-secondary)]">Content</label>
        <textarea
          v-model="form.description"
          class="modal-input min-h-[100px] resize-none"
          placeholder="Describe the intelligence details..."
        />
      </div>

      <div>
        <label class="mb-2 block text-sm text-[var(--text-secondary)]">Tags</label>
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

      <div class="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-overlay-soft)] px-4 py-3">
        <div>
          <p class="text-sm text-[var(--text-primary)]">Pin this file</p>
          <p class="text-xs text-[var(--text-muted)]">Pinned files appear at the top of the board</p>
        </div>
        <button
          type="button"
          class="relative h-6 w-11 rounded-full transition-all duration-200"
          :class="form.isPinned ? 'bg-violet-500' : 'bg-[var(--bg-overlay-strong)]'"
          @click="form.isPinned = !form.isPinned"
        >
          <span
            class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
            :class="form.isPinned ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
      </div>

      <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>

      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="secondary-btn" @click="emit('close')">Cancel</button>
        <button
          type="submit"
          class="primary-btn"
          :disabled="submitting || !form.title.trim() || !form.description.trim()"
        >
          {{ submitting ? 'Saving…' : 'Save File' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>
