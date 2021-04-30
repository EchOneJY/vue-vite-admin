import { CacheTypeEnum } from '/@/enums/cacheEnum'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  hidden: boolean
  collapsed: boolean
  menuWidth: number
  trigger: 'top'
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
  show: boolean

  // 显示全屏按钮
  showFullScreen: boolean
}

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface TabsSetting {
  cache: boolean
  show: boolean
  showQuick: boolean
  showRedo: boolean
  showFold: boolean
}

export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean

  permissionCacheType: CacheTypeEnum

  headerSetting: HeaderSetting

  // 菜单类型
  menuSetting: MenuSetting

  // tab settings
  tabsSetting: TabsSetting
}

export interface GlobConfig {
  // 网站标题
  title: string
  // 项目路径
  apiUrl: string
  uploadUrl?: string
  urlPrefix?: string
  shortName: string
}

export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string
  // 项目路径
  VITE_GLOB_API_URL: string
  VITE_GLOB_API_URL_PREFIX?: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_GLOB_UPLOAD_URL?: string
}
