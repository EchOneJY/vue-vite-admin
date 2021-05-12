<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <div :class="`${prefixCls}__left`">
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div :class="`${prefixCls}__right`">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'PageFooter',
    inheritAttrs: false,
    setup() {
      const { prefixCls } = useDesign('page-footer')
      const { getMenuWidth } = useMenuSetting()

      const getWrapStyle = computed(() => {
        return {
          width: `calc(100% - ${unref(getMenuWidth)}px)`,
        }
      })
      return { prefixCls, getWrapStyle }
    },
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-page-footer';

  .@{prefix-cls} {
    height: 56px;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: @page-footer-z-index;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 24px;
    line-height: 56px;
    background: @white;
    box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.03);
    transition: width 0.2s;

    &__left {
      flex: 1 1;
    }
  }
</style>
