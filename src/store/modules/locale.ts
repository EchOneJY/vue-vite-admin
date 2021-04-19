import type { LocaleSetting, LocaleType } from '/#/config'

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store'

import { localeSetting } from '/@/settings/locale'

import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

const NAME = 'locale'
hotModuleUnregisterModule(NAME)

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private localeState: LocaleSetting = localeSetting

  get getShowPicker() {
    return !!this.localeState?.showPicker
  }

  get getLocale(): LocaleType {
    return this.localeState?.locale ?? 'zh_CN'
  }

  @Mutation
  setLocaleState(locale: Partial<LocaleSetting>): void {
    this.localeState = { ...this.localeState, ...locale }
  }

  @Action
  initLocale() {
    this.setLocaleState({
      ...localeSetting,
    })
  }
}

export const localeStore = getModule<App>(App)
