<script setup>
defineProps({
  totalAgents: {
    type: Number,
    default: 0,
  },
  onlineAgents: {
    type: Number,
    default: 0,
  },
  vaultName: {
    type: String,
    default: 'Golden Vault',
  },
})

const emit = defineEmits(['recruit'])
</script>

<template>
  <section class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h1 class="text-4xl font-semibold tracking-tight text-white">
        Crew Management
      </h1>
      <p class="mt-2 text-sm text-gray-500">
        {{ totalAgents }} operatives • {{ onlineAgents }} online • Operation:
        {{ vaultName }}
      </p>
    </div>

    <button
      type="button"
      @click="emit('recruit')"
      class="inline-flex items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:bg-violet-400 active:scale-95"
    >
      + Recruit Agent
    </button>
  </section>
</template>