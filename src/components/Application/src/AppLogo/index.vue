<template>
  <div :class="[prefixCls, { collapsed: getCollapsed }]">
    <img src="../../../../assets/images/logo.png" />
    <div
      class="ml-2 truncate md:opacity-100"
      :class="[
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !alwaysShowTitle,
        },
      ]"
    >
      {{ siderTitle }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useGlobSetting } from '/@/hooks/setting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'AppLogo',
    props: {
      alwaysShowTitle: propTypes.bool.def(false),
    },
    setup() {
      const { prefixCls } = useDesign('app-logo')
      const { siderTitle } = useGlobSetting()
      const { getCollapsed } = useMenuSetting()

      return {
        siderTitle,
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
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    img {
      width: 70px;
      height: 27px;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &__title {
      color: @white;
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      transition: all 0.5s;
    }
  }
</style>
