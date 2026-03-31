<script setup>
defineProps({
  totalFiles: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['new-file'])
</script>

<template>
  <section class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div>
      <h1 class="text-4xl font-semibold tracking-tight text-white">
        Intel Board
      </h1>
      <p class="mt-2 text-sm text-zinc-500">
        {{ totalFiles }} files tracked · Classified notes, leads & operation data — eyes only
      </p>
    </div>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-950/40 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-400 active:scale-95"
      @click="emit('new-file')"
    >
      + New File
    </button>
  </section>
</template>
