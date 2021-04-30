import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { toRaw, unref } from 'vue'

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'

import { useGo, useRedo } from '/@/hooks/web/usePage'
import { Persistent } from '/@/utils/cache/persistent'

import ProjectConfig from '/@/settings/project'
import { PageEnum } from '/@/enums/pageEnum'
import { TABS_KEY } from '/@/enums/cacheEnum'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes'
import { getRawRoute } from '/@/utils'
import router from '/@/router'
import { cloneDeep } from 'lodash-es'

const NAME = 'tabs'
hotModuleUnregisterModule(NAME)

function handleGotoPage() {
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

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
  commitSetTabList(tabs: RouteLocationNormalized[]): void {
    console.log(tabs)
    this.tabList = tabs
  }

  @Mutation
  commitSetCacheTabs(tabs: Set<string>): void {
    this.cacheTabList = tabs
  }

  @Mutation
  commitClearCacheTabs(): void {
    this.cacheTabList = new Set()
  }
  // Sort the tabs
  @Mutation
  commitSortTabs(oldIndex: number, newIndex: number) {
    const currentTab = this.tabList[oldIndex]
    this.tabList.splice(oldIndex, 1)
    this.tabList.splice(newIndex, 0, currentTab)
  }

  /**
   * Close tabs in bulk
   */
  @Mutation
  bulkCloseTabs(pathList: string[]) {
    this.tabList = this.tabList.filter((item) => !pathList.includes(item.fullPath))
  }

  @Action
  handleResetState(): void {
    this.commitSetTabList([])
    this.commitClearCacheTabs()
  }

  @Action
  goToPage() {
    const go = useGo(router)
    const len = this.tabList.length
    const { path } = unref(router.currentRoute)

    let toPath: PageEnum | string = PageEnum.BASE_HOME

    if (len > 0) {
      const page = this.tabList[len - 1]
      const p = page.fullPath || page.path
      if (p) {
        toPath = p
      }
    }
    // Jump to the current page and report an error
    path !== toPath && go(toPath as PageEnum, true)
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
      const path = item.path as string
      cacheMap.add(path)
    }
    this.commitSetCacheTabs(cacheMap)
  }

  @Action
  addTab(route: RouteLocationNormalized) {
    const addRoute = getRawRoute(route)
    const tabList = cloneDeep(toRaw(this.tabList))
    const { path } = addRoute
    if (
      path === PageEnum.ERROR_PAGE ||
      [REDIRECT_ROUTE.path, PAGE_NOT_FOUND_ROUTE.path].includes(path as string)
    ) {
      return
    }
    if (tabList.some((tab) => tab.path === path)) return
    // Add tab
    tabList.push(addRoute)
    this.commitSetTabList(tabList)
    this.updateCacheTab()
    cacheTab && Persistent.setLocal(TABS_KEY, this.tabList)
  }

  @Action
  closeTab(tab: RouteLocationNormalized) {
    const tabList = cloneDeep(toRaw(this.tabList))
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
      const index = tabList.findIndex((item) => item.fullPath === fullPath)
      if (index !== -1) {
        tabList.splice(index, 1)
        this.commitSetTabList(tabList)
      }
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

    const index = tabList.findIndex((item) => item.path === path)

    // If the current is the leftmost tab
    if (index === 0) {
      // There is only one tab, then jump to the homepage, otherwise jump to the right tab
      if (tabList.length === 1) {
        toTarget = PageEnum.BASE_HOME
      } else {
        //  Jump to the right tab
        const page = tabList[index + 1]
        toTarget = getToTarget(page)
      }
    } else {
      // Close the current tab
      const page = tabList[index - 1]
      toTarget = getToTarget(page)
    }
    close(currentRoute.value)
    replace(toTarget)
  }

  // Close according to key
  @Action
  closeTabByKey(key: string) {
    const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key)
    index !== -1 && this.closeTab(this.tabList[index])
  }

  /**
   * Refresh tabs
   */
  @Action
  async refreshPage() {
    const cacheTabList = cloneDeep(this.cacheTabList)
    const { currentRoute } = router
    const route = unref(currentRoute)
    const name = route.name

    const findTab = this.getCachedTabList.find((item) => item === name)
    if (findTab) {
      cacheTabList.delete(findTab)
      this.commitSetCacheTabs(cacheTabList)
    }
    const redo = useRedo(router)
    await redo()
  }

  /**
   * closeAllTab tabs
   */
  @Action
  closeAllTab() {
    const tabList = this.tabList.filter((item) => item?.meta?.affix ?? false)
    this.commitSetTabList(tabList)
    this.commitClearCacheTabs()
    this.goToPage()
  }

  // Close the tab on the right and jump
  @Action
  closeLeftTabs(route: RouteLocationNormalized) {
    const index = this.tabList.findIndex((item) => item.path === route.path)

    if (index > 0) {
      const leftTabs = this.tabList.slice(0, index)
      const pathList: string[] = []
      for (const item of leftTabs) {
        const affix = item?.meta?.affix ?? false
        if (!affix) {
          pathList.push(item.fullPath)
        }
      }
      this.bulkCloseTabs(pathList)
    }
    this.updateCacheTab()
    handleGotoPage()
  }

  // Close the tab on the left and jump
  @Action
  closeRightTabs(route: RouteLocationNormalized) {
    const index = this.tabList.findIndex((item) => item.fullPath === route.fullPath)

    if (index >= 0 && index < this.tabList.length - 1) {
      const rightTabs = this.tabList.slice(index + 1, this.tabList.length)

      const pathList: string[] = []
      for (const item of rightTabs) {
        const affix = item?.meta?.affix ?? false
        if (!affix) {
          pathList.push(item.fullPath)
        }
      }
      this.bulkCloseTabs(pathList)
    }
    this.updateCacheTab()
    handleGotoPage()
  }

  /**
   * Close other tabs
   */
  @Action
  closeOtherTabs(route: RouteLocationNormalized) {
    const closePathList = this.tabList.map((item) => item.fullPath)

    const pathList: string[] = []

    for (const path of closePathList) {
      if (path !== route.fullPath) {
        const closeItem = this.tabList.find((item) => item.path === path)
        if (!closeItem) {
          continue
        }
        const affix = closeItem?.meta?.affix ?? false
        if (!affix) {
          pathList.push(closeItem.fullPath)
        }
      }
    }
    this.bulkCloseTabs(pathList)
    this.updateCacheTab()
    handleGotoPage()
  }
}

export const tabsStore = getModule<Tabs>(Tabs)
