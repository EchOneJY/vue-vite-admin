<template>
  <ConfigProvider :locale="locale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'

  import AppProvider from '/@/components/AppProvider/index.vue'

  export default defineComponent({
    name: 'App',
    components: {
      AppProvider,
      ConfigProvider,
    },
    setup() {
      return {
        locale: zhCN,
      }
    },
  })
</script>
