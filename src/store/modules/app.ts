import { VuexModule, getModule, Module, Mutation } from 'vuex-module-decorators'
import store from '/@/store'

import type { ProjectConfig } from '/@/types/config'
import PrjectSettings from '/@/settings/project'

import { deepMerge } from '/@/utils'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

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
}

export const appStore = getModule<App>(App)
