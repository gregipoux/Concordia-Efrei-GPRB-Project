<script setup>
import AgentCard from './AgentCard.vue'

defineProps({
  agents: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['recruit'])
</script>

<template>
  <section class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <AgentCard
      v-for="agent in agents"
      :key="agent.id"
      :agent="agent"
    />

    <button
      type="button"
      @click="emit('recruit')"
      class="group flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center transition hover:border-violet-400/30 hover:bg-[var(--bg-card-hover)]"
    >
      <div
        class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-overlay-strong)] text-2xl text-violet-500 dark:text-violet-300 transition group-hover:bg-violet-500/10"
      >
        +
      </div>
      <p class="text-sm font-medium text-[var(--text-secondary)]">Recruit a new agent</p>
      <p class="mt-1 text-xs text-[var(--text-muted)]">Send an encrypted invite link</p>
    </button>
  </section>
</template>