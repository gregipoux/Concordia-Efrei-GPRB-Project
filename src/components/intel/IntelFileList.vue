<script setup>
import IntelFileCard from './IntelFileCard.vue'

defineProps({
  pinnedFiles: {
    type: Array,
    default: () => [],
  },
  allFiles: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['toggle-pin'])
</script>

<template>
  <div class="space-y-6">
    <!-- Pinned section -->
    <div v-if="pinnedFiles.length > 0">
      <div class="mb-3 flex items-center gap-2">
        <svg class="h-3.5 w-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
        </svg>
        <span class="text-xs font-semibold uppercase tracking-widest text-zinc-500">Pinned</span>
      </div>
      <div class="space-y-3">
        <IntelFileCard
          v-for="file in pinnedFiles"
          :key="file.id"
          :file="file"
          @toggle-pin="emit('toggle-pin', $event)"
        />
      </div>
    </div>

    <!-- All intel files section -->
    <div v-if="allFiles.length > 0">
      <div class="mb-3 flex items-center gap-2">
        <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-xs font-semibold uppercase tracking-widest text-zinc-500">All Intel Files</span>
      </div>
      <div class="space-y-3">
        <IntelFileCard
          v-for="file in allFiles"
          :key="file.id"
          :file="file"
          @toggle-pin="emit('toggle-pin', $event)"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="pinnedFiles.length === 0 && allFiles.length === 0"
      class="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0a0d14] py-20 text-center"
    >
      <svg class="mb-4 h-10 w-10 text-zinc-700" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      <p class="text-sm text-zinc-600">No intel files found</p>
      <p class="mt-1 text-xs text-zinc-700">Try a different search or add a new file</p>
    </div>
  </div>
</template>
