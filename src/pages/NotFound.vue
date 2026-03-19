<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import BackgroundGlow from '../components/ui/BackgroundGlow.vue'

/* 🎲 Messages aléatoires */
const messages = [
  "Vault compromised. Probably Kevin again.",
  "Signal lost. Crew went for coffee. Might not return.",
  "Access denied. Try bribing the system.",
  "This vault never existed. Or did it?",
  "Connection lost… rerouting to nearest pizza place.",
  "Encryption failed. Have you tried turning it off and on again?",
  "Agent missing. Last seen chasing a baguette.",
  "System error. Blame the intern.",
  "Vault empty. Someone was faster than you.",
  "Signal lost… switching to Plan B (there is no Plan B).",
  "Access denied. Insert dramatic music.",
  "Node unreachable. We’re going on vacation.",
  "Security breach. Or just bad luck.",
  "Mission failed successfully.",
  "Signal lost so we're going on a break to the nearest fast food."
]

const randomMessage = ref("")

/* 💎 Easter egg */
const clickCount = ref(0)
const showSecret = ref(false)

function handleDiamondClick() {
  clickCount.value++

  if (clickCount.value >= 5) {
    showSecret.value = true
    showModal.value = true
  }
}

const showModal = ref(false)

onMounted(() => {
  randomMessage.value =
    messages[Math.floor(Math.random() * messages.length)]
})
</script>

<template>
  <div class="relative min-h-screen bg-[#05070d] text-white overflow-hidden">
    <BackgroundGlow />

    <!-- GRID -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.04]"
      style="
        background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 80px 80px;
      "
    ></div>

    <!-- LEFT STRIP (fake ads) -->
    <div class="hidden xl:flex absolute left-0 top-0 h-full w-72 flex-col justify-between p-6">
      <div class="space-y-6">
      
        <div class="ad-card ad-card-featured">
          <div class="ad-badge">BLACK FRIDAY HEIST</div>
        
          <div class="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 class="ad-title">Crowbar X-900</h3>
              <p class="ad-copy">
                Break in. Leave no trace. Built for professionals with poor decision-making.
              </p>
            </div>
          
            <div class="ad-visual ad-visual-crowbar">
              🛠️
            </div>
          </div>
        
          <div class="ad-meter mt-5">
            <span class="ad-meter-fill w-[82%]"></span>
          </div>
        
          <div class="mt-4 flex items-center justify-between text-[10px] text-gray-500">
            <span>Stealth rating: A+</span>
            <span>Untraceable</span>
          </div>
        </div>
      
        <div class="grid grid-cols-2 gap-4">
          <div class="ad-card h-40">
            <div class="ad-mini-top">
              <span class="ad-chip">NEW</span>
              <span class="text-[10px] text-gray-500">MK II</span>
            </div>
            <div class="ad-visual ad-visual-mask mt-4">🎭</div>
            <h4 class="mt-4 text-sm font-semibold text-white">Ghost Mask™</h4>
            <p class="mt-2 text-[11px] leading-5 text-gray-500">
              Facial recognition? Never heard of it.
            </p>
          </div>
        
          <div class="ad-card h-40">
            <div class="ad-mini-top">
              <span class="ad-chip ad-chip-cyan">QUIET</span>
              <span class="text-[10px] text-gray-500">PRO</span>
            </div>
            <div class="ad-visual ad-visual-drill mt-4">🌀</div>
            <h4 class="mt-4 text-sm font-semibold text-white">Silent Drill</h4>
            <p class="mt-2 text-[11px] leading-5 text-gray-500">
              Because noise is a liability.
            </p>
          </div>
        </div>
      
        <div class="ad-card">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold text-white">Field Kit Bundle</h4>
            <span class="ad-chip">LIMITED</span>
          </div>
        
          <div class="mt-4 grid grid-cols-3 gap-3">
            <div class="ad-icon-box">🧤</div>
            <div class="ad-icon-box">🔦</div>
            <div class="ad-icon-box">🧨</div>
          </div>
        
          <p class="mt-4 text-[11px] leading-5 text-gray-500">
            Gloves, compact torch, distraction tools and more. Illegal elegance in one box.
          </p>
        </div>
      </div>
    
      <div class="text-[10px] text-gray-600">
        Sponsored by DarkWeb Partners™
      </div>
    </div>

    <!-- RIGHT STRIP -->
    <div class="hidden xl:flex absolute right-0 top-0 h-full w-72 flex-col justify-between p-6 text-right">
      <div class="space-y-6">
      
        <div class="ad-card ad-card-featured ad-card-featured-cyan text-left">
          <div class="ad-badge ad-badge-cyan">FIELD ESSENTIAL</div>
        
          <div class="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 class="ad-title">EMP Pulse Kit</h3>
              <p class="ad-copy">
                Lights out. Cameras blind. Confidence restored.
              </p>
            </div>
          
            <div class="ad-visual ad-visual-emp">
              ⚡
            </div>
          </div>
        
          <div class="mt-5 rounded-xl border border-white/8 bg-black/25 p-3">
            <div class="flex items-center justify-between text-[10px] text-gray-500">
              <span>Effective radius</span>
              <span>12 m</span>
            </div>
            <div class="ad-meter mt-2">
              <span class="ad-meter-fill ad-meter-fill-cyan w-[68%]"></span>
            </div>
          </div>
        </div>
      
        <div class="ad-card text-left">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold text-white">Escape Van Rental</h4>
            <span class="ad-chip ad-chip-cyan">FAST</span>
          </div>
        
          <div class="mt-4 rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.06] to-transparent p-4">
            <div class="text-4xl">🚐</div>
            <div class="mt-3 flex items-center justify-between text-[10px] text-gray-500">
              <span>No papers</span>
              <span>No questions</span>
            </div>
          </div>
        
          <p class="mt-4 text-[11px] leading-5 text-gray-500">
            Fast. Disposable. Absolutely not insured.
          </p>
        </div>
      
        <div class="grid grid-cols-2 gap-4 text-left">
          <div class="ad-card h-44">
            <div class="ad-mini-top">
              <span class="ad-chip">STEALTH</span>
              <span class="text-[10px] text-gray-500">V4</span>
            </div>
            <div class="ad-visual mt-5">🎧</div>
            <h4 class="mt-4 text-sm font-semibold text-white">Comms Jammer</h4>
            <p class="mt-2 text-[11px] leading-5 text-gray-500">
              No signal. No panic. No witnesses talking to HQ.
            </p>
          </div>
        
          <div class="ad-card h-44">
            <div class="ad-mini-top">
              <span class="ad-chip ad-chip-cyan">HOT</span>
              <span class="text-[10px] text-gray-500">RX</span>
            </div>
            <div class="ad-visual mt-5">🧲</div>
            <h4 class="mt-4 text-sm font-semibold text-white">Lock Magnet</h4>
            <p class="mt-2 text-[11px] leading-5 text-gray-500">
              Because keys are for amateurs.
            </p>
          </div>
        </div>
      
        <div class="ad-card text-left">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold text-white">Verified Suppliers</h4>
            <span class="text-[10px] text-gray-500">TRUSTED</span>
          </div>
        
          <div class="mt-4 grid grid-cols-4 gap-2">
            <div class="ad-code-box"></div>
            <div class="ad-code-box"></div>
            <div class="ad-code-box"></div>
            <div class="ad-code-box"></div>
          </div>
        
          <p class="mt-4 text-[11px] leading-5 text-gray-500">
            Handpicked gear dealers for your next “completely legitimate” operation.
          </p>
        </div>
      </div>
    
      <div class="text-[10px] text-gray-600">
        Trusted by professionals
      </div>
    </div>

    <!-- MAIN -->
    <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">

      <!-- 💎 LOGO -->
      <div
        @click="handleDiamondClick"
        class="mb-10 flex h-24 w-24 cursor-pointer items-center justify-center rounded-3xl
               bg-white/[0.05] backdrop-blur-md border border-white/10
               shadow-[0_0_40px_rgba(139,92,246,0.35)]
               text-4xl animate-pulse-slow hover:scale-105 transition"
      >
        💎
      </div>

      <!-- 🔥 GLITCH 404 -->
      <h1 class="glitch text-[120px] font-semibold">
        404
      </h1>

      <!-- Subtitle -->
      <p class="mt-4 text-xl text-gray-300">
        Vault not found
      </p>

      <!-- 🎲 Random message -->
      <p class="mt-3 max-w-md text-sm text-gray-500 italic">
        {{ randomMessage }}
      </p>

      <!-- Button -->
      <RouterLink
        to="/garage"
        class="mt-10 inline-flex items-center justify-center rounded-2xl
               bg-violet-500 px-6 py-3 text-sm font-medium text-white
               transition hover:bg-violet-400 active:scale-95"
      >
        Return to HQ
      </RouterLink>

      <!-- 🖥️ Terminal -->
      <div
        class="mt-16 w-full max-w-md rounded-2xl border border-white/10
               bg-black/40 backdrop-blur-md p-4 text-left text-xs text-green-400
               shadow-[0_0_30px_rgba(0,0,0,0.6)]"
      >
        <p>> connecting to vault node...</p>
        <p>> decrypting access key...</p>
        <p class="text-red-400">> ERROR 404 : NODE NOT FOUND</p>
        <p>> fallback aborted</p>
      </div>

      <!-- 🕵️ Easter egg -->
      <div
        v-if="showSecret"
        class="mt-8 text-xs text-violet-300"
      >
        🕶️ Hidden message unlocked: “The real vault was the friends we made along the way.”
      </div>

    </div>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div class="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d0f15] p-6 text-center shadow-2xl">

        <h2 class="text-xl font-semibold text-white">
          🔐 Access Granted
        </h2>

        <p class="mt-3 text-sm text-gray-400">
          This system was crafted by:
        </p>

        <div class="mt-5 space-y-2 text-sm text-gray-300">
          <p>• Eleonore GUELLUY</p>
          <p>• Marco-antonio MONTENEGRO LOUREIRO</p>
          <p>• Xavier RELUT-VAINQUEUR</p>
          <p>• Grégoire BELLEPECHE</p>
          <p>• Thomas QUERREC</p>
        </div>

        <button
          @click="showModal = false"
          class="mt-6 rounded-xl bg-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ✨ Glow pulse */
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* ⚡ GLITCH EFFECT */
.glitch {
  position: relative;
  font-size: 120px;
  font-weight: 600;
  letter-spacing: 2px;
  color: white;
  animation: glitch-main 2s infinite;
}

.glitch::before,
.glitch::after {
  content: "404";
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.glitch::before {
  color: #8b5cf6;
  z-index: -1;
  animation: glitch-top 1.5s infinite linear alternate-reverse;
}

.glitch::after {
  color: #22d3ee;
  z-index: -2;
  animation: glitch-bottom 1.8s infinite linear alternate-reverse;
}

/* Main jitter */
@keyframes glitch-main {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 2px); }
  40% { transform: translate(3px, -2px); }
  60% { transform: translate(-2px, 1px); }
  80% { transform: translate(2px, -1px); }
  100% { transform: translate(0); }
}

/* Top slice */
@keyframes glitch-top {
  0% { clip-path: inset(0 0 80% 0); transform: translate(-2px, -2px); }
  20% { clip-path: inset(0 0 60% 0); transform: translate(2px, 2px); }
  40% { clip-path: inset(0 0 70% 0); transform: translate(-3px, 1px); }
  60% { clip-path: inset(0 0 50% 0); transform: translate(3px, -1px); }
  80% { clip-path: inset(0 0 65% 0); transform: translate(-1px, 2px); }
  100% { clip-path: inset(0 0 80% 0); transform: translate(1px, -2px); }
}

/* Bottom slice */
@keyframes glitch-bottom {
  0% { clip-path: inset(80% 0 0 0); transform: translate(2px, 2px); }
  20% { clip-path: inset(60% 0 0 0); transform: translate(-2px, -2px); }
  40% { clip-path: inset(70% 0 0 0); transform: translate(3px, -1px); }
  60% { clip-path: inset(50% 0 0 0); transform: translate(-3px, 1px); }
  80% { clip-path: inset(65% 0 0 0); transform: translate(2px, -2px); }
  100% { clip-path: inset(80% 0 0 0); transform: translate(-1px, 2px); }
}

@keyframes glitchTop {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
}

@keyframes glitchBottom {
  0% { transform: translate(0); }
  20% { transform: translate(2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(1px, -1px); }
  80% { transform: translate(-1px, 1px); }
  100% { transform: translate(0); }
}
</style>