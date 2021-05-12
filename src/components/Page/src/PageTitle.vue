<template>
  <div :class="prefixCls">
    <Divider type="vertical" :class="`${prefixCls}__divider`" />
    <span :class="`${prefixCls}__title`">{{ title }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Divider } from 'ant-design-vue'
  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'PageTitle',
    components: {
      Divider,
    },
    props: {
      title: {
        type: String,
      },
    },
    setup() {
      const { prefixCls } = useDesign('page-title')

      return {
        prefixCls,
      }
    },
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-page-title';

  .@{prefix-cls} {
    width: 100%;
    &__divider {
      width: 2px;
      height: 14px;
      background: @primary-color;
      position: relative;
      top: -2px;
    }
    &__title {
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>
