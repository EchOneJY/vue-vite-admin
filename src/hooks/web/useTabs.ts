import type { RouteLocationNormalized } from 'vue-router'

import { unref } from 'vue'

import { tabsStore } from '/@/store/modules/tabs'
import { appStore } from '/@/store/modules/app'

import router from '/@/router'

enum TableActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

export function useTabs() {
  function canIUseTabs(): boolean {
    const { show } = appStore.getTabsSetting
    if (!show) {
      throw new Error('The multi-tab page is currently not open, please open it in the settings！')
    }
    return !!show
  }

  const { currentRoute } = router

  function getCurrentTab() {
    const route = unref(currentRoute)
    return tabsStore.getTabList.find((item) => item.path === route.path)!
  }

  async function handleTabAction(action: TableActionEnum, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const currentTab = getCurrentTab()
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabsStore.refreshPage()
        break

      case TableActionEnum.CLOSE_ALL:
        await tabsStore.closeAllTab()
        break

      case TableActionEnum.CLOSE_LEFT:
        await tabsStore.closeLeftTabs(currentTab)
        break

      case TableActionEnum.CLOSE_RIGHT:
        await tabsStore.closeRightTabs(currentTab)
        break

      case TableActionEnum.CLOSE_OTHER:
        await tabsStore.closeOtherTabs(currentTab)
        break

      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabsStore.closeTab(tab || currentTab)
        break
    }
  }

  return {
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    close: (tab?: RouteLocationNormalized) => {
      handleTabAction(TableActionEnum.CLOSE, tab)
    },
  }
}
