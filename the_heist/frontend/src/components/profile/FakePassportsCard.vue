<script setup>
import { ref } from 'vue'

const sessions = ref([
  {
    id: 1,
    browser: 'Chrome',
    device: 'MacBook Pro',
    icon: '🖥️',
    issuedDate: 'Mar 4',
    expiresIn: '23h 41m',
    location: 'Paris, FR',
    status: 'current',
  },
  {
    id: 2,
    browser: 'Safari',
    device: 'iPhone 15',
    icon: '📱',
    issuedDate: 'Mar 3',
    expiresIn: '11h 20m',
    location: 'Paris, FR',
    status: 'active',
  },
  {
    id: 3,
    browser: 'Firefox',
    device: 'Windows PC',
    icon: '💻',
    issuedDate: 'Feb 28',
    expiresIn: null,
    location: null,
    status: 'expired',
  },
])

function revokeSession(id) {
  const s = sessions.value.find(s => s.id === id)
  if (s) s.status = 'expired'
}

function revokeAll() {
  sessions.value.forEach(s => {
    if (s.status !== 'current') s.status = 'expired'
  })
}
</script>

<template>
  <div class="profile-section-card">
    <div class="profile-section-header">
      <div>
        <h2 class="profile-section-title">Fake Passports</h2>
        <p class="profile-section-subtitle">Active JWT sessions across devices</p>
      </div>
      <button class="secondary-btn" @click="revokeAll">Revoke All</button>
    </div>

    <div class="passports-list">
      <div
          v-for="session in sessions"
          :key="session.id"
          class="passport-item"
          :class="`passport-item--${session.status}`"
      >
        <div class="passport-icon">
          <span>{{ session.icon }}</span>
        </div>

        <div class="passport-info">
          <p class="passport-device">
            <span class="passport-browser">{{ session.browser }}</span>
            <span class="passport-separator">—</span>
            {{ session.device }}
          </p>
          <p class="passport-meta">
            <span>Issued {{ session.issuedDate }}</span>
            <template v-if="session.expiresIn">
              <span class="passport-meta-dot">·</span>
              <span>Expires in {{ session.expiresIn }}</span>
            </template>
            <template v-if="session.location">
              <span class="passport-meta-dot">·</span>
              <span>{{ session.location }}</span>
            </template>
          </p>
        </div>

        <div class="passport-actions">
          <span v-if="session.status === 'current'" class="passport-badge passport-badge--current">Current</span>
          <span v-else-if="session.status === 'expired'" class="passport-badge passport-badge--expired">Expired</span>
          <template v-else>
            <span class="passport-badge passport-badge--active">Active</span>
            <button class="passport-revoke-btn" @click="revokeSession(session.id)">Revoke</button>
          </template>
        </div>
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

.passports-list { display: flex; flex-direction: column; }

.passport-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s ease;
}

.passport-item:last-child { border-bottom: none; }
.passport-item:hover { background: rgba(255, 255, 255, 0.02); }
.passport-item--expired { opacity: 0.5; }

.passport-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.passport-info { flex: 1; min-width: 0; }
.passport-device { margin: 0 0 0.2rem; font-size: 0.9rem; font-weight: 500; color: #e4e4e7; }
.passport-browser { font-weight: 600; color: white; }
.passport-separator { margin: 0 0.3rem; color: #52525b; }
.passport-meta { margin: 0; display: flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; color: #52525b; }
.passport-meta-dot { color: #3f3f46; }
.passport-actions { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }

.passport-badge { border-radius: 6px; padding: 0.2rem 0.6rem; font-size: 0.72rem; font-weight: 600; }
.passport-badge--current { background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.25); color: #a78bfa; }
.passport-badge--active  { background: rgba(34, 197, 94, 0.1);   border: 1px solid rgba(34, 197, 94, 0.2);   color: #4ade80; }
.passport-badge--expired { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); color: #52525b; }

.passport-revoke-btn {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  padding: 0.25rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: #a1a1aa;
  transition: all 0.2s ease;
}

.passport-revoke-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.2);
  color: #f87171;
}
</style>