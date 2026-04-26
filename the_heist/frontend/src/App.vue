<script setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useThemeStore } from './stores/ThemeStore.js'

const themeStore = useThemeStore()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <component :is="Component" :key="route.matched[0]?.path || route.path" />
    </transition>
  </RouterView>

  <Toaster
    :theme="themeStore.theme"
    position="bottom-right"
    rich-colors
    close-button
  />
</template>
