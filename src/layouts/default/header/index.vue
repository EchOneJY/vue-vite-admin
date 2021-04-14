<template>
  <Header class="layout-header">
    <!-- <span class="layout-header-tirgger" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
    </span> -->
  </Header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Layout } from 'ant-design-vue'
  // import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  // import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      // MenuUnfoldOutlined,
      // MenuFoldOutlined,
    },
    // setup() {
    //   const { getCollapsed, toggleCollapsed } = useMenuSetting
    //   return {
    //     getCollapsed,
    //     toggleCollapsed,
    //   }
    // },
  })
</script>
