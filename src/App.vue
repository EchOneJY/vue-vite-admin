<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import AppProvider from '/@/components/AppProvider/index.vue'

  export default defineComponent({
    name: 'App',
    components: {
      AppProvider,
    },
  })
</script>
