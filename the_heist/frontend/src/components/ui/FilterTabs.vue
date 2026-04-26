<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:activeTab'])
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      class="rounded-xl border px-4 py-2 text-sm font-medium transition"
      :class="
        activeTab === tab
          ? 'border-violet-400/30 bg-violet-500/15 text-violet-700 dark:text-violet-200'
          : 'border-[var(--border-subtle)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border)] hover:text-[var(--text-primary)]'
      "
      @click="emit('update:activeTab', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>