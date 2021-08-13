import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

// single
const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'index',
      component: () => import('/@/views/dashboard/index.vue'),
      meta: {
        title: t('routes.dashboard.dashboard'),
        affix: true,
        single: true,
      },
    },
  ],
}

export default dashboard
