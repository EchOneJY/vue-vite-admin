import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

import { resetRouter } from '/@/router'
import store from '/@/store'

import type { ProjectConfig } from '/#/config'

import { deepMerge } from '/@/utils'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'
import { Persistent } from '/@/utils/cache/persistent'

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'

const NAME = 'app'
hotModuleUnregisterModule(NAME)

let timeId: TimeoutHandle

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private projectConfig: ProjectConfig | null = Persistent.getLocal(PROJ_CFG_KEY)

  private pageLoading: Boolean = false

  get getProjectConfig(): ProjectConfig {
    return this.projectConfig || ({} as ProjectConfig)
  }

  get getPageLoading() {
    return this.pageLoading
  }

  get getTabsSetting() {
    return this.getProjectConfig.tabsSetting
  }

  get getMenuSetting() {
    return this.getProjectConfig.menuSetting
  }

  get getHeaderSetting() {
    return this.getProjectConfig.headerSetting
  }

  get getTransitionSetting() {
    return this.getProjectConfig.transitionSetting
  }

  @Mutation
  commitProjectConfig(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfig = deepMerge(this.projectConfig || {}, proCfg)
    Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
  }

  @Mutation
  setPageLoading(loading: boolean): void {
    this.pageLoading = loading
  }

  @Action
  async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId)
      // Prevent flicker
      timeId = setTimeout(() => {
        this.setPageLoading(loading)
      }, 50)
    } else {
      this.setPageLoading(loading)
      clearTimeout(timeId)
    }
  }

  @Action
  async resetAllState() {
    resetRouter()
    Persistent.clearAll()
  }
}

export const appStore = getModule<App>(App)
