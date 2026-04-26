<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  maxWidth: {
    type: String,
    default: 'max-w-2xl',
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <transition name="pop">
        <div
          v-if="show"
          :class="maxWidth"
          class="w-full rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-2xl shadow-black/40"
        >
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-[var(--text-primary)]">
              {{ title }}
            </h2>

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-overlay-strong)] hover:text-[var(--text-primary)]"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.22s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>