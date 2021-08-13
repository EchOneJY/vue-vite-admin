import { defHttp } from '/@/utils/axios'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'
import { ErrorMessageMode } from '/@/utils/axios/types'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
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
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({
    url: Api.GetUserInfo,
  })
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout })
}
