<template>
  <div :class="[prefixCls, getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
    <LayoutPage />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
  import { useContentViewHeight } from './useContentViewHeight'

  import LayoutPage from '/@/layouts/page/index.vue'

  export default defineComponent({
    name: 'LayoutContent',
    components: { LayoutPage },
    setup() {
      const { prefixCls } = useDesign('layout-content')
      const { getOpenPageLoading } = useTransitionSetting()
      const { getLayoutContentMode, getPageLoading } = useRootSetting()

      useContentViewHeight()

      return {
        prefixCls,
        getLayoutContentMode,
        getOpenPageLoading,
        getPageLoading,
      }
    },
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      top: 200px;
      // z-index: @page-loading-z-index;
    }
  }
</style>
