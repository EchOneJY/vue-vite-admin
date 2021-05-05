import type { TransitionSetting } from '/#/config'

import { computed } from 'vue'

import { appStore } from '/@/store/modules/app'

export function useTransitionSetting() {
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable)

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })

  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition)

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.commitProjectConfig({ transitionSetting })
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  }
}
