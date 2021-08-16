<template>
  <Layout :class="prefixCls">
    <LayoutSider v-if="getShowMenu" />
    <Layout>
      <div :style="{ height: getHeaderShow ? '80px' : '32px' }"></div>
      <div :class="`${prefixCls}-multiple-header`" :style="getWrapStyle">
        <LayoutHeader v-if="getHeaderShow" />
        <LayoutTabs />
      </div>

      <LayoutContent :class="`${prefixCls}-content`" />
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { computed, CSSProperties, defineComponent, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import LayoutSider from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutTabs from './tabs/index.vue'
  import LayoutContent from './content/index.vue'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'

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
      const { getShowMenu, getMenuWidth } = useMenuSetting()
      const { getHeaderShow } = useHeaderSetting()

      const getWrapStyle = computed(
        (): CSSProperties => {
          const style: CSSProperties = {}
          style.width = unref(getShowMenu) ? `calc(100% - ${unref(getMenuWidth)}px)` : '100%'
          return style
        }
      )

      return { prefixCls, getShowMenu, getHeaderShow, getWrapStyle }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    width: 100%;
    min-height: 100%;
    background: @content-bg;

    &-multiple-header {
      position: fixed;
      top: 0;
      z-index: 505;
    }

    &-content {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
    }
  }
</style>
