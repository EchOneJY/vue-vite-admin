import type { RouteRecordRaw } from 'vue-router'

import { defineComponent } from 'vue'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteMeta {
  // 路由title  一般必填
  title: string

  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean

  // 是否为单个菜单
  single?: boolean

  // 是否固定标签
  affix?: boolean

  // 图标，也是菜单图标
  icon?: string

  // 内嵌iframe的地址
  frameSrc?: string

  // 指定该路由切换的动画名
  transitionName?: string

  // 如果该路由会携带参数，且需要在tab页上面显示。则需要设置为true
  carryParam?: boolean

  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  currentActiveMenu?: string

  // 当前路由不在标签页显示
  hideTab?: boolean

  // 当前路由不在菜单显示
  hideMenu?: boolean
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  name: string

  icon?: string

  path: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  meta: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

export type AppRouteModule = AppRouteRecordRaw
