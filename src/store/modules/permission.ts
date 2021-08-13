import type { Menu, AppRouteRecordRaw } from '/@/router/types'

import { defineStore } from 'pinia'
import { store } from '/@/store'

import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'

import { toRaw } from 'vue'

import { useUserStore } from './user'
import { useAppStoreWithOut } from './app'

import projectSetting from '/@/settings/project'

import { PermissionModeEnum } from '/@/enums/appEnum'
import { PageEnum } from '/@/enums/pageEnum'

import { filter } from '/@/utils/helper/tree'

import { asyncRoutes } from '/@/router/routes'
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'
import { PAGE_NOT_FOUND_ROUTE, ERROR_LOG_ROUTE } from '/@/router/routes'

import { getMenuList } from '/@/api/system/menu'

interface PermissionState {
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean
  // To trigger a menu update
  lastBuildMenuTime: number
  // Backstage menu list
  backMenuList: Menu[]
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n()
      const userStore = useUserStore()
      const appStore = useAppStoreWithOut()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }

      const routeRmoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      switch (permissionMode) {
        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          const menuList = transformRouteToMenu(routes, true)
          routes = filter(routes, routeRmoveIgnoreFilter)
          routes = routes.filter(routeRmoveIgnoreFilter)
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          this.setFrontMenuList(menuList)
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes)
          break

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage()

          createMessage.loading({
            content: t('sys.app.menuLoading'),
            duration: 1,
          })

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = []
          try {
            routeList = (await getMenuList()) as AppRouteRecordRaw[]
          } catch (error) {
            console.error(error)
          }

          // Dynamically introduce components
          routeList = transformObjToRoute(routeList)

          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList)

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRmoveIgnoreFilter)
          routeList = routeList.filter(routeRmoveIgnoreFilter)

          routeList = flatMultiLevelRoutes(routeList)
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
          break
      }

      routes.push(ERROR_LOG_ROUTE)
      patchHomeAffix(routes)
      return routes
    },
  },
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}

// class Permisson extends VuexModule {
//   private hasDynamicAddedRoute = false

//   private backMenuList: Menu[] = []

//   get getHasDynamicAddedRoute() {
//     return this.hasDynamicAddedRoute
//   }

//   get getBackMenuList() {
//     return this.backMenuList
//   }

//   @Mutation
//   setDynamicAddedRoute(added: boolean) {
//     this.hasDynamicAddedRoute = added
//   }

//   @Mutation
//   setBackMenuList(menus: Menu[]) {
//     this.backMenuList = menus
//   }

//   @Mutation
//   resetAllState(): void {
//     this.hasDynamicAddedRoute = false
//     this.backMenuList = []
//   }

//   @Action
//   async buildRoutesAction(id?): Promise<AppRouteModule[]> {
//     const { t } = useI18n()

//     let routes: AppRouteModule[] = []

//     const { createMessage } = useMessage()

//     createMessage.loading({
//       content: t('sys.app.menuLoading'),
//       duration: 1,
//     })

//     const paramId = id || userStore.getUserInfo?.userId

//     let routeList = (await getMenuListById({ id: paramId })) as AppRouteModule[]

//     routeList = transformObjToRoute(routeList)

//     const backMenuList = transformRouteToMenu(routeList)
//     this.setBackMenuList(backMenuList)

//     routeList = flatMultiLevelRoutes(routeList)

//     routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]

//     return routes
//   }
// }
// export const permissionStore = getModule<Permisson>(Permisson)
