<script setup>
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
    
    <!-- Glow 1 -->
    <div
      class="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full
             bg-violet-500/10 blur-[120px] animate-glow-slow"
    ></div>

    <!-- Glow 2 -->
    <div
      class="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full
             bg-cyan-400/10 blur-[100px] animate-glow-medium"
    ></div>

    <!-- Glow 3 -->
    <div
      class="absolute bottom-[-150px] left-1/3 h-[450px] w-[450px] rounded-full
             bg-indigo-500/10 blur-[120px] animate-glow-slow-reverse"
    ></div>

  </div>
</template>

<style scoped>
@keyframes glow-slow {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(40px, 60px);
  }
}

@keyframes glow-medium {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-30px, 40px);
  }
}

@keyframes glow-slow-reverse {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-40px, -50px);
  }
}

.animate-glow-slow {
  animation: glow-slow 9s ease-in-out infinite;
}

.animate-glow-medium {
  animation: glow-medium 7s ease-in-out infinite;
}

.animate-glow-slow-reverse {
  animation: glow-slow-reverse 10s ease-in-out infinite;
}
</style>