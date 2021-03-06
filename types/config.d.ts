import { CacheTypeEnum } from '/@/enums/cacheEnum'
import { ContentEnum, PermissionModeEnum, RouterTransitionEnum } from '/@/enums/appEnum'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  hidden: boolean
  collapsed: boolean
  menuWidth: number
  menuWidthCollapsed: number
  trigger: 'top'
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  //显示文档跳转
  showDoc: boolean
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

  permissionMode: PermissionModeEnum

  permissionCacheType: CacheTypeEnum

  headerSetting: HeaderSetting

  // 菜单类型
  menuSetting: MenuSetting

  // tab settings
  tabsSetting: TabsSetting

  // content width
  contentMode: ContentEnum

  fullContent: boolean

  // Whether to display the logo
  showLogo: boolean

  // Animation configuration
  transitionSetting: TransitionSetting

  // 是否可以使用keep-alive
  openKeepAlive: boolean

  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
}

export interface GlobConfig {
  // 网站标题
  title: string
  // 侧栏标题
  siderTitle: string
  // 项目路径
  apiUrl: string
  uploadUrl?: string
  urlPrefix?: string
  shortName: string
}

export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string
  // 侧边栏标题
  VITE_GLOB_SIDER_TITLE: string
  // 项目路径
  VITE_GLOB_API_URL: string
  VITE_GLOB_API_URL_PREFIX?: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_GLOB_UPLOAD_URL?: string
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}
