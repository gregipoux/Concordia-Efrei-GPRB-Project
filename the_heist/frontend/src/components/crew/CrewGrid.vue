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
      class="group flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#0d0f15] p-6 text-center transition hover:border-violet-400/20 hover:bg-[#10131b]"
    >
      <div
        class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl text-violet-300 transition group-hover:bg-violet-500/10"
      >
        +
      </div>
      <p class="text-sm font-medium text-gray-300">Recruit a new agent</p>
      <p class="mt-1 text-xs text-gray-500">Send an encrypted invite link</p>
    </button>
  </section>
</template>