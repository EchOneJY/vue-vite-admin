<template>
  <div :class="`${prefixCls}__info`" @contextmenu="handleContext">
    <span class="ml-1">{{ getTitle }}</span>
  </div>
</template>
<script lang="ts">
  import { PropType } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'

  import { defineComponent, computed } from 'vue'

  import { TabContentProps } from '../types'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useTabDropdown } from '../useTabDropdown'

  export default defineComponent({
    name: 'TabContent',
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const { prefixCls } = useDesign('tabs-content')
      const { t } = useI18n()

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props
        return meta && t(meta.title as string)
      })

      const { handleContextMenu } = useTabDropdown(props as TabContentProps, false)

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e)
      }

      return {
        prefixCls,
        handleContext,
        getTitle,
      }
    },
  })
</script>
