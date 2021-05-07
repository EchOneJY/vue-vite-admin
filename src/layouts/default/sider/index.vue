<template>
  <div :style="getHiddenDomStyle"></div>
  <Sider
    :class="prefixCls"
    :width="getMenuWidth"
    v-model:collapsed="getCollapsed"
    :trigger="null"
    collapsible
  >
    <AppLogo />
    <LayoutMenu />
  </Sider>
</template>

<script lang="ts">
  import { CSSProperties, defineComponent, computed, unref } from 'vue'

  import { Layout } from 'ant-design-vue'
  import { AppLogo } from '/@/components/Application'
  import LayoutMenu from '../menu/index.vue'

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'LayoutSider',
    components: {
      Sider: Layout.Sider,
      LayoutMenu,
      AppLogo,
    },
    setup() {
      const { prefixCls } = useDesign('layout-sider')
      const { getCollapsed, getMenuWidth } = useMenuSetting()

      const getHiddenDomStyle = computed(
        (): CSSProperties => {
          const width = `${unref(getMenuWidth)}px`
          return {
            width: unref(width),
            overflow: 'hidden',
            flex: `0 0 ${width}`,
            maxWidth: width,
            minWidth: width,
            transition: 'all 0.2s',
          }
        }
      )

      return {
        prefixCls,
        getCollapsed,
        getMenuWidth,
        getHiddenDomStyle,
      }
    },
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider';

  .@{prefix-cls} {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 510;
  }
</style>
