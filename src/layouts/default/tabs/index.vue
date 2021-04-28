<template>
  <div :class="getWrapClass">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <TabContent :tabItem="item" />
          </template>
        </TabPane>
      </template>

      <!-- <template #tabBarExtraContent v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <TabContent isExtra :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template> -->
    </Tabs>
  </div>
</template>
<script lang="ts">
  import type { RouteLocationNormalized } from 'vue-router'

  import { defineComponent, computed, unref, ref, watch } from 'vue'

  import { Tabs } from 'ant-design-vue'
  import TabContent from './components/TabContent.vue'
  // import FoldButton from './components/FoldButton.vue';
  // import TabRedo from './components/TabRedo.vue';

  import { useGo } from '/@/hooks/web/usePage'

  import { tabsStore } from '/@/store/modules/tabs'
  import { userStore } from '/@/store/modules/user'

  import { useDesign } from '/@/hooks/web/useDesign'
  // import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'

  // import { REDIRECT_NAME } from '/@/router/constant'
  // import { listenerRouteChange } from '/@/logics/mitt/routeChange'

  import { useRouter, useRoute } from 'vue-router'
  import { REDIRECT_ROUTE } from '/@/router/routes'

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      // TabRedo,
      // FoldButton,
      Tabs,
      TabPane: Tabs.TabPane,
      TabContent,
    },
    setup() {
      const activeKeyRef = ref('')

      const router = useRouter()
      const route = useRoute()

      const { prefixCls } = useDesign('multiple-tabs')
      const go = useGo()
      // const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()

      const getTabsState = computed(() => {
        return tabsStore.getTabList.filter((item) => !item.meta?.hideTab)
      })

      console.log(getTabsState.value)

      const unClose = computed(() => unref(getTabsState).length === 1)

      const getWrapClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide-close`]: unref(unClose),
          },
        ]
      })

      watch(
        () => route.path,
        () => {
          const { path, fullPath, meta = {} } = route
          if (path === REDIRECT_ROUTE.path || !userStore.getToken) {
            return
          }
          const { currentActiveMenu, hideTab } = meta
          const isHide = !hideTab ? null : currentActiveMenu
          const p = isHide || fullPath || path
          if (activeKeyRef.value !== p) {
            activeKeyRef.value = p as string
          }
          // debugger
          if (isHide) {
            const findParentRoute = router
              .getRoutes()
              .find((item) => item.path === currentActiveMenu)

            findParentRoute &&
              tabsStore.addTab((findParentRoute as unknown) as RouteLocationNormalized)
          } else {
            tabsStore.addTab(unref(route))
          }
        }
      )

      // listenerRouteChange((route) => {
      //   const { name } = route
      //   if (name === REDIRECT_NAME || !route || !userStore.getToken) {
      //     return
      //   }

      //   const { path, fullPath, meta = {} } = route
      //   const { currentActiveMenu, hideTab } = meta
      //   const isHide = !hideTab ? null : currentActiveMenu
      //   const p = isHide || fullPath || path
      //   if (activeKeyRef.value !== p) {
      //     activeKeyRef.value = p as string
      //   }

      //   if (isHide) {
      //     const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)

      //     findParentRoute &&
      //       tabsStore.addTab((findParentRoute as unknown) as RouteLocationNormalized)
      //   } else {
      //     tabsStore.addTab(unref(route))
      //   }
      // })

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey
        go(activeKey, false)
      }

      // Close the current tab
      function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
          return
        }

        tabsStore.closeTabByKey(targetKey, router)
      }
      return {
        prefixCls,
        unClose,
        getWrapClass,
        handleEdit,
        handleChange,
        activeKeyRef,
        getTabsState,
        // getShowQuick,
        // getShowRedo,
        // getShowFold,
      }
    },
  })
</script>
<style lang="less">
  @import './index.less';
</style>
