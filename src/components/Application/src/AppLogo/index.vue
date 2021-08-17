<template>
  <div :class="[prefixCls, { collapsed: getCollapsed }]">
    <img style="width: 32px; height: 32px" src="../../../../assets/images/logo.png" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ siderTitle }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useGlobSetting } from '/@/hooks/setting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'AppLogo',
    props: {
      alwaysShowTitle: propTypes.bool.def(false),
      showTitle: propTypes.bool.def(true),
    },
    setup(props) {
      const { prefixCls } = useDesign('app-logo')
      const { siderTitle } = useGlobSetting()
      const { getCollapsed } = useMenuSetting()

      const getTitleClass = computed(() => [
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !props.alwaysShowTitle,
        },
      ])

      return {
        siderTitle,
        prefixCls,
        getTitleClass,
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
      font-size: 18px;
      font-weight: 600;
      transition: all 0.5s;
    }
  }
</style>
