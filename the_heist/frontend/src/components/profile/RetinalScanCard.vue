<script setup>
import { ref, computed } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const updating = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const isValid = computed(() => {
  return (
      currentPassword.value.length > 0 &&
      newPassword.value.length >= 8 &&
      newPassword.value === confirmPassword.value &&
      /\d/.test(newPassword.value) &&
      /[^a-zA-Z0-9]/.test(newPassword.value)
  )
})

async function updatePassword() {
  errorMsg.value = ''
  successMsg.value = ''

  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = 'New scans do not match.'
    return
  }
  if (newPassword.value.length < 8) {
    errorMsg.value = 'Password must be at least 8 characters.'
    return
  }

  updating.value = true
  await new Promise(r => setTimeout(r, 900))
  updating.value = false
  successMsg.value = 'Retinal scan updated successfully.'
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>

<template>
  <div class="profile-section-card">
    <div class="profile-section-header">
      <div>
        <h2 class="profile-section-title">Retinal Scan</h2>
        <p class="profile-section-subtitle">Update your authentication password</p>
      </div>
      <button
          class="secondary-btn"
          :disabled="updating || !isValid"
          @click="updatePassword"
      >
        {{ updating ? 'Updating…' : 'Update' }}
      </button>
    </div>

    <div class="profile-section-body">
      <div class="profile-field">
        <label class="profile-field-label">CURRENT SCAN</label>
        <input
            v-model="currentPassword"
            type="password"
            class="modal-input"
            placeholder="Enter current password"
        />
      </div>

      <div class="profile-field">
        <label class="profile-field-label">NEW SCAN</label>
        <input
            v-model="newPassword"
            type="password"
            class="modal-input"
            placeholder="Enter new password"
        />
      </div>

      <div class="profile-field">
        <label class="profile-field-label">CONFIRM NEW SCAN</label>
        <input
            v-model="confirmPassword"
            type="password"
            class="modal-input"
            placeholder="Repeat new password"
        />
      </div>

      <!-- Feedback messages -->
      <p v-if="errorMsg" class="scan-msg scan-msg--error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="scan-msg scan-msg--success">{{ successMsg }}</p>

      <!-- Password hint -->
      <div class="scan-hint">
        <span class="scan-hint-icon">🔐</span>
        <p>Password must be at least 8 characters and include one number and one special character.</p>
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

.profile-field { display: flex; flex-direction: column; gap: 0.5rem; }

.profile-field-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #52525b;
}

.scan-hint {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  padding: 0.75rem 1rem;
}

.scan-hint-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }

.scan-hint p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #71717a;
}

.scan-msg {
  margin: 0;
  font-size: 0.83rem;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
}

.scan-msg--error  { color: #f87171; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); }
.scan-msg--success{ color: #4ade80; background: rgba(34, 197, 94, 0.08);  border: 1px solid rgba(34, 197, 94, 0.2); }
</style>