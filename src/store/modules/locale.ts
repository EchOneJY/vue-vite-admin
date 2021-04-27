import type { LocaleSetting, LocaleType } from '/#/config'

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '/@/store'

import { localeSetting } from '/@/settings/locale'

import { hotModuleUnregisterModule } from '/@/utils/helper/vuex'

const NAME = 'locale'
hotModuleUnregisterModule(NAME)

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Locale extends VuexModule {
  private locale: LocaleSetting = localeSetting

  get getShowPicker() {
    return !!this.locale?.showPicker
  }

  get getLocale(): LocaleType {
    return this.locale?.locale ?? 'zh_CN'
  }

  @Mutation
  setLocale(locale: Partial<LocaleSetting>): void {
    this.locale = { ...this.locale, ...locale }
  }

  @Action
  initLocale() {
    this.setLocale({
      ...localeSetting,
    })
  }
}

export const localeStore = getModule<Locale>(Locale)
