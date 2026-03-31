<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/AuthStore.js'

const auth = useAuthStore()
const agent = computed(() => auth.currentAgent)
</script>

<template>
  <div v-if="agent" class="profile-section-card">
    <div class="profile-section-header">
      <div>
        <h2 class="profile-section-title">Agent Identity</h2>
        <p class="profile-section-subtitle">Your operative profile &amp; codename</p>
      </div>
    </div>

    <div class="profile-section-body">
      <div class="profile-field-row">
        <div class="profile-field">
          <label class="profile-field-label">OPERATIVE ALIAS</label>
          <input :value="agent.alias" type="text" class="modal-input" readonly />
        </div>
        <div class="profile-field">
          <label class="profile-field-label">ROLE</label>
          <input :value="agent.role" type="text" class="modal-input" readonly />
        </div>
      </div>

      <div class="profile-field">
        <label class="profile-field-label">SPECIALIZATION</label>
        <input :value="agent.specialization" type="text" class="modal-input" readonly />
      </div>

      <div class="profile-field">
        <label class="profile-field-label">ROLE IN HEIST</label>
        <input :value="agent.roleInHeist" type="text" class="modal-input" readonly />
      </div>

      <div class="profile-field">
        <label class="profile-field-label">STATUS</label>
        <div class="agent-status-row">
          <span
              class="agent-status-badge"
              :class="{
              'status--active':     agent.status === 'Active',
              'status--standby':    agent.status === 'Standby',
              'status--on-mission': agent.status === 'On Mission',
              'status--available':  agent.status === 'Available',
            }"
          >
            <span class="agent-status-dot" />
            {{ agent.status }}
          </span>
        </div>
      </div>

      <div class="profile-field">
        <label class="profile-field-label">RECRUITMENT DATE</label>
        <input :value="agent.recruitmentDate" type="date" class="modal-input" readonly />
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

.profile-section-title {
  margin: 0 0 0.2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.profile-section-subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: #52525b;
}

.profile-section-body {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.profile-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-field-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #52525b;
}

.modal-input[readonly] {
  opacity: 0.75;
  cursor: default;
}

.agent-status-row { display: flex; align-items: center; }

.agent-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid transparent;
}

.agent-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.status--active    { background: rgba(34, 197, 94, 0.1);   border-color: rgba(34, 197, 94, 0.25);   color: #4ade80; }
.status--standby   { background: rgba(234, 179, 8, 0.1);   border-color: rgba(234, 179, 8, 0.25);   color: #facc15; }
.status--on-mission{ background: rgba(139, 92, 246, 0.12); border-color: rgba(139, 92, 246, 0.28);  color: #a78bfa; }
.status--available { background: rgba(6, 182, 212, 0.1);   border-color: rgba(6, 182, 212, 0.25);   color: #22d3ee; }
</style>