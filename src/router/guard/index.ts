import router from '/@/router'

import { createProgressGuard } from './progress'
import { createPermissionGuard } from './permission'

export function setupRouterGuard() {
  createProgressGuard(router)
  createPermissionGuard(router)
}
