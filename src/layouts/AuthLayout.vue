<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNavbar from '../components/layout/TopNavbar.vue'
import BackgroundGlow from '../components/ui/BackgroundGlow.vue'
import PageTransition from '../components/ui/PageTransition.vue'
import ConfirmLogoutModal from '../components/modals/ConfirmLogoutModal.vue'
import { useAuthStore } from '../stores/AuthStore.js'

const auth = useAuthStore()
const router = useRouter()
const showLogoutModal = ref(false)

function openLogoutModal() {
  showLogoutModal.value = true
}

function handleLogout() {
  showLogoutModal.value = false
  auth.logout()
  router.push('/signin')
}
</script>

<template>
  <div class="min-h-screen bg-[#05070d] bg-gradient-to-b from-[#06080f] to-[#04060b]">
    <BackgroundGlow />
    <TopNavbar :on-sign-out-click="openLogoutModal" />

    <PageTransition>
      <main class="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
        <RouterView />
      </main>
    </PageTransition>

    <ConfirmLogoutModal
      :show="showLogoutModal"
      @close="showLogoutModal = false"
      @confirm="handleLogout"
    />
  </div>
</template>
