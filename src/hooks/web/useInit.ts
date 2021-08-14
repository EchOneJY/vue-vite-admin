import { ProjectConfig } from '/#/config'

import { useAppStore } from '/@/store/modules/app'
import { useLocaleStore } from '/@/store/modules/locale'

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/project'

import { Persistent } from '/@/utils/cache/persistent'
import { deepMerge } from '/@/utils'

export function useInit() {
  const appStore = useAppStore()
  const localeStore = useLocaleStore()

  // init locale
  localeStore.initLocale()

  // init project configure
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  console.log(projCfg)
  appStore.setProjectConfig(projCfg)
}
