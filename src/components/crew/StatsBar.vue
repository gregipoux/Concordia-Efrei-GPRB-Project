<template>
  <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="item in stats"
      :key="item.label"
      class="rounded-3xl border border-white/5 bg-[#0d0f15] px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
    >
      <div
        class="mb-3 h-1.5 w-10 rounded-full"
        :class="item.accent"
      ></div>

      <div class="text-3xl font-semibold tracking-tight text-white">
        {{ item.value }}
      </div>

      <div class="mt-1 text-sm text-gray-500">
        {{ item.label }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalAgents: {
    type: Number,
    default: 0
  },
  onlineCount: {
    type: Number,
    default: 0
  },
  godfatherCount: {
    type: Number,
    default: 0
  },
  activeMissions: {
    type: Number,
    default: 0
  }
})

const stats = computed(() => [
  {
    label: 'Total Operatives',
    value: props.totalAgents,
    accent: 'bg-violet-500'
  },
  {
    label: 'Online Now',
    value: props.onlineCount,
    accent: 'bg-emerald-500'
  },
  {
    label: 'Godfather',
    value: props.godfatherCount,
    accent: 'bg-amber-400'
  },
  {
    label: 'Active Missions',
    value: props.activeMissions,
    accent: 'bg-rose-500'
  }
])
</script>