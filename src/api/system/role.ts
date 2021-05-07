import { RolePageParams, RolePageListGetResultModel } from './model/roleModel'
import { defHttp } from '/@/utils/axios'

enum Api {
  RolePageList = '/system/getRoleListByPage',
}

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params })
