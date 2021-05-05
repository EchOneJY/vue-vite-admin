import { defHttp } from '/@/utils/axios'
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoByUserIdParams,
  GetUserInfoByUserIdModel,
} from './model/userModel'
import { ErrorMessageMode } from '/@/utils/axios/types'

enum Api {
  Login = '/login',
  GetUserInfoById = '/getUserInfoById',
  GetPermCodeByUserId = '/getPermCodeByUserId',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  )
}

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
  return defHttp.get<GetUserInfoByUserIdModel>({
    url: Api.GetUserInfoById,
    params,
  })
}

export function getPermCodeByUserId(params: GetUserInfoByUserIdParams) {
  return defHttp.get<string[]>({
    url: Api.GetPermCodeByUserId,
    method: 'GET',
    params,
  })
}
