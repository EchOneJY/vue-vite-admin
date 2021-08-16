import type { Router } from 'vue-router'
import { useAppStore } from '/@/store/modules/app'
import { useUserStore } from '/@/store/modules/user'
import { useTabsStore } from '/@/store/modules/tabs'
import { usePermissionStore } from '/@/store/modules/permission'
import { PageEnum } from '/@/enums/pageEnum'
import { removeTabChangeListener } from '/@/logics/mitt/routeChange'

export function createResetGuard(router: Router) {
  router.afterEach((to) => {
    const tabStore = useTabsStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      appStore.resetAllState()
      permissionStore.resetState()
      userStore.resetState()
      tabStore.resetState()
      removeTabChangeListener()
    }
  })
}
