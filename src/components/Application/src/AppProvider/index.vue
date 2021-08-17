<script lang="ts">
  import { defineComponent, toRefs, ref, unref } from 'vue'
  import { createAppProviderContext } from './useAppContext'
  import { createBreakpointListen } from '/@/hooks/event/useBreakpoint'
  import { prefixCls } from '/@/settings/design'
  import { useAppStore } from '/@/store/modules/app'

  const props = {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: prefixCls },
  }

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false)
      const isSetState = ref(false)

      const appStore = useAppStore()

      // Monitor screen breakpoint information changes
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG)
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth
        }
        handleRestoreState()
      })

      const { prefixCls } = toRefs(props)

      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile })

      /**
       * Used to maintain the state before the window changes
       */
      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            isSetState.value = true
            const {
              menuSetting: { collapsed: menuCollapsed },
            } = appStore.getProjectConfig

            appStore.setBeforeMiniInfo({ menuCollapsed })
          }
        } else {
          if (unref(isSetState)) {
            isSetState.value = false
            const { menuCollapsed } = appStore.getBeforeMiniInfo
            appStore.setProjectConfig({
              menuSetting: {
                collapsed: menuCollapsed,
              },
            })
          }
        }
      }
      return () => slots.default?.()
    },
  })
</script>
