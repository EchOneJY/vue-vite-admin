import type { AppRouteModule } from '/@/router/types'
import type { Router, RouteRecordNormalized } from 'vue-router'
import { LAYOUT, getParentLayout } from '/@/router/constant'

import { createRouter, createWebHashHistory } from 'vue-router'

import { cloneDeep } from 'lodash-es'
import { warn } from '/@/utils/log'

// export type LayoutMapKey = 'LAYOUT'

// const LayoutMap = new Map<LayoutMapKey, () => Promise<typeof import('*.vue')>>()

let dynamicViewsModules: Record<string, () => Promise<Recordable>>

// Dynamic introduction
function asyncImportRoute(routes: AppRouteModule[]) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}')
  routes.forEach((item) => {
    const { component, children } = item
    if (component) {
      item.component = dynamicImport(dynamicViewsModules, component as string)
      // item.component = () => import(`../../views${component}`)
    } else {
      item.component = getParentLayout()
    }
    children?.length && asyncImportRoute(children)
  })
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../../views', '')
    const lastIndex = k.lastIndexOf('.')
    k = k.substring(0, lastIndex)
    return k === component
  })

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return
  }
}

export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
  // LayoutMap.set('LAYOUT', LAYOUT)
  routeList.forEach((route) => {
    if (!route.children?.length) {
      route.children = [cloneDeep(route)]
      route.path = '/'
      const meta = route.meta || {}
      meta.single = true
      meta.affix = false
      route.meta = meta
    } else {
      route.path = `/${route.path}`
    }
    route.component = LAYOUT

    route.children.length && asyncImportRoute(route.children)
  })
  return (routeList as unknown) as T[]
}

/**
 * Convert multi-level routing to level 2 routing
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    console.log(routeModule)
    promoteRouteLevel(routeModule)
  }
  return modules
}

// Routing level upgrade
function promoteRouteLevel(routeModule: AppRouteModule) {
  // Use vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [(routeModule as unknown) as RouteRecordNormalized],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.filter((item) => !item.children?.length)
}

// Add all sub-routes to the secondary route
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteModule[],
  routeModule: AppRouteModule
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.meta.title === child.meta.title)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.meta.title === route.meta.title)) {
      routeModule.children?.push((route as unknown) as AppRouteModule)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }
  const children = routeModule.children

  let flag = false
  if (children.findIndex((item) => !!item.children?.length) > -1) {
    flag = true
  }

  return flag
}
