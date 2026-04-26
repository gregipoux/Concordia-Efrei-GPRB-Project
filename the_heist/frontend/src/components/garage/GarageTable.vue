<script setup>
import { Pencil, ArrowRightLeft } from 'lucide-vue-next'
import StatusBadge from '../ui/StatusBadge.vue'

defineProps({
  vehicles: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['edit', 'move'])
</script>

<template>
  <section class="overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-card-alt)]">
    <div class="overflow-x-auto">
      <table class="min-w-full border-separate border-spacing-0">
        <thead>
          <tr class="bg-[var(--bg-overlay-soft)]">
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">#</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Vehicle</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Color</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Plate</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Status</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Driver</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Stash Location</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="car in vehicles"
            :key="car.id"
            class="border-t border-[var(--border-subtle)] transition-colors duration-200 hover:bg-[var(--bg-overlay-soft)]"
          >
            <td class="px-5 py-5 text-sm text-[var(--text-muted)]">{{ car.id }}</td>

            <td class="px-5 py-5">
              <div class="text-sm font-semibold text-[var(--text-primary)]">{{ car.vehicle }}</div>
              <div class="mt-1 text-sm text-[var(--text-muted)]">{{ car.year }}</div>
            </td>

            <td class="px-5 py-5">
              <div class="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span
                  class="inline-block h-3.5 w-3.5 rounded-full ring-1 ring-[var(--border)]"
                  :style="{ backgroundColor: car.colorHex || '#777777' }"
                />
                <span>{{ car.color }}</span>
              </div>
            </td>

            <td class="px-5 py-5">
              <span class="rounded-lg border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-sm font-semibold tracking-wide text-amber-600 dark:text-amber-300">
                {{ car.plate }}
              </span>
            </td>

            <td class="px-5 py-5">
              <StatusBadge :status="car.status" />
            </td>

            <td class="px-5 py-5">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                  :class="car.driverInitials === '—' ? 'bg-[var(--bg-overlay-strong)] text-[var(--text-muted)]' : 'bg-violet-500 text-white'"
                >
                  {{ car.driverInitials }}
                </div>
                <span
                  class="text-sm"
                  :class="car.driver === 'Unassigned' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'"
                >
                  {{ car.driver }}
                </span>
              </div>
            </td>

            <td class="px-5 py-5 text-sm text-[var(--text-muted)]">{{ car.stashLocation }}</td>

            <td class="px-5 py-5">
              <div class="flex items-center gap-2">
                <button
                  class="flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-overlay-strong)] hover:text-[var(--text-primary)] active:scale-95"
                  @click="emit('edit', car)"
                >
                  <Pencil :size="14" />
                  Edit
                </button>

                <button
                  class="flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-overlay-strong)] hover:text-[var(--text-primary)] active:scale-95"
                  @click="emit('move', car)"
                >
                  <ArrowRightLeft :size="14" />
                  Move
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>