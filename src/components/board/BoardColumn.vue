<script setup>
import MissionCard from './MissionCard.vue'

defineProps({
  column: {
    type: Object,
    required: true,
  },
  missions: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-mission'])

const badgeClasses = {
  'bg-violet-500': 'bg-violet-500/20 text-violet-400',
  'bg-amber-400': 'bg-amber-500/20 text-amber-400',
  'bg-emerald-400': 'bg-emerald-500/20 text-emerald-400',
}
</script>

<template>
  <div class="flex flex-col rounded-2xl border border-white/5 bg-[#0b0f17]/60 p-5">
    <!-- Column header -->
    <div class="mb-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="h-2.5 w-2.5 rounded-full" :class="column.dot" />
        <div>
          <h3 class="text-sm font-semibold text-white">{{ column.label }}</h3>
          <p class="text-xs text-zinc-500">{{ column.subtitle }}</p>
        </div>
      </div>
      <span
        class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
        :class="badgeClasses[column.dot]"
      >
        {{ missions.length }}
      </span>
    </div>

    <!-- Mission cards -->
    <div class="flex flex-1 flex-col gap-3">
      <MissionCard
        v-for="mission in missions"
        :key="mission.id"
        :mission="mission"
      />
    </div>

    <!-- Add mission button -->
    <button
      type="button"
      class="mt-4 w-full rounded-2xl border border-dashed border-white/8 py-3 text-sm text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-400"
      @click="emit('add-mission', column.key)"
    >
      + Add mission
    </button>
  </div>
</template>
