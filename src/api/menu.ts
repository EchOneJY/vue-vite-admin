import { defHttp } from '/@/utils/axios'
import { getMenuListByIdParams, getMenuListByIdParamsResultModel } from './model/menuModel'

enum Api {
  GetMenuListById = '/getMenuListById',
}

/**
 * @description: 获取Menu
 * @param {*}
 * @return {*}
 */
export function getMenuListById(params: getMenuListByIdParams) {
  return defHttp.request<getMenuListByIdParamsResultModel>({
    url: Api.GetMenuListById,
    method: 'GET',
    params,
  })
}
