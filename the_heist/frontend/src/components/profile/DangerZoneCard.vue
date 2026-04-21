<script setup>
import { ref } from 'vue'

const emit = defineEmits(['logout'])

const confirmBurn   = ref(false)
const confirmLeave  = ref(false)
const confirmDelete = ref(false)

function burnPassports() {
  confirmBurn.value = false}

function leaveHeist() {
  confirmLeave.value = false
}

function deleteAccount() {
  confirmDelete.value = false
  emit('logout')
}
</script>

<template>
  <div class="profile-section-card">
    <div class="profile-section-header">
      <div>
        <h2 class="profile-section-title danger-title">Danger Zone</h2>
        <p class="profile-section-subtitle">Irreversible actions — proceed with caution</p>
      </div>
    </div>

    <div class="danger-list">

      <!-- Burn Passports -->
      <div class="danger-item">
        <div class="danger-text">
          <p class="danger-label">Burn all passports</p>
          <p class="danger-description">Immediately revoke all active sessions on every device</p>
        </div>
        <template v-if="!confirmBurn">
          <button class="danger-btn danger-btn--soft" @click="confirmBurn = true">Burn Passports</button>
        </template>
        <template v-else>
          <div class="danger-confirm">
            <span class="danger-confirm-text">Sure?</span>
            <button class="danger-btn danger-btn--confirm" @click="burnPassports">Yes</button>
            <button class="secondary-btn" @click="confirmBurn = false">No</button>
          </div>
        </template>
      </div>

      <!-- Leave Heist -->
      <div class="danger-item">
        <div class="danger-text">
          <p class="danger-label">Go dark — Leave operation</p>
          <p class="danger-description">Remove yourself from the current heist. Missions will be unassigned.</p>
        </div>
        <template v-if="!confirmLeave">
          <button class="danger-btn danger-btn--soft" @click="confirmLeave = true">Leave Heist</button>
        </template>
        <template v-else>
          <div class="danger-confirm">
            <span class="danger-confirm-text">Sure?</span>
            <button class="danger-btn danger-btn--confirm" @click="leaveHeist">Yes</button>
            <button class="secondary-btn" @click="confirmLeave = false">No</button>
          </div>
        </template>
      </div>

      <!-- Delete / Erase identity -->
      <div class="danger-item">
        <div class="danger-text">
          <p class="danger-label">Erase identity</p>
          <p class="danger-description">Permanently delete your account. This action cannot be undone.</p>
        </div>
        <template v-if="!confirmDelete">
          <button class="danger-btn danger-btn--hard" @click="confirmDelete = true">Delete Account</button>
        </template>
        <template v-else>
          <div class="danger-confirm">
            <span class="danger-confirm-text">Permanent — sure?</span>
            <button class="danger-btn danger-btn--confirm" @click="deleteAccount">Yes, delete</button>
            <button class="secondary-btn" @click="confirmDelete = false">Cancel</button>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>


<style scoped>
.profile-section-card {
  border-radius: 16px;
  border: 1px solid rgba(239, 68, 68, 0.12);
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
  border-bottom: 1px solid rgba(239, 68, 68, 0.08);
}

.profile-section-title { margin: 0 0 0.2rem; font-size: 1rem; font-weight: 600; color: white; }
.danger-title { color: #f87171; }
.profile-section-subtitle { margin: 0; font-size: 0.8rem; color: #52525b; }

.danger-list { display: flex; flex-direction: column; }

.danger-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.danger-item:last-child { border-bottom: none; }
.danger-text { flex: 1; }
.danger-label { margin: 0 0 0.15rem; font-size: 0.88rem; font-weight: 500; color: #e4e4e7; }
.danger-description { margin: 0; font-size: 0.76rem; color: #52525b; }

.danger-btn {
  flex-shrink: 0;
  border-radius: 12px;
  padding: 0.55rem 1rem;
  font-size: 0.83rem;
  font-weight: 600;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.danger-btn--soft    { background: rgba(239, 68, 68, 0.08);  border-color: rgba(239, 68, 68, 0.2);  color: #f87171; }
.danger-btn--soft:hover { background: rgba(239, 68, 68, 0.15); }
.danger-btn--hard    { background: rgba(239, 68, 68, 0.12);  border-color: rgba(239, 68, 68, 0.3);  color: #f87171; }
.danger-btn--hard:hover { background: rgba(239, 68, 68, 0.22); }
.danger-btn--confirm { background: #ef4444; border-color: #ef4444; color: white; }
.danger-btn--confirm:hover { background: #dc2626; }

.danger-confirm { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
.danger-confirm-text { font-size: 0.78rem; color: #f87171; white-space: nowrap; }
</style>