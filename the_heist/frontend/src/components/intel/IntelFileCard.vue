<script setup>
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle-pin', 'edit', 'delete'])

const tagClasses = {
  Classified: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
  Urgent: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  Recon: 'bg-sky-500/15 text-sky-400 border border-sky-500/20',
  Strategy: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
}

const defaultTag = 'bg-zinc-700/40 text-zinc-400 border border-white/8'
</script>

<template>
  <div
    class="group relative rounded-2xl border border-white/5 bg-[#0a0d14] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] transition-all duration-200 hover:border-white/10 hover:bg-[#0c1018]"
  >
    <!-- Pin indicator strip for pinned files -->
    <div
      v-if="file.isPinned"
      class="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-amber-500/60"
    />

    <div class="flex items-start justify-between gap-3">
      <!-- Title + tags -->
      <div class="min-w-0 flex-1" :class="file.isPinned ? 'pl-3' : ''">
        <div class="mb-2 flex flex-wrap items-center gap-2">
          <!-- Pinned badge -->
          <span
            v-if="file.isPinned"
            class="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400"
          >
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
            </svg>
            Pinned
          </span>

          <!-- Other tags -->
          <span
            v-for="tag in file.tags"
            :key="tag"
            class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="tagClasses[tag] || defaultTag"
          >
            {{ tag }}
          </span>
        </div>

        <h3 class="text-sm font-semibold text-white leading-snug">
          {{ file.title }}
        </h3>

        <p class="mt-2 text-xs leading-relaxed text-zinc-500 line-clamp-2">
          {{ file.description }}
        </p>
      </div>

      <!-- Hover actions -->
      <div class="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-zinc-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-white/20 hover:text-white"
          @click="emit('edit', file)"
        >
          <Pencil :size="14" />
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-zinc-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-rose-400/40 hover:text-rose-400"
          @click="emit('delete', file)"
        >
          <Trash2 :size="14" />
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-zinc-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
          :class="{ 'opacity-100 border-amber-500/30 bg-amber-500/10 text-amber-400': file.isPinned }"
          @click="emit('toggle-pin', file.id)"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Author row -->
    <div class="mt-4 flex items-center gap-2">
      <div
        class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
        :class="file.authorColor"
      >
        {{ file.authorInitials }}
      </div>
      <span class="text-xs text-zinc-500">{{ file.author }}</span>
      <span class="text-xs text-zinc-700">·</span>
      <span class="text-xs text-zinc-600">{{ file.date }}</span>
    </div>
  </div>
</template>
