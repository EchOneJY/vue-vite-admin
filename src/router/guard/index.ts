import router from '/@/router'

import { createProgressGuard } from './progress'
import { createPermissionGuard } from './permission'
import { createPageLoadingGuard } from './pageLoading'
import { createResetGuard } from './reset'
import { createScrollGuard } from './scroll'
import { createPageGuard } from './page'

export function setupRouterGuard() {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createProgressGuard(router)
  createScrollGuard(router)
  createPermissionGuard(router)
  createResetGuard(router)
}
