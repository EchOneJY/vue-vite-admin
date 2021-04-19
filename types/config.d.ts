export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  show: boolean
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

export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean

  headerSetting: HeaderSetting

  // 菜单类型
  menuSetting: MenuSetting
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
