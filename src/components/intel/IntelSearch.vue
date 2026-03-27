<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-3">
    <div class="relative flex-1">
      <svg
        class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        :value="modelValue"
        type="text"
        placeholder="Search intel files..."
        class="w-full rounded-2xl border border-white/8 bg-[#0a0d14] py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
