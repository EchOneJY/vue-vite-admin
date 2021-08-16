import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
const IFrame = () => import('/@/views/core/iframe/blank.vue')
import { t } from '/@/hooks/web/useI18n'

const iframe: AppRouteModule = {
  path: '/iframe',
  name: 'IFrame',
  component: LAYOUT,
  redirect: '/iframe/vue3',
  meta: {
    icon: 'ion:tv-outline',
    title: 'routes.demo.iframe.title',
    orderNo: 1000,
  },
  children: [
    {
      path: 'vue3',
      name: 'Vue3',
      component: IFrame,
      meta: {
        frameSrc: 'https://vue3js.cn/docs/zh/',
        title: t('routes.demo.iframe.vue3'),
      },
    },
    {
      path: 'ant-dv',
      name: 'AntdV',
      component: IFrame,
      meta: {
        frameSrc: 'https://2x.antdv.com/docs/vue/introduce-cn/',
        title: t('routes.demo.iframe.ant-dv'),
      },
    },
  ],
}

export default iframe
