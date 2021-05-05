import { computed } from 'vue'

import { appStore } from '/@/store/modules/app'

import { ContentEnum } from '/@/enums/appEnum'

export function useRootSetting() {
  const getLogoShow = computed(() => appStore.getProjectConfig.showLogo)

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED
  )

  return {
    getLogoShow,
    getPageLoading,
    getOpenKeepAlive,
    getLayoutContentMode,
  }
}
