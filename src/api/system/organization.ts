import {
  OrganizationPageParams,
  OrganizationPageListModel,
  OrganizationTreeListModel,
} from './model/organizationModel'
import { defHttp } from '/@/utils/axios'

enum Api {
  OrganizationPageList = '/system/getOrganizationListByPage',
  OrganizationTreeList = '/system/organizationTreeList',
}

export const getOrganizationPageList = (params?: OrganizationPageParams) =>
  defHttp.get<OrganizationPageListModel>({ url: Api.OrganizationPageList, params })

export const getOrganizationTreeList = (params?: OrganizationPageParams) =>
  defHttp.get<OrganizationTreeListModel>({ url: Api.OrganizationTreeList, params })
