import { unref, computed } from 'vue'

import { appStore } from '/@/store/modules/app'
import { MenuSetting } from '/#/config'
import projectSetting from '/@/settings/project'

export function useMenuSetting() {
  const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting)

  const getCollapsed = computed(() => unref(getMenuSetting).collapsed)

  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.commitProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
      menuWidth: unref(getCollapsed) ? projectSetting.menuSetting.menuWidth : 80,
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,
    getShowMenu,
    getCollapsed,
    getMenuWidth,
  }
}
