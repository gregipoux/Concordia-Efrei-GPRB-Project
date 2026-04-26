<script setup>
defineProps({
  totalVehicles: { type: Number, default: 0 },
  vaultName: { type: String, default: 'Golden Vault' },
})

const emit = defineEmits(['add-vehicle'])
</script>

<template>
  <section class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div>
      <h1 class="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
        Stolen Cars Garage
      </h1>
      <p class="mt-2 text-sm text-[var(--text-muted)]">
        {{ totalVehicles }} vehicles tracked · Operation: {{ vaultName }}
      </p>
    </div>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-950/40 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-400 active:scale-95"
      @click="emit('add-vehicle')"
    >
      + Add Vehicle
    </button>
  </section>
</template>
