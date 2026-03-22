<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNavbar from '../components/layout/TopNavbar.vue'
import BackgroundGlow from '../components/ui/BackgroundGlow.vue'
import PageTransition from '../components/ui/PageTransition.vue'
import ConfirmLogoutModal from '../components/modals/ConfirmLogoutModal.vue'
import ProfileAgent from '../components/profile/ProfileAgent.vue'
import ProfileStats from '../components/profile/ProfileStats.vue'
import AgentIdentityCard from '../components/profile/AgentIdentityCard.vue'
import RetinalScanCard from '../components/profile/RetinalScanCard.vue'
import FakePassportsCard from '../components/profile/FakePassportsCard.vue'
import PreferencesCard from '../components/profile/PreferencesCard.vue'
import DangerZoneCard from '../components/profile/DangerZoneCard.vue'
import { useAuthStore } from '../stores/authStore.js'

const auth = useAuthStore()
const router = useRouter()
const showLogoutModal = ref(false)

function openLogoutModal() {
  showLogoutModal.value = true
}

function handleLogout() {
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
        <div class="space-y-6">

          <ProfileAgent />

          <ProfileStats />

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AgentIdentityCard />
            <RetinalScanCard />
          </div>

          <FakePassportsCard />

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PreferencesCard />
            <DangerZoneCard @logout="handleLogout" />
          </div>

        </div>
      </main>
    </PageTransition>

    <ConfirmLogoutModal
        :show="showLogoutModal"
        @close="showLogoutModal = false"
        @confirm="handleLogout"
    />
  </div>
</template>