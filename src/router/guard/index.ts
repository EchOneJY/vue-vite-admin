import router from '/@/router'

import { createProgressGuard } from './progress'
import { createPermissionGuard } from './permission'
import { createResetGuard } from './reset'
import { createPageGuard } from './page'
import { createPageLoadingGuard } from './pageLoading'

export function setupRouterGuard() {
  createProgressGuard(router)
  createPermissionGuard(router)
  createResetGuard(router)
  createPageGuard(router)
  createPageLoadingGuard(router)
}
