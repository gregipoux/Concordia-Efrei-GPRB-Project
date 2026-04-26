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

const emit = defineEmits(['add-mission', 'edit-mission', 'delete-mission'])

const badgeClasses = {
  'bg-violet-500': 'bg-violet-500/20 text-violet-400',
  'bg-amber-400': 'bg-amber-500/20 text-amber-400',
  'bg-emerald-400': 'bg-emerald-500/20 text-emerald-400',
}
</script>

<template>
  <div class="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
    <!-- Column header -->
    <div class="mb-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="h-2.5 w-2.5 rounded-full" :class="column.dot" />
        <div>
          <h3 class="text-sm font-semibold text-[var(--text-primary)]">{{ column.label }}</h3>
          <p class="text-xs text-[var(--text-muted)]">{{ column.subtitle }}</p>
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
        @edit="emit('edit-mission', $event)"
        @delete="emit('delete-mission', $event)"
      />
    </div>

    <!-- Add mission button -->
    <button
      type="button"
      class="mt-4 w-full rounded-2xl border border-dashed border-[var(--border)] py-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]"
      @click="emit('add-mission', column.key)"
    >
      + Add mission
    </button>
  </div>
</template>
