import { RouteMeta } from '/@/router/types'
export interface RouteItem {
  id: string
  url: string
  meta: RouteMeta
  redirect?: string
  children?: RouteItem[]
}

/**
 * @description: Get menu interface
 */
export interface getMenuListByIdParams {
  id: number | string
}

/**
 * @description: Get menu return value
 */
export type getMenuListByIdParamsResultModel = RouteItem[]
