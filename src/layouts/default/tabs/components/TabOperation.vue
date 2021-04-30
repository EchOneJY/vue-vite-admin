<template>
  <Dropdown :dropMenuList="getDropMenuList" :trigger="getTiggger" @menuEvent="handleMenuEvent">
    <span :class="`${prefixCls}__extra-quick`" @click="handleContext">
      <Icon icon="ion:chevron-down" />
    </span>
  </Dropdown>
</template>
<script lang="ts">
  import { computed, PropType } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'

  import { defineComponent } from 'vue'
  import { Dropdown } from '/@/components/Dropdown/index'
  import { Icon } from '/@/components/Icon'

  import { TabContentProps } from '../types'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useTabDropdown } from '../useTabDropdown'

  export default defineComponent({
    name: 'TabContent',
    components: { Dropdown, Icon },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const { prefixCls } = useDesign('tabs-content')

      const getTiggger = computed(() => ['click'])

      const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
        props as TabContentProps,
        true
      )

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e)
      }

      return {
        prefixCls,
        getDropMenuList,
        handleMenuEvent,
        handleContext,
        getTiggger,
      }
    },
  })
</script>
