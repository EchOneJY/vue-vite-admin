import type { ProjectConfig } from '/#/config'
import { CacheTypeEnum } from '/@/enums/cacheEnum'
import { ContentEnum, PermissionModeEnum, RouterTransitionEnum } from '/@/enums/appEnum'

const setting: ProjectConfig = {
  showSettingButton: false,

  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.SESSION,

  fullContent: false,

  // Whether to display the logo
  showLogo: true,

  // content mode
  contentMode: ContentEnum.FULL,

  // Header configuration
  headerSetting: {
    // header bg color
    bgColor: '#ffffff',
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the document button
  },

  // Menu configuration
  menuSetting: {
    // sidebar menu bg color
    bgColor: '#001529',
    //  Whether to fix the left menu
    fixed: true,
    // Whether to show no dom
    show: true,
    hidden: false,
    // Menu collapse
    collapsed: false,
    // Menu width
    menuWidth: 210,
    // Fold trigger position
    trigger: 'top',
  },

  // Multi-label
  tabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
  },

  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoadinng
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false,
  },

  openKeepAlive: true,
}

export default setting
