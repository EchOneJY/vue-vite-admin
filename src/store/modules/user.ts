import type {
  LoginParams,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
} from '/@/api/system/model/userModel'

import store from '/@/store/index'
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

import { PageEnum } from '/@/enums/pageEnum'
import { RoleEnum } from '/@/enums/roleEnum'

import { useMessage } from '/@/hooks/web/useMessage'

import router from '/@/router'

import { loginApi, getUserInfoById } from '/@/api/system/user'

import { ErrorMessageMode } from '/@/utils/axios/types'

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>

const NAME = 'user'
hotModuleUnregisterModule(NAME)

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  // user info
  private userInfoState: UserInfo | null = null

  // token
  private tokenState = ''

  // roleList
  private roleListState: RoleEnum[] = []

  get getUserInfoState(): UserInfo | null {
    return this.userInfoState
  }

  get getTokenState(): string {
    return this.tokenState
  }

  get getRoleListState(): RoleEnum[] {
    return this.roleListState
  }

  @Mutation
  commitResetState(): void {
    this.userInfoState = null
    this.tokenState = ''
    this.roleListState = []
  }

  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info
    // setCache(USER_INFO_KEY, info);
  }

  @Mutation
  commitRoleListState(roleList: RoleEnum[]): void {
    this.roleListState = roleList
    // setCache(ROLES_KEY, roleList);
  }

  @Mutation
  commitTokenState(info: string): void {
    this.tokenState = info
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
      this.commitTokenState(token)

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
    const { role } = userInfo
    const roleList = [role.value] as RoleEnum[]
    this.commitUserInfoState(userInfo)
    this.commitRoleListState(roleList)
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
    console.log(useMessage().createConfirm)
    const { createConfirm } = useMessage()
    // const { t } = useI18n();
    createConfirm({
      iconType: 'warning',
      title: '温馨提醒',
      // title: t('sys.app.loginOutTip'),
      content: '是否确认退出系统',
      // content: t('sys.app.loginOutMessage'),
      onOk: async () => {
        await this.loginOut(true)
      },
    })
  }
}
export const userStore = getModule<User>(User)
