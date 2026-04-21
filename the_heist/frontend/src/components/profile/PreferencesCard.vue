<script setup>
import { ref } from 'vue'

const preferences = ref([
  {
    id: 'mission_alerts',
    label: 'Mission assignment alerts',
    description: 'Notify when a mission is assigned to you',
    enabled: true,
  },
  {
    id: 'crew_alerts',
    label: 'New crew member alerts',
    description: 'Notify when an agent joins your heist',
    enabled: true,
  },
  {
    id: 'deadline_reminders',
    label: 'Deadline reminders',
    description: '24h reminder before mission deadline',
    enabled: false,
  },
  {
    id: 'auto_expire',
    label: 'Auto-expire passports',
    description: 'Revoke sessions after 24h automatically',
    enabled: true,
  },
  {
    id: 'two_factor',
    label: 'Two-factor retinal scan',
    description: 'Require 2FA on every new login',
    enabled: false,
  },
])
</script>

<template>
  <div class="profile-section-card">
    <div class="profile-section-header">
      <div>
        <h2 class="profile-section-title">Preferences</h2>
        <p class="profile-section-subtitle">Notifications &amp; security settings</p>
      </div>
    </div>

    <div class="prefs-list">
      <div v-for="pref in preferences" :key="pref.id" class="pref-item">
        <div class="pref-text">
          <p class="pref-label">{{ pref.label }}</p>
          <p class="pref-description">{{ pref.description }}</p>
        </div>
        <button
            class="toggle-btn"
            :class="{ 'toggle-btn--on': pref.enabled }"
            :aria-checked="pref.enabled"
            role="switch"
            @click="pref.enabled = !pref.enabled"
        >
          <span class="toggle-thumb" />
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.profile-section-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(10, 13, 22, 0.62);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
}

.profile-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-section-title { margin: 0 0 0.2rem; font-size: 1rem; font-weight: 600; color: white; }
.profile-section-subtitle { margin: 0; font-size: 0.8rem; color: #52525b; }

.prefs-list { display: flex; flex-direction: column; }

.pref-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.95rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.pref-item:last-child { border-bottom: none; }
.pref-text { flex: 1; }
.pref-label { margin: 0 0 0.15rem; font-size: 0.88rem; font-weight: 500; color: #e4e4e7; }
.pref-description { margin: 0; font-size: 0.76rem; color: #52525b; }

.toggle-btn {
  flex-shrink: 0;
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  padding: 0;
  transition: background 0.2s ease;
}

.toggle-btn--on { background: #8b5cf6; }

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.toggle-btn--on .toggle-thumb { transform: translateX(20px); }
</style>