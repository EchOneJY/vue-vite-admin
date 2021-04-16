import { useMessage } from '/@/hooks/web/useMessage';
import { userStore } from '/@/store/modules/user';
// import { useI18n } from '/@/hooks/web/useI18n';
const { createMessage } = useMessage();

const error = createMessage.error!;
export function checkStatus(status: number, msg: string): void {
  // const { t } = useI18n();
  switch (status) {
    case 400:
      error(`${msg}`);
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      error('用户没有权限（令牌、用户名、密码错误）!');
      // error(t('sys.api.errMsg401'));
      userStore.loginOut(true);
      break;
    case 403:
      error('用户得到授权，但是访问是被禁止的。!');
      // error(t('sys.api.errMsg403'));
      break;
    // 404请求不存在
    case 404:
      error('网络请求错误,未找到该资源!');
      // error(t('sys.api.errMsg404'));
      break;
    case 405:
      error('网络请求错误,请求方法未允许!');
      // error(t('sys.api.errMsg405'));
      break;
    case 408:
      error('网络请求超时!');
      // error(t('sys.api.errMsg408'));
      break;
    case 500:
      error('服务器错误,请联系管理员!');
      // error(t('sys.api.errMsg500'));
      break;
    case 501:
      error('网络未实现!');
      // error(t('sys.api.errMsg501'));
      break;
    case 502:
      error('网络错误!');
      // error(t('sys.api.errMsg502'));
      break;
    case 503:
      error('服务不可用，服务器暂时过载或维护!');
      // error(t('sys.api.errMsg503'));
      break;
    case 504:
      error('网络超时!');
      // error(t('sys.api.errMsg504'));
      break;
    case 505:
      error('http版本不支持该请求!');
      // error(t('sys.api.errMsg505'));
      break;
    default:
  }
}
