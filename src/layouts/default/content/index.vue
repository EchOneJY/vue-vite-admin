<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LayoutContent',
  })
</script>
