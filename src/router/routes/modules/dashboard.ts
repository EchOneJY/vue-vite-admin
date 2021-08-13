import type { AppRouteModule } from '/@/router/types'

import { t } from '/@/hooks/web/useI18n'

// single
const dashboard: AppRouteModule = {
  path: 'dashboard/index',
  children: [],
  component: () => import('/@/views/dashboard/index.vue'),
  meta: {
    title: t('routes.dashboard.dashboard'),
    icon: 'dashboard',
    affix: true,
  },
}

export default dashboard
