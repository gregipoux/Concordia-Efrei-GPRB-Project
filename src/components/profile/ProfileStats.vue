<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/authStore.js'

const auth = useAuthStore()
const agent = computed(() => auth.currentAgent)

const stats = computed(() => [
  { value: agent.value?.heist    ?? 0, label: 'Heists joined' },
  { value: agent.value?.missions ?? 0, label: 'Missions completed' },
  { value: agent.value?.status === 'On Mission' ? 1 : 0, label: 'Active missions' },
  { value: 2, label: 'Active passports' },
])
</script>

<template>
  <div class="profile-stats-grid">
    <div v-for="stat in stats" :key="stat.label" class="profile-stat-card">
      <span class="profile-stat-value">{{ stat.value }}</span>
      <span class="profile-stat-label">{{ stat.label }}</span>
    </div>
  </div>
</template>


<style scoped>
.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .profile-stats-grid { grid-template-columns: repeat(2, 1fr); }
}

.profile-stat-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(10, 13, 22, 0.62);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.profile-stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.profile-stat-label {
  font-size: 0.8rem;
  color: #71717a;
}
</style>