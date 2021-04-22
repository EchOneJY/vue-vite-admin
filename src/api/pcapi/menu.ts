import { defHttp } from '/@/utils/axios'

enum Api {
  getUserMenu = '/pcapi/system/menu/getCurrentTreeMenu',
}

/**
 * @description: getUserMenu
 */
export function getUserMenu() {
  return defHttp.request({
    url: Api.getUserMenu,
    method: 'POST',
  })
}
