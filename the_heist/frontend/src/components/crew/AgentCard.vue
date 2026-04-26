<script setup>
import { computed } from 'vue'

const props = defineProps({
  agent: {
    type: Object,
    required: true,
  },
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
  const roleInHeist = props.agent.roleInHeist?.toLowerCase() || ''

  if (role === 'godfather') return 'bg-amber-500'
  if (roleInHeist.includes('driver')) return 'bg-violet-500'
  if (roleInHeist.includes('hacker')) return 'bg-sky-400'
  if (roleInHeist.includes('lookout')) return 'bg-rose-500'

  return 'bg-indigo-500'
})

const statusClass = computed(() => {
  switch (props.agent.status) {
    case 'Active':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'

    case 'On Mission':
      return 'border-rose-400/20 bg-rose-400/10 text-rose-300'

    case 'Available':
      return 'border-violet-400/20 bg-violet-400/10 text-violet-300'

    case 'Standby':
      return 'border-white/10 bg-white/5 text-gray-400'

    default:
      return 'border-white/10 bg-white/5 text-gray-300'
  }
})

const presenceDotClass = computed(() => {
  switch (props.agent.status) {
    case 'Active':
      return 'bg-emerald-400'

    case 'On Mission':
      return 'bg-rose-400'

    case 'Available':
      return 'bg-violet-400'

    case 'Standby':
      return 'bg-gray-400'

    default:
      return 'bg-gray-500'
  }
})

const roleBadge = computed(() => {
  const role = props.agent.role?.toLowerCase() || ''

  if (role === 'godfather') {
    return {
      label: '👑 Godfather',
      classes: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    }
  }

  return {
    label: '🕵 Agent',
    classes: 'border-white/10 bg-white/5 text-gray-300',
  }
})
</script>

<template>
  <article
    class="group flex min-h-[320px] flex-col rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-[var(--border)] hover:bg-[var(--bg-card-hover)]"
  >
    <div class="mb-6 flex justify-end">
      <span
        class="rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
        :class="statusClass"
      >
        {{ agent.status }}
      </span>
    </div>

    <div class="text-center">
      <div class="relative mx-auto w-fit">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-white shadow-lg"
          :class="avatarClass"
        >
          {{ initials }}
        </div>

        <span
          class="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#0d0f15]"
          :class="presenceDotClass"
        ></span>
      </div>

      <h3 class="mt-5 truncate text-xl font-semibold text-[var(--text-primary)]">
        {{ agent.alias }}
      </h3>

      <div class="mt-2 flex items-center justify-center">
        <span
          class="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px]"
          :class="roleBadge.classes"
        >
          {{ roleBadge.label }}
        </span>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-3">
      <div class="rounded-2xl bg-[var(--bg-overlay)] px-3 py-4 text-center">
        <div class="text-2xl font-semibold text-[var(--text-primary)]">{{ agent.heist }}</div>
        <div class="mt-1 text-[11px] text-[var(--text-muted)]">Heists</div>
      </div>

      <div class="rounded-2xl bg-[var(--bg-overlay)] px-3 py-4 text-center">
        <div class="text-2xl font-semibold text-[var(--text-primary)]">{{ agent.missions }}</div>
        <div class="mt-1 text-[11px] text-[var(--text-muted)]">Missions</div>
      </div>
    </div>

    <div class="mt-6 text-center">
      <p class="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        Role in Heist
      </p>

      <p
        v-if="agent.specialization"
        class="mt-3 text-sm text-[var(--text-secondary)]"
      >
        {{ agent.specialization }}
      </p>

      <p
        v-else
        class="mt-3 text-sm text-[var(--text-secondary)]"
      >
        {{ agent.roleInHeist }}
      </p>
    </div>

  </article>
</template>