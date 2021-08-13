<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
  <LayoutFrame />
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'

  import LayoutFrame from '/@/layouts/iframe/index.vue'

  import { useRootSetting } from '/@/hooks/setting/useRootSetting'

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
  import { useTabsSetting } from '/@/hooks/setting/useTabsSetting'
  import { getTransitionName } from './transition'

  import { useTabsStore } from '/@/store/modules/tabs'

  export default defineComponent({
    name: 'PageLayout',
    components: { LayoutFrame },
    setup() {
      const tabsStore = useTabsStore()
      const { getShowTab } = useTabsSetting()

      const { getOpenKeepAlive } = useRootSetting()

      const { getBasicTransition, getEnableTransition } = useTransitionSetting()

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowTab))

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return []
        }
        return tabsStore.getCachedTabList
      })

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
      }
    },
  })
</script>
