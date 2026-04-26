<script setup>
import { Pencil, Trash2 } from 'lucide-vue-next'

defineProps({
  mission: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

const priorityClasses = {
  Critical: 'bg-rose-500/15 text-rose-400',
  High: 'bg-amber-500/15 text-amber-400',
  Low: 'bg-emerald-500/15 text-emerald-400',
}
</script>

<template>
  <div class="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-alt)] px-5 py-4 transition-colors hover:border-[var(--border)]">
    <div class="flex items-start justify-between gap-3">
      <p class="text-sm font-medium text-[var(--text-primary)] leading-snug">
        {{ mission.title }}
      </p>
      <span
        class="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold"
        :class="priorityClasses[mission.priority]"
      >
        {{ mission.priority }}
      </span>
    </div>

    <div class="mt-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <template v-if="mission.assignee">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
            {{ mission.assigneeInitials }}
          </span>
          <span class="text-xs text-[var(--text-muted)]">{{ mission.assignee }}</span>
        </template>
        <template v-else>
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-overlay-strong)] text-xs text-[var(--text-muted)]">
            —
          </span>
          <span class="text-xs text-[var(--text-muted)]">Unassigned</span>
        </template>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs text-[var(--text-subtle)] group-hover:hidden">{{ mission.date }}</span>
        <div class="hidden gap-1 group-hover:flex">
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            @click="emit('edit', mission)"
          >
            <Pencil :size="12" />
          </button>
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:border-rose-400/40 hover:text-rose-500"
            @click="emit('delete', mission)"
          >
            <Trash2 :size="12" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
