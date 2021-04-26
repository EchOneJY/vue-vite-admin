import type {
  LoginParams,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
} from '/@/api/model/userModel'

import store from '/@/store/index'
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

import { PageEnum } from '/@/enums/pageEnum'

import { useMessage } from '/@/hooks/web/useMessage'
import { useI18n } from '/@/hooks/web/useI18n'

import router from '/@/router'

import { loginApi, getUserInfoById } from '/@/api/user'

import { ErrorMessageMode } from '/@/utils/axios/types'

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>

const NAME = 'user'
hotModuleUnregisterModule(NAME)

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  // user info
  private userInfo: Nullable<UserInfo> = null

  // token
  private token = ''

  get getUserInfo(): Nullable<UserInfo> {
    return this.userInfo
  }

  get getToken(): string {
    return this.token
  }

  @Mutation
  commitReset(): void {
    this.userInfo = null
    this.token = ''
  }

  @Mutation
  commitUserInfo(info: UserInfo): void {
    this.userInfo = info
    // setCache(USER_INFO_KEY, info);
  }

  @Mutation
  commitToken(info: string): void {
    this.token = info
    // setCache(TOKEN_KEY, info);
  }

  /**
   * @description: login
   */
  @Action
  async login(
    params: LoginParams & {
      goHome?: boolean
      mode?: ErrorMessageMode
    }
  ): Promise<GetUserInfoByUserIdModel | null> {
    try {
      const { goHome = true, mode, ...loginParams } = params
      const data = await loginApi(loginParams, mode)

      const { token, userId } = data

      // save token
      this.commitToken(token)

      // get user info
      const userInfo = await this.getUserInfoAction({ userId })

      // const name = FULL_PAGE_NOT_FOUND_ROUTE.name;
      // name && router.removeRoute(name);
      goHome && (await router.replace(PageEnum.BASE_HOME))
      return userInfo
    } catch (error) {
      return null
    }
  }

  @Action
  async getUserInfoAction({ userId }: GetUserInfoByUserIdParams) {
    const userInfo = await getUserInfoById({ userId })
    this.commitUserInfo(userInfo)
    return userInfo
  }

  /**
   * @description: login out
   */
  @Action
  async loginOut(goLogin = false) {
    goLogin && router.push(PageEnum.BASE_LOGIN)
  }

  /**
   * @description: Confirm before logging out
   */
  @Action
  async confirmLoginOut() {
    const { createConfirm } = useMessage()
    const { t } = useI18n()
    createConfirm({
      iconType: 'warning',
      title: t('sys.app.loginOutTip'),
      content: t('sys.app.loginOutMessage'),
      onOk: async () => {
        await this.loginOut(true)
      },
    })
  }
}
export const userStore = getModule<User>(User)
