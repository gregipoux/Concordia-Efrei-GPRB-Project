<script setup>
defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    default: 'garage',
  },
})

const toneClasses = {
  garage: 'text-violet-500',
  use: 'text-amber-400',
  dumped: 'text-rose-500',
  sold: 'text-emerald-400',
  plan: 'text-violet-500',
  progress: 'text-amber-400',
  loot: 'text-rose-500',
  operatives: 'text-emerald-400',
}
</script>

<template>
  <div class="rounded-2xl border border-white/5 bg-[#0a0d14] px-6 py-7 shadow-[0_0_0_1px_rgba(255,255,255,0.01)]">
    <div class="mb-3 text-5xl font-semibold tracking-tight" :class="toneClasses[tone] || toneClasses.garage">
      {{ value }}
    </div>
    <div class="text-sm text-zinc-500">
      {{ label }}
    </div>
  </div>
</template>