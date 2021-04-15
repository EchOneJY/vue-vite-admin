<template>
  <Layout class="default-layout">
    <LayoutSider />
    <Layout>
      <LayoutHeader />
      <LayoutContent class="layout-content" />
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  import LayoutSider from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutContent from './content/index.vue'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Layout,
      LayoutSider,
      LayoutHeader,
      LayoutContent,
    },
  })
</script>

<style lang="less" scoped>
  .default-layout {
    width: 100%;
    min-height: 100%;
    background: #f4f7f9;
    .layout-content {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
      padding: 1rem;
    }
  }
</style>
