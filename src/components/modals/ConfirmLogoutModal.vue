<script setup>
import BaseModal from './BaseModal.vue'

defineProps({
  show: Boolean,
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <BaseModal :show="show" title="Confirm Sign Out" max-width="max-w-md" @close="emit('close')">
    <p class="mb-6 text-sm leading-6 text-zinc-400">
      Are you sure you want to sign out from your current session?
    </p>

    <div class="flex justify-end gap-3">
      <button type="button" class="secondary-btn" @click="emit('close')">
        Cancel
      </button>

      <button
        type="button"
        class="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/15 active:scale-95"
        @click="emit('confirm')"
      >
        Sign Out
      </button>
    </div>
  </BaseModal>
</template>