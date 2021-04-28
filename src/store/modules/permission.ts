import type { Menu } from '/@/router/types'

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store/index'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'

import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'

import { getMenuListById } from '/@/api/menu'
import type { AppRouteModule } from '/@/router/types'

import { userStore } from './user'
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes'

const NAME = 'permisson'
hotModuleUnregisterModule(NAME)

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Permisson extends VuexModule {
  private hasDynamicAddedRoute = false

  private backMenuList: Menu[] = []

  get getHasDynamicAddedRoute() {
    return this.hasDynamicAddedRoute
  }

  get getBackMenuList() {
    return this.backMenuList
  }

  @Mutation
  setDynamicAddedRoute(added: boolean) {
    this.hasDynamicAddedRoute = added
  }

  @Mutation
  setBackMenuList(menus: Menu[]) {
    this.backMenuList = menus
  }

  @Mutation
  commitResetState(): void {
    this.hasDynamicAddedRoute = false
    this.backMenuList = []
  }

  @Action
  async buildRoutesAction(id?): Promise<AppRouteModule[]> {
    const { t } = useI18n()

    let routes: AppRouteModule[] = []

    const { createMessage } = useMessage()

    createMessage.loading({
      content: t('sys.app.menuLoading'),
      duration: 1,
    })

    const paramId = id || userStore.getUserInfo?.userId

    let routeList = (await getMenuListById({ id: paramId })) as AppRouteModule[]

    routeList = transformObjToRoute(routeList)

    const backMenuList = transformRouteToMenu(routeList)
    this.setBackMenuList(backMenuList)

    routeList = flatMultiLevelRoutes(routeList)

    routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]

    console.log(routes)

    return routes
  }
}
export const permissionStore = getModule<Permisson>(Permisson)
