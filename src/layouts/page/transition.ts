import type { FunctionalComponent } from 'vue'
import type { RouteLocation } from 'vue-router'

import { RouterTransitionEnum } from '/@/enums/appEnum'

export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable }
  route: RouteLocation
}

export function getTransitionName({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def,
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean
  openCache: boolean
  def: string
  cacheTabs: string[]
}) {
  if (!enableTransition) {
    return null
  }
  // 缓存页面fade-slide动画
  const isInCache = cacheTabs.includes(route.path as string)
  const transitionName = RouterTransitionEnum.FADE_SIDE
  let name: string | null = transitionName
  if (openCache && isInCache && route.meta.loaded) {
    name = isInCache && route.meta.loaded ? transitionName : null
  }
  return name || route.meta.transitionName || def
}
