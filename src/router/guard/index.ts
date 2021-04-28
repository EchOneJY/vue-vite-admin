import router from '/@/router'

import { createProgressGuard } from './progress'
import { createPermissionGuard } from './permission'
import { createResetGuard } from './reset'

export function setupRouterGuard() {
  createProgressGuard(router)
  createPermissionGuard(router)
  createResetGuard(router)
}
