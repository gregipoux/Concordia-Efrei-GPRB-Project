<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:activeTab'])
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      class="rounded-xl border px-4 py-2 text-sm font-medium transition"
      :class="
        activeTab === tab
          ? 'border-violet-400/20 bg-violet-500/15 text-violet-200'
          : 'border-white/6 bg-transparent text-zinc-400 hover:border-white/10 hover:text-white'
      "
      @click="emit('update:activeTab', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>