import type { AppRouteModule } from '/@/router/types'

import { getParentLayout, LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.demo.comp.title'),
  },
  children: [
    // =============================form start=============================
    {
      path: 'form',
      component: getParentLayout('CompFormPage'),
      meta: {
        title: 'routes.demo.comp.form.title',
      },
      children: [
        {
          path: 'basic',
          component: () => import('/@/views/demo/comp/form/BasicForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.basic',
          },
          children: [],
        },
        {
          path: 'useForm',
          component: () => import('/@/views/demo/comp/form/UseForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.useForm',
          },
          children: [],
        },
        {
          path: 'refForm',
          component: () => import('/@/views/demo/comp/form/RefForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.refForm',
          },
          children: [],
        },
        {
          path: 'ruleForm',
          component: () => import('/@/views/demo/comp/form/RuleForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.ruleForm',
          },
          children: [],
        },
      ],
    },
    // =============================form end=============================
    // =============================table start=============================
    {
      path: 'table',
      component: getParentLayout('CompTablePage'),
      meta: {
        title: 'routes.demo.comp.table.title',
      },
      children: [
        {
          path: 'basic',
          component: () => import('/@/views/demo/comp/table/BasicTable.vue'),
          meta: {
            title: 'routes.demo.comp.table.basic',
          },
          children: [],
        },
        {
          path: 'fetch',
          component: () => import('/@/views/demo/comp/table/FetchTable.vue'),
          meta: {
            title: 'routes.demo.comp.table.fetch',
          },
          children: [],
        },
        {
          path: 'form',
          component: () => import('/@/views/demo/comp/table/FormTable.vue'),
          meta: {
            title: 'routes.demo.comp.table.form',
          },
          children: [],
        },
      ],
    },
    // =============================table end=============================
  ],
}

export default comp
