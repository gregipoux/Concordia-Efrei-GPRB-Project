<script setup>
import StatCard from '../ui/StatCard.vue'

defineProps({
  stats: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    <StatCard
      v-for="stat in stats"
      :key="stat.label"
      :value="stat.value"
      :label="stat.label"
      :tone="stat.tone"
    />
  </section>
</template>