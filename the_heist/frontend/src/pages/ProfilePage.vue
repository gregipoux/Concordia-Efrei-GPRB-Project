<script setup>
import { useRouter } from 'vue-router'
import ProfileAgent from '../components/profile/ProfileAgent.vue'
import ProfileStats from '../components/profile/ProfileStats.vue'
import AgentIdentityCard from '../components/profile/AgentIdentityCard.vue'
import RetinalScanCard from '../components/profile/RetinalScanCard.vue'
import FakePassportsCard from '../components/profile/FakePassportsCard.vue'
import PreferencesCard from '../components/profile/PreferencesCard.vue'
import DangerZoneCard from '../components/profile/DangerZoneCard.vue'
import { useAuthStore } from '../stores/AuthStore.js'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  router.push('/signin')
}
</script>

<template>
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
</template>
