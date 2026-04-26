import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'heistTheme'

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function applyToHtml(theme) {
  if (typeof document === 'undefined') return
  if (theme === 'dark') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(readStored())
  applyToHtml(theme.value)

  watch(theme, (next) => {
    applyToHtml(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(t) {
    theme.value = t === 'light' ? 'light' : 'dark'
  }

  return { theme, toggle, setTheme }
})
