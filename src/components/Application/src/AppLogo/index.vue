<template>
  <div :class="[prefixCls, { collapsed: getCollapsed }]"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'AppLogo',
    setup() {
      const { prefixCls } = useDesign('app-logo')

      const { getCollapsed } = useMenuSetting()

      return {
        prefixCls,
        getCollapsed,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    height: 60px;
    background: url('../../assets/images/logo.png') no-repeat 20px center;
    background-size: 128px 28px;
    &.collapsed {
      background: url('../../assets/images/logo_collapse.png') no-repeat center center;
    }
  }
</style>
