import { computed } from 'vue'

import { useAppStore } from '/@/store/modules/app'

import { ContentEnum } from '/@/enums/appEnum'

export function useRootSetting() {
  const appStore = useAppStore()
  const getLogoShow = computed(() => appStore.getProjectConfig.showLogo)

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED
  )

  const getShowBreadCrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon)

  return {
    getLogoShow,
    getPageLoading,
    getOpenKeepAlive,
    getLayoutContentMode,
    getShowBreadCrumbIcon,
  }
}
