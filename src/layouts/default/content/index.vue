<template>
  <div :class="[prefixCls]">
    <RouterView>
      <template #default="{ Component, route }">
        <transition name="fade-slide" mode="out-in" appear>
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'LayoutContent',
    setup() {
      const { prefixCls } = useDesign('layout-content')

      return {
        prefixCls,
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
