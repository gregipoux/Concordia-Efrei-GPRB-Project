<template>
  <article
    class="group flex min-h-[320px] flex-col rounded-3xl border border-white/5 bg-[#0d0f15] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-white/10 hover:bg-[#10131b]"
  >
    <div class="mb-5 flex items-start justify-between">
      <div class="relative">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold text-white shadow-lg"
          :class="avatarClass"
        >
          {{ initials }}
        </div>

        <span
          class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0d0f15]"
          :class="agent.isOnline ? 'bg-emerald-400' : 'bg-rose-400'"
        ></span>
      </div>

      <span
        class="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
        :class="statusClass"
      >
        {{ agent.status }}
      </span>
    </div>

    <div class="text-center">
      <h3 class="truncate text-sm font-semibold text-white">
        {{ agent.alias }}
      </h3>

      <div class="mt-2 flex items-center justify-center">
        <span
          class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-gray-300"
        >
          {{ agent.role }}
        </span>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-3">
      <div class="rounded-2xl bg-white/[0.03] px-3 py-3 text-center">
        <div class="text-xl font-semibold text-white">{{ agent.heist }}</div>
        <div class="mt-1 text-[11px] text-gray-500">Heists</div>
      </div>

      <div class="rounded-2xl bg-white/[0.03] px-3 py-3 text-center">
        <div class="text-xl font-semibold text-white">{{ agent.missions }}</div>
        <div class="mt-1 text-[11px] text-gray-500">Missions</div>
      </div>
    </div>

    <div class="mt-5 space-y-2 text-center">
      <p class="text-[11px] uppercase tracking-[0.18em] text-gray-500">Role in heist</p>
      <p class="text-sm text-gray-300">{{ agent.roleInHeist }}</p>

      <p
        v-if="agent.specialization"
        class="text-xs text-gray-500"
      >
        {{ agent.specialization }}
      </p>
    </div>

    <div class="mt-auto grid grid-cols-2 gap-2 pt-6">
      <button
        class="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
      >
        View
      </button>
      <button
        class="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
      >
        Assign
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  agent: {
    type: Object,
    required: true
  }
})

const initials = computed(() => {
  return props.agent.alias
    .split('_')
    .map((word) => word[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2)
})

const avatarClass = computed(() => {
  const role = props.agent.role?.toLowerCase()

  if (role === 'godfather') return 'bg-amber-500'
  if (props.agent.roleInHeist?.toLowerCase().includes('driver')) return 'bg-violet-500'
  if (props.agent.roleInHeist?.toLowerCase().includes('hacker')) return 'bg-sky-400'
  if (props.agent.roleInHeist?.toLowerCase().includes('lookout')) return 'bg-rose-500'

  return 'bg-indigo-500'
})

const statusClass = computed(() => {
  if (props.agent.status === 'On Mission') {
    return 'border-amber-400/20 bg-amber-400/10 text-amber-300'
  }

  if (props.agent.isOnline) {
    return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
  }

  return 'border-white/10 bg-white/5 text-gray-300'
})
</script>