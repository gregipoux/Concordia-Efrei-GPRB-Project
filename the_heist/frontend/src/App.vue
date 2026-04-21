<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <component :is="Component" :key="route.matched[0]?.path || route.path" />
    </transition>
  </RouterView>
</template>
