<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/authStore.js'

const auth = useAuthStore()
const agent = computed(() => auth.currentAgent)

const initials = computed(() =>
    agent.value?.alias
        .split('_')
        .map(w => w[0].toUpperCase())
        .slice(0, 2)
        .join('') ?? '??'
)
</script>

<template>
  <div v-if="agent" class="profile-hero-card">
    <div class="profile-banner">
      <div class="profile-banner-gradient" />
    </div>

    <div class="profile-info-row">
      <div class="profile-avatar-wrap">
        <div class="profile-avatar">
          <span class="profile-avatar-initials">{{ initials }}</span>
        </div>
        <span class="profile-online-dot" :class="{ online: agent.isOnline }" />
      </div>

      <div class="profile-meta">
        <h1 class="profile-username">{{ agent.alias }}</h1>
        <div class="profile-badges">
          <span class="profile-badge-role">
            <svg class="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" fill="currentColor"/>
            </svg>
            {{ agent.role }}
          </span>
          <span class="profile-badge-status" :class="{ online: agent.isOnline }">
            <span class="status-dot" />
            {{ agent.isOnline ? 'Online now' : 'Offline' }}
          </span>
          <span class="profile-badge-recruited">
            Recruited {{ new Date(agent.recruitmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </span>
        </div>
      </div>

      <div class="profile-hero-actions">
        <button class="secondary-btn">Edit Avatar</button>
        <button class="primary-btn">Save Profile</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.profile-hero-card {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(10, 13, 22, 0.62);
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.profile-banner {
  position: relative;
  height: 120px;
  overflow: hidden;
}

.profile-banner-gradient {
  position: absolute;
  inset: 0;
  background:
      radial-gradient(ellipse at 30% 50%, rgba(109, 40, 217, 0.55), transparent 60%),
      radial-gradient(ellipse at 75% 40%, rgba(79, 70, 229, 0.4), transparent 55%),
      radial-gradient(ellipse at 60% 80%, rgba(139, 92, 246, 0.3), transparent 45%),
      linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #1a1035 100%);
}

.profile-info-row {
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
  padding: 0 1.75rem 1.5rem;
}

.profile-avatar-wrap {
  position: relative;
  margin-top: -36px;
  flex-shrink: 0;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #4f46e5);
  border: 3px solid #05070d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar-initials {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
}

.profile-online-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #05070d;
  background: #52525b;
}

.profile-online-dot.online {
  background: #22c55e;
}

.profile-meta {
  flex: 1;
  padding-bottom: 0.2rem;
}

.profile-username {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
}

.profile-badges {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.profile-badge-role {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.25);
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #a78bfa;
}

.profile-badge-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #71717a;
}

.profile-badge-status.online { color: #4ade80; }

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.profile-badge-recruited {
  font-size: 0.75rem;
  color: #52525b;
}

.profile-hero-actions {
  display: flex;
  gap: 0.6rem;
  padding-bottom: 0.2rem;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .profile-info-row { flex-wrap: wrap; }
  .profile-hero-actions { width: 100%; justify-content: flex-end; }
}
</style>