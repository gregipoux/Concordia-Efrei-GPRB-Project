<script setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <component :is="Component" :key="route.matched[0]?.path || route.path" />
    </transition>
  </RouterView>

  <Toaster
    theme="dark"
    position="bottom-right"
    rich-colors
    close-button
  />
</template>
