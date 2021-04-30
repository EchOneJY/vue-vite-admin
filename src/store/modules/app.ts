import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store'

import type { ProjectConfig } from '/#/config'
import PrjectSettings from '/@/settings/project'

import { deepMerge } from '/@/utils'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'
import { Persistent } from '/@/utils/cache/persistent'
import { resetRouter } from '/@/router'
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'

const NAME = 'app'
hotModuleUnregisterModule(NAME)

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private projectConfig: ProjectConfig = PrjectSettings

  get getProjectConfig(): ProjectConfig {
    return this.projectConfig || ({} as ProjectConfig)
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

  @Mutation
  commitProjectConfig(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfig = deepMerge(this.projectConfig || {}, proCfg)
    Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
  }

  @Action
  async commitResetState() {
    resetRouter()
    Persistent.clearAll()
  }
}

export const appStore = getModule<App>(App)
