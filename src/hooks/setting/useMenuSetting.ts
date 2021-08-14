import { unref, computed } from 'vue'

import { useAppStore } from '/@/store/modules/app'
import { MenuSetting } from '/#/config'

export function useMenuSetting() {
  const appStore = useAppStore()
  const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting)

  const getCollapsed = computed(() => unref(getMenuSetting).collapsed)

  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  const getMenuWidth = computed(() => {
    return unref(getCollapsed)
      ? appStore.getMenuSetting.menuWidthCollapsed
      : appStore.getMenuSetting.menuWidth
  })

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
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
    getMenuWidth,
  }
}
