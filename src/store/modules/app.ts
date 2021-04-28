import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store'

import type { ProjectConfig } from '/#/config'
import PrjectSettings from '/@/settings/project'

import { deepMerge } from '/@/utils'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'
import { Persistent } from '/@/utils/cache/persistent'
import { resetRouter } from '/@/router'

const NAME = 'app'
hotModuleUnregisterModule(NAME)

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private projectConfigState: ProjectConfig = PrjectSettings

  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig)
  }

  @Mutation
  commitProjectConfigState(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg)
  }

  @Action
  async commitResetState() {
    resetRouter()
    Persistent.clearAll()
  }
}

export const appStore = getModule<App>(App)
