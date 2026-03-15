<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
})

const statusMap = {
  'In Garage': 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20',
  'In Use': 'bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20',
  Dumped: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20',
  Sold: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
    :class="statusMap[status] || 'bg-zinc-700 text-zinc-200'"
  >
    {{ status }}
  </span>
</template>