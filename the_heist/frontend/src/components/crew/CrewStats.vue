<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalAgents: {
    type: Number,
    default: 0,
  },
  onlineCount: {
    type: Number,
    default: 0,
  },
  godfatherCount: {
    type: Number,
    default: 0,
  },
  activeMissions: {
    type: Number,
    default: 0,
  },
})

const stats = computed(() => [
  {
    label: 'Total Operatives',
    value: props.totalAgents,
    tone: 'text-violet-500',
  },
  {
    label: 'Online Now',
    value: props.onlineCount,
    tone: 'text-emerald-400',
  },
  {
    label: 'Godfather',
    value: props.godfatherCount,
    tone: 'text-amber-400',
  },
  {
    label: 'Active Missions',
    value: props.activeMissions,
    tone: 'text-rose-500',
  },
])
</script>

<template>
  <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="item in stats"
      :key="item.label"
      class="rounded-3xl border border-white/5 bg-[#0d0f15] px-6 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
    >
      <div
        class="text-5xl font-semibold tracking-tight"
        :class="item.tone"
      >
        {{ item.value }}
      </div>

      <div class="mt-4 text-sm text-gray-500">
        {{ item.label }}
      </div>
    </div>
  </section>
</template>