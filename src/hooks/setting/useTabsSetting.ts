import { computed } from 'vue'
import { TabsSetting } from '/#/config'
import { useAppStore } from '/@/store/modules/app'

export function useTabsSetting() {
  const appStore = useAppStore()

  const getShowTab = computed(() => appStore.getTabsSetting.show)

  const getShowQuick = computed(() => appStore.getTabsSetting.showQuick)

  const getShowRedo = computed(() => appStore.getTabsSetting.showRedo)

  const getShowFold = computed(() => appStore.getTabsSetting.showFold)

  function setTabSetting(tabsSetting: Partial<TabsSetting>) {
    appStore.setProjectConfig({ tabsSetting })
  }

  return {
    setTabSetting,
    getShowTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
  }
}
