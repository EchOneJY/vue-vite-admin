import { AppRouteModule } from '/@/router/types'
export interface RouteItem extends AppRouteModule {
  id: string
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
