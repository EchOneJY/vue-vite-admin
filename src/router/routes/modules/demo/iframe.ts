import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const iframe: AppRouteModule = {
  path: '/iframe',
  component: LAYOUT,
  meta: {
    icon: 'iframe',
    title: 'routes.iframe.title',
  },
  children: [
    {
      path: 'vue3',
      component: () => import('/@/views/core/iframe/blank.vue'),
      meta: {
        frameSrc: 'https://vue3js.cn/docs/zh/',
        title: t('routes.demo.iframe.vue3'),
      },
      children: [],
    },
    {
      path: 'ant-dv',
      component: () => import('/@/views/core/iframe/blank.vue'),
      meta: {
        frameSrc: 'https://2x.antdv.com/docs/vue/introduce-cn/',
        title: t('routes.demo.iframe.ant-dv'),
      },
      children: [],
    },
  ],
}

export default iframe
