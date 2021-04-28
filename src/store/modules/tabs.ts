import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'

import { toRaw, unref } from 'vue'

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'

// import { useGo, useRedo } from '/@/hooks/web/usePage'
import { Persistent } from '/@/utils/cache/persistent'

import ProjectConfig from '/@/settings/project'
import { PageEnum } from '/@/enums/pageEnum'
import { TABS_KEY } from '/@/enums/cacheEnum'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes'
import { getRawRoute } from '/@/utils'

const NAME = 'tabs'
hotModuleUnregisterModule(NAME)

// function handleGotoPage(router: Router) {
//   const go = useGo(router)
//   go(unref(router.currentRoute).path, true)
// }

const cacheTab = ProjectConfig.tabsSetting.cache

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Tabs extends VuexModule {
  private cacheTabList: Set<string> = new Set()
  private tabList: RouteLocationNormalized[] = cacheTab ? Persistent.getLocal(TABS_KEY) || [] : []

  get getTabList() {
    return this.tabList
  }

  get getCachedTabList(): string[] {
    return Array.from(this.cacheTabList)
  }

  @Mutation
  clearCacheTabs(): void {
    this.cacheTabList = new Set()
  }

  @Mutation
  resetState(): void {
    this.tabList = []
    this.clearCacheTabs()
  }

  /**
   * Update the cache according to the currently opened tabs
   */
  @Action
  async updateCacheTab() {
    const cacheMap: Set<string> = new Set()

    for (const tab of this.tabList) {
      const item = getRawRoute(tab)
      // Ignore the cache
      const needCache = !item.meta?.ignoreKeepAlive
      if (!needCache) {
        return
      }
      const name = item.name as string
      cacheMap.add(name)
    }
    this.cacheTabList = cacheMap
    console.log(this.cacheTabList)
  }

  @Action
  async addTab(route: RouteLocationNormalized) {
    const { path, name, fullPath, params, query } = getRawRoute(route)
    // 404  The page does not need to add a tab
    if (
      path === PageEnum.ERROR_PAGE ||
      !name ||
      [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
    ) {
      return
    }

    let updateIndex = -1
    // Existing pages, do not add tabs repeatedly
    const tabHasExits = this.tabList.some((tab, index) => {
      updateIndex = index
      return (tab.fullPath || tab.path) === (fullPath || path)
    })

    // If the tab already exists, perform the update operation
    if (tabHasExits) {
      const curTab = toRaw(this.tabList)[updateIndex]
      if (!curTab) {
        return
      }
      curTab.params = params || curTab.params
      curTab.query = query || curTab.query
      curTab.fullPath = fullPath || curTab.fullPath
      this.tabList.splice(updateIndex, 1, curTab)
      return
    }
    // Add tab
    this.tabList.push(route)
    this.updateCacheTab()
    cacheTab && Persistent.setLocal(TABS_KEY, this.tabList)
  }

  @Action
  async closeTab(tab: RouteLocationNormalized, router: Router) {
    const getToTarget = (tabItem: RouteLocationNormalized) => {
      const { params, path, query } = tabItem
      return {
        params: params || {},
        path,
        query: query || {},
      }
    }

    const close = (route: RouteLocationNormalized) => {
      const { fullPath, meta: { affix } = {} } = route
      if (affix) {
        return
      }
      const index = this.tabList.findIndex((item) => item.fullPath === fullPath)
      index !== -1 && this.tabList.splice(index, 1)
    }

    const { currentRoute, replace } = router

    const { path } = unref(currentRoute)
    if (path !== tab.path) {
      // Closed is not the activation tab
      close(tab)
      return
    }

    // Closed is activated atb
    let toTarget: RouteLocationRaw = {}

    const index = this.tabList.findIndex((item) => item.path === path)

    // If the current is the leftmost tab
    if (index === 0) {
      // There is only one tab, then jump to the homepage, otherwise jump to the right tab
      if (this.tabList.length === 1) {
        toTarget = PageEnum.BASE_HOME
      } else {
        //  Jump to the right tab
        const page = this.tabList[index + 1]
        toTarget = getToTarget(page)
      }
    } else {
      // Close the current tab
      const page = this.tabList[index - 1]
      toTarget = getToTarget(page)
    }
    close(currentRoute.value)
    replace(toTarget)
  }

  // Close according to key
  @Action
  async closeTabByKey(key: string, router: Router) {
    const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key)
    index !== -1 && this.closeTab(this.tabList[index], router)
  }

  // Sort the tabs
  @Action
  async sortTabs(oldIndex: number, newIndex: number) {
    const currentTab = this.tabList[oldIndex]
    this.tabList.splice(oldIndex, 1)
    this.tabList.splice(newIndex, 0, currentTab)
  }
}

export const tabsStore = getModule<Tabs>(Tabs)
