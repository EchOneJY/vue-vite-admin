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

      <template #tabBarExtraContent v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <TabOperation :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import type { RouteLocationNormalized } from 'vue-router'

  import { defineComponent, computed, unref, ref, watch } from 'vue'

  import { Tabs } from 'ant-design-vue'
  import TabContent from './components/TabContent.vue'
  import TabOperation from './components/TabOperation.vue'
  import FoldButton from './components/FoldButton.vue'
  import TabRedo from './components/TabRedo.vue'

  import { useGo } from '/@/hooks/web/usePage'

  import { useTabsStore } from '/@/store/modules/tabs'
  import { useUserStore } from '/@/store/modules/user'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useTabsSetting } from '/@/hooks/setting/useTabsSetting'

  import { useRouter, useRoute } from 'vue-router'
  import { REDIRECT_NAME } from '/@/router/constant'

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      TabRedo,
      TabOperation,
      FoldButton,
      Tabs,
      TabPane: Tabs.TabPane,
      TabContent,
    },
    setup() {
      const tabsStore = useTabsStore()
      const userStore = useUserStore()

      const activeKeyRef = ref('')

      const router = useRouter()
      const route = useRoute()

      const { prefixCls } = useDesign('tabs')
      const go = useGo()
      const { getShowRedo, getShowFold, getShowQuick } = useTabsSetting()

      const getTabsState = computed(() => {
        return tabsStore.getTabList.filter((item) => !item.meta?.hideTab)
      })

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
          const { path, fullPath, meta } = route
          if (route.name === REDIRECT_NAME || !userStore.getToken) {
            return
          }
          const { currentActiveMenu, hideTab } = meta
          const isHide = !hideTab ? null : currentActiveMenu
          const p = isHide || fullPath || path
          if (activeKeyRef.value !== p) {
            activeKeyRef.value = p as string
          }
          if (isHide) {
            const findParentRoute = router
              .getRoutes()
              .find((item) => item.path === currentActiveMenu)

            findParentRoute &&
              tabsStore.addTab((findParentRoute as unknown) as RouteLocationNormalized)
          }

          tabsStore.addTab(unref(route))
        },
        {
          immediate: true,
        }
      )

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
        getShowQuick,
        getShowRedo,
        getShowFold,
      }
    },
  })
</script>
<style lang="less">
  @import './index.less';
</style>
