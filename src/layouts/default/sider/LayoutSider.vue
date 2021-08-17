<template>
  <div v-if="!getIsMobile" :style="getHiddenDomStyle"></div>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__logo`" :style="getLogoStyle">
      <AppLogo :showTitle="!getCollapsed" />
    </div>
    <Sider
      :class="`${prefixCls}__content`"
      :width="getMenuWidth"
      v-model:collapsed="getCollapsed"
      :trigger="null"
      collapsible
    >
      <LayoutMenu />
    </Sider>
  </div>
</template>

<script lang="ts">
  import { CSSProperties, defineComponent, computed, unref } from 'vue'

  import { Layout } from 'ant-design-vue'
  import { AppLogo } from '/@/components/Application'
  import LayoutMenu from '../menu/index.vue'

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useAppInject } from '/@/hooks/web/useAppInject'
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

      const { getIsMobile } = useAppInject()

      const { getCollapsed, getMenuWidth } = useMenuSetting()

      const getHiddenDomStyle = computed(
        (): CSSProperties => {
          const width = `${unref(getMenuWidth)}px`
          return {
            width,
            overflow: 'hidden',
            flex: `0 0 ${width}`,
            maxWidth: width,
            minWidth: width,
            transition: 'all 0.2s',
          }
        }
      )

      const getLogoStyle = computed(
        (): CSSProperties => {
          const width = `${unref(getMenuWidth)}px`
          return {
            width: unref(width),
          }
        }
      )

      return {
        prefixCls,
        getIsMobile,
        getCollapsed,
        getMenuWidth,
        getLogoStyle,
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
    z-index: 510;
    height: 100%;

    &__logo {
      height: 48px;
      display: flex;
      justify-content: center;
      align-content: center;
      background-color: @sider-bg-color;
      transition: all 0.2s;
    }

    &__content {
      height: calc(100% - 48px);
      overflow-y: auto;
      background: @sider-bg-color;
    }
  }
</style>
