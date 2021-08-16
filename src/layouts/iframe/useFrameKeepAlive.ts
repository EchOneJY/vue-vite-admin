import type { AppRouteRecordRaw } from '/@/router/types'

import { computed, toRaw, unref } from 'vue'

import { useTabsStore } from '/@/store/modules/tabs'

import { uniqBy } from 'lodash-es'

import { useTabsSetting } from '/@/hooks/setting/useTabsSetting'

import { useRouter } from 'vue-router'

export function useFrameKeepAlive() {
  const router = useRouter()
  const { currentRoute } = router
  const { getShowTab } = useTabsSetting()
  const tabsStore = useTabsStore()
  const getFramePages = computed(() => {
    const ret =
      getAllFramePages((toRaw(router.getRoutes()) as unknown) as AppRouteRecordRaw[]) || []
    return ret
  })

  const getOpenTabList = computed((): string[] => {
    return tabsStore.getTabList.reduce((prev: string[], next) => {
      if (next.meta && Reflect.has(next.meta, 'frameSrc')) {
        prev.push(next.path as string)
      }
      return prev
    }, [])
  })

  function getAllFramePages(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
    let res: AppRouteRecordRaw[] = []
    for (const route of routes) {
      const { meta: { frameSrc } = {}, children } = route
      if (frameSrc) {
        res.push(route)
      }
      if (children && children.length) {
        res.push(...getAllFramePages(children))
      }
    }
    res = uniqBy(res, 'name')
    return res
  }

  function showIframe(item: AppRouteRecordRaw) {
    return item.name === unref(currentRoute).name
  }

  function hasRenderFrame(name: string) {
    if (!unref(getShowTab)) {
      return router.currentRoute.value.name === name
    }
    return unref(getOpenTabList).includes(name)
  }

  return { hasRenderFrame, getFramePages, showIframe, getAllFramePages }
}
