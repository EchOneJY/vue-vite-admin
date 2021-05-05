import { ProjectConfig } from '/#/config'

import { appStore } from '/@/store/modules/app'
import { localeStore } from '/@/store/modules/locale'

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/project'

import { Persistent } from '/@/utils/cache/persistent'
import { deepMerge } from '/@/utils'

export function useInit() {
  // init locale
  localeStore.initLocale()

  // init project configure
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  appStore.commitProjectConfig(projCfg)
}
