import { unref, computed } from 'vue'

import { appStore } from '/@/store/modules/app'
import { MenuSetting } from '/@/types/config'

const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting)

const getCollapsed = computed(() => unref(getMenuSetting).collapsed)

export function useMenuSetting() {
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.commitProjectConfigState({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getCollapsed,
  }
}
