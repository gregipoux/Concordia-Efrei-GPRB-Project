<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const showOperationMenu = ref(false)
const operationMenuRef = ref(null)

const navItems = [
  { label: 'Board', to: '/board' },
  { label: 'Crew', to: '/crew' },
  { label: 'Garage', to: '/garage' },
  { label: 'Intel', to: '/intel' },
]

const props = defineProps({
  onSignOutClick: {
    type: Function,
    default: null,
  },
})

function toggleOperationMenu() {
  showOperationMenu.value = !showOperationMenu.value
}

function closeOperationMenu() {
  showOperationMenu.value = false
}

function handleClickOutside(event) {
  if (!showOperationMenu.value) return
  if (!operationMenuRef.value) return

  if (!operationMenuRef.value.contains(event.target)) {
    closeOperationMenu()
  }
}

function handleScroll() {
  if (showOperationMenu.value) {
    closeOperationMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <header class="border-b border-white/5 bg-[#070a11]">
    <div class="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-8">
      <div class="flex items-center gap-8">
        <RouterLink to="/garage" class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.25)] text-white"
          >
            💎
          </div>

          <span class="text-xs uppercase tracking-[0.28em] text-zinc-200">
            The Heist
          </span>
        </RouterLink>

        <nav class="hidden items-center gap-2 md:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-xl px-4 py-2 text-sm transition-all duration-200"
            :class="
              route.path === item.to
                ? 'bg-violet-500/15 text-white'
                : 'text-zinc-500 hover:text-white'
            "
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <div ref="operationMenuRef" class="relative hidden md:block">
          <button
            class="rounded-full border border-violet-400/10 bg-violet-500/10 px-4 py-2 text-xs font-medium tracking-wide text-violet-200 transition-all duration-200 hover:bg-violet-500/15 active:scale-95"
            @click.stop="toggleOperationMenu"
          >
            ⚡ GOLDEN VAULT
          </button>

          <transition name="fade">
            <div
              v-if="showOperationMenu"
              class="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl border border-white/10 bg-[#0b0f17] p-4 shadow-2xl"
            >
              <div class="text-xs uppercase tracking-[0.18em] text-zinc-500">Current Operation</div>
              <div class="mt-2 text-base font-semibold text-white">Golden Vault</div>

              <div class="mt-4 space-y-2 text-sm text-zinc-400">
                <div class="flex justify-between">
                  <span>Leader</span>
                  <span class="text-zinc-200">the_godfather</span>
                </div>
                <div class="flex justify-between">
                  <span>Status</span>
                  <span class="text-emerald-300">Active</span>
                </div>
                <div class="flex justify-between">
                  <span>Operatives</span>
                  <span class="text-zinc-200">4</span>
                </div>
              </div>

              <div class="mt-4 flex flex-col gap-2">
                <button class="secondary-btn w-full text-left">View Details</button>
                <button class="secondary-btn w-full text-left">Switch Operation</button>
              </div>
            </div>
          </transition>
        </div>

        <RouterLink
          to="/profile"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white shadow-lg shadow-violet-950/30"
        >
          GR
        </RouterLink>

        <button
          class="rounded-xl border border-white/6 px-4 py-2 text-sm text-zinc-300 transition-all duration-200 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300 active:scale-95"
          @click="props.onSignOutClick && props.onSignOutClick()"
        >
          Sign Out
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>