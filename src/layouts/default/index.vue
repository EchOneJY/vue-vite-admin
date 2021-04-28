<template>
  <Layout :class="prefixCls">
    <LayoutSider />
    <Layout>
      <LayoutHeader />
      <LayoutTabs />
      <LayoutContent :class="`${prefixCls}-content`" />
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  import LayoutSider from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutTabs from './tabs/index.vue'
  import LayoutContent from './content/index.vue'

  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Layout,
      LayoutSider,
      LayoutHeader,
      LayoutTabs,
      LayoutContent,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout')

      return { prefixCls }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    width: 100%;
    min-height: 100%;
    background: @content-bg;
    &-content {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
    }
  }
</style>
