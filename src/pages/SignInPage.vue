<script setup>
import SignInCard from '../components/signin/SignInCard.vue'
</script>

<template>
  <div class="signin-page min-h-screen text-white">
    <div class="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-center px-6 py-10 lg:px-8">
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="signin-bg-orb signin-bg-orb-1" />
        <div class="signin-bg-orb signin-bg-orb-2" />
        <div class="signin-bg-orb signin-bg-orb-3" />
        <div class="signin-bg-orb signin-bg-orb-4" />
      </div>

      <div class="signin-enter relative z-10 flex w-full items-center justify-center">
        <SignInCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.signin-page {
  background:
    radial-gradient(circle at 18% 22%, rgba(124, 58, 237, 0.22), transparent 20%),
    radial-gradient(circle at 78% 20%, rgba(59, 130, 246, 0.14), transparent 18%),
    radial-gradient(circle at 70% 75%, rgba(168, 85, 247, 0.10), transparent 20%),
    linear-gradient(180deg, #060811 0%, #05070d 100%);
}

.signin-bg-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(110px);
  opacity: 0.42;
}

.signin-bg-orb-1 {
  top: 6%;
  left: 4%;
  width: 320px;
  height: 320px;
  background: rgba(139, 92, 246, 0.18);
}

.signin-bg-orb-2 {
  top: 14%;
  right: 8%;
  width: 240px;
  height: 240px;
  background: rgba(59, 130, 246, 0.12);
}

.signin-bg-orb-3 {
  bottom: 10%;
  left: 12%;
  width: 260px;
  height: 260px;
  background: rgba(99, 102, 241, 0.1);
}

.signin-bg-orb-4 {
  right: 16%;
  bottom: 12%;
  width: 200px;
  height: 200px;
  background: rgba(168, 85, 247, 0.1);
}

.signin-enter {
  animation: signinFade 0.42s ease;
}

@keyframes signinFade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>