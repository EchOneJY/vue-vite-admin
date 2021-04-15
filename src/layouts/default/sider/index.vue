<template>
  <Sider v-model:collapsed="getCollapsed" :trigger="null" collapsible>
    <AppLogo />
    <LayoutMenu />
  </Sider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Layout } from 'ant-design-vue'
  import AppLogo from '/@/components/AppLogo/index.vue'
  import LayoutMenu from '../menu/index.vue'

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'LayoutSider',
    components: {
      Sider: Layout.Sider,
      LayoutMenu,
      AppLogo,
    },
    setup() {
      const { getCollapsed } = useMenuSetting()
      return {
        getCollapsed,
      }
    },
  })
</script>
