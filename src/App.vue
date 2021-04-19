<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'

  import AppProvider from '/@/components/AppProvider/index.vue'
  import { useLocale } from '/@/locales/useLocale'

  export default defineComponent({
    name: 'App',
    components: {
      AppProvider,
      ConfigProvider,
    },
    setup() {
      // support Multi-language
      const { getAntdLocale } = useLocale()

      return {
        getAntdLocale,
      }
    },
  })
</script>
