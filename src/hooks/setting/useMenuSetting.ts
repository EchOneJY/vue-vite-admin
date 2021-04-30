import { unref, computed } from 'vue'

import { appStore } from '/@/store/modules/app'
import { MenuSetting } from '/#/config'

export function useMenuSetting() {
  const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting)

  const getCollapsed = computed(() => unref(getMenuSetting).collapsed)

  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.commitProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,
    getShowMenu,
    getCollapsed,
  }
}
