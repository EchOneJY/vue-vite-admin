import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes, LoginRoute, REDIRECT_ROUTE } from './routes'
const WHITE_NAME_LIST = [LoginRoute.path, REDIRECT_ROUTE.path]

const router = createRouter({
  history: createWebHistory(),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { path } = route
    if (path && !WHITE_NAME_LIST.includes(path as string)) {
      router.hasRoute(path) && router.removeRoute(path)
    }
  })
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
