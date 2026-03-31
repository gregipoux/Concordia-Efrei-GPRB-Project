<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/AuthStore.js'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  alias: '',
  retinalScan: '',
})

const error = ref('')

function handleAuthenticate() {
  error.value = ''
  if (!form.alias.trim()) {
    error.value = 'Enter your operative alias.'
    return
  }
  const success = auth.login(form.alias)
  if (success) {
    router.push('/board')
  } else {
    error.value = 'Unknown alias. Access denied.'
  }
}

const slides = [
  {
    eyebrow: 'THE HEIST',
    titleTop: 'Plan the',
    titleAccent: 'perfect operation.',
    description:
      'Coordinate your crew, track missions, and secure the loot — all in one encrypted workspace.',
  },
  {
    eyebrow: 'OPERATIONS BOARD',
    titleTop: 'Track every',
    titleAccent: 'mission clearly.',
    description:
      'Organize tasks by status, follow priorities, and keep the whole operation moving in one place.',
  },
  {
    eyebrow: 'CREW & GARAGE',
    titleTop: 'Manage agents',
    titleAccent: 'and vehicles.',
    description:
      'Review operatives, assign roles, and monitor every getaway car with a clean operational overview.',
  },
  {
    eyebrow: 'INTEL & PROFILE',
    titleTop: 'Secure your',
    titleAccent: 'sensitive data.',
    description:
      'Access classified intel, review active sessions, and keep your identity protected at every step.',
  },
]

const activeSlide = ref(0)
const isPaused = ref(false)
let intervalId = null

function goToSlide(index) {
  activeSlide.value = index
}

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % slides.length
}

function startAutoplay() {
  stopAutoplay()
  intervalId = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 5000)
}

function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})

const currentSlide = computed(() => slides[activeSlide.value])
</script>

<template>
  <div class="signin-shell">
    <div
      class="signin-panel signin-panel-left"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <div class="signin-left-inner">
        <div class="signin-logo-row">
          <div class="signin-logo-mark">💎</div>
          <span class="signin-logo-text">{{ currentSlide.eyebrow }}</span>
        </div>

        <div class="signin-left-copy">
          <h2 class="signin-left-title">
            {{ currentSlide.titleTop }}
            <span class="signin-left-title-accent">{{ currentSlide.titleAccent }}</span>
          </h2>

          <p class="signin-left-description">
            {{ currentSlide.description }}
          </p>
        </div>

        <div class="signin-left-dots">
          <button
            v-for="(slide, index) in slides"
            :key="slide.eyebrow"
            type="button"
            class="signin-dot"
            :class="{ 'signin-dot-active': activeSlide === index }"
            @click="goToSlide(index)"
          />
        </div>
      </div>
    </div>

    <div class="signin-panel signin-panel-right">
      <div class="signin-form-wrap">
        <p class="signin-welcome">Welcome back, Agent.</p>

        <h1 class="signin-title">
          Verify your identity to
          <br />
          access the operations board.
        </h1>

        <form class="signin-form" @submit.prevent="handleAuthenticate">
          <div>
            <label class="signin-label">OPERATIVE ALIAS</label>
            <input
              v-model="form.alias"
              type="text"
              class="signin-input signin-input-boxed"
              placeholder="your_codename"
            />
          </div>

          <div>
            <label class="signin-label">RETINAL SCAN</label>
            <input
              v-model="form.retinalScan"
              type="password"
              class="signin-input signin-input-boxed"
              placeholder="••••••••••••"
            />
          </div>

          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

          <button type="submit" class="signin-auth-btn-solid">
            Authenticate →
          </button>
        </form>

        <div class="signin-secured-wrap">
          <div class="signin-secured-divider">
            <span></span>
            <p>secured by</p>
            <span></span>
          </div>

          <div class="signin-secure-card">
            <span class="signin-lock">🔐</span>
            <p>
              Session protected by encrypted fake
              passport JWT. Auto-expires in 24h.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>