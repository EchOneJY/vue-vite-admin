import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel'

export type OrganizationParams = {
  createTimeBegin?: number
  createTimeEnd?: number
  orgName?: string
  status?: string
}

export type OrganizationPageParams = BasicPageParams & OrganizationParams

export interface OrganizationListItem {
  id: string
  status: number
  orgCode: string
  orgName: string
  parentOrgName: string
  type: string
  createAccountName: string
}

export interface OrganizationTreeListItem {
  id: string
  orgCode: string
  orgName: string
  checked: number
  parentId: number
  orgId: number
  children: []
}

export type OrganizationPageListModel = BasicFetchResult<OrganizationListItem>
export type OrganizationTreeListModel = BasicFetchResult<OrganizationTreeListItem>
