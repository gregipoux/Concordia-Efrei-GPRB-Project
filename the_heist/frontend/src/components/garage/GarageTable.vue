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
  <section class="overflow-hidden rounded-[28px] border border-white/5 bg-[#0a0d14]">
    <div class="overflow-x-auto">
      <table class="min-w-full border-separate border-spacing-0">
        <thead>
          <tr class="bg-white/[0.02]">
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">#</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Vehicle</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Color</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Plate</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Status</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Driver</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Stash Location</th>
            <th class="px-5 py-5 text-left text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="car in vehicles"
            :key="car.id"
            class="border-t border-white/5 transition-colors duration-200 hover:bg-white/[0.02]"
          >
            <td class="px-5 py-5 text-sm text-zinc-500">{{ car.id }}</td>

            <td class="px-5 py-5">
              <div class="text-sm font-semibold text-white">{{ car.vehicle }}</div>
              <div class="mt-1 text-sm text-zinc-500">{{ car.year }}</div>
            </td>

            <td class="px-5 py-5">
              <div class="flex items-center gap-3 text-sm text-zinc-300">
                <span
                  class="inline-block h-3.5 w-3.5 rounded-full ring-1 ring-white/10"
                  :style="{ backgroundColor: car.colorHex || '#777777' }"
                />
                <span>{{ car.color }}</span>
              </div>
            </td>

            <td class="px-5 py-5">
              <span class="rounded-lg border border-amber-300/10 bg-amber-400/10 px-3 py-2 text-sm font-semibold tracking-wide text-amber-300">
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
                  :class="car.driverInitials === '—' ? 'bg-zinc-800 text-zinc-500' : 'bg-violet-500 text-white'"
                >
                  {{ car.driverInitials }}
                </div>
                <span
                  class="text-sm"
                  :class="car.driver === 'Unassigned' ? 'text-zinc-500' : 'text-zinc-200'"
                >
                  {{ car.driver }}
                </span>
              </div>
            </td>

            <td class="px-5 py-5 text-sm text-zinc-500">{{ car.stashLocation }}</td>

            <td class="px-5 py-5">
              <div class="flex items-center gap-2">
                <button
                  class="flex items-center gap-1 rounded-lg border border-white/6 px-3 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white active:scale-95"
                  @click="emit('edit', car)"
                >
                  <Pencil :size="14" />
                  Edit
                </button>

                <button
                  class="flex items-center gap-1 rounded-lg border border-white/6 px-3 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white active:scale-95"
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