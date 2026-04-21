<script setup>
</script>

<template>
  <div class="animate-page-enter">
    <slot />
  </div>
</template>

<style scoped>
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-page-enter {
  animation: page-enter 0.4s ease-out;
}
</style>