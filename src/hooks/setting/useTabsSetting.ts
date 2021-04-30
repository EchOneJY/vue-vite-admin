import { computed } from 'vue'
import { TabsSetting } from '/#/config'
import { appStore } from '/@/store/modules/app'

export function useTabsSetting() {
  const getShowTab = computed(() => appStore.getTabsSetting.show)

  const getShowQuick = computed(() => appStore.getTabsSetting.showQuick)

  const getShowRedo = computed(() => appStore.getTabsSetting.showRedo)

  const getShowFold = computed(() => appStore.getTabsSetting.showFold)

  function setTabSetting(tabsSetting: Partial<TabsSetting>) {
    appStore.commitProjectConfig({ tabsSetting })
  }

  return {
    setTabSetting,
    getShowTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
  }
}
