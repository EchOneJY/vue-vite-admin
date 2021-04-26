import type { Menu } from '/@/router/types'

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store/index'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'

import { getMenuListById } from '/@/api/menu'
import { getMenuListByIdParamsResultModel } from '/@/api/model/menuModel'

import { userStore } from './user'

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

  @Action
  async buildRoutesAction(id?): Promise<getMenuListByIdParamsResultModel> {
    const { t } = useI18n()

    // const routes: AppRouteRecordRaw[] = []

    const { createMessage } = useMessage()

    createMessage.loading({
      content: t('sys.app.menuLoading'),
      duration: 1,
    })

    const paramId = id || userStore.getUserInfo?.userId

    const routeList = (await getMenuListById({ id: paramId })) as getMenuListByIdParamsResultModel

    console.log(routeList)

    // routeList = transformObjToRoute(routeList)

    // const backMenuList = transformRouteToMenu(routeList)
    // this.setBackMenuList(backMenuList)

    // routeList = flatMultiLevelRoutes(routeList)

    return routeList
  }
}
export const permissionStore = getModule<Permisson>(Permisson)
