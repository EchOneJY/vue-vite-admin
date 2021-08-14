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
      name: 'CompForm',
      component: getParentLayout('CompFormPage'),
      meta: {
        title: 'routes.demo.comp.form.title',
      },
      children: [
        {
          path: 'basic',
          name: 'CompBasicForm',
          component: () => import('/@/views/demo/comp/form/BasicForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.basic',
          },
          children: [],
        },
        {
          path: 'useForm',
          name: 'CompUseForm',
          component: () => import('/@/views/demo/comp/form/UseForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.useForm',
          },
          children: [],
        },
        {
          path: 'refForm',
          name: 'CompRefForm',
          component: () => import('/@/views/demo/comp/form/RefForm.vue'),
          meta: {
            title: 'routes.demo.comp.form.refForm',
          },
          children: [],
        },
        {
          path: 'ruleForm',
          name: 'CompRuleForm',
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
          name: 'CompBasicTable',
          component: () => import('/@/views/demo/comp/table/BasicTable.vue'),
          meta: {
            title: 'routes.demo.comp.table.basic',
          },
          children: [],
        },
        {
          path: 'fetch',
          name: 'CompFetchTable',
          component: () => import('/@/views/demo/comp/table/FetchTable.vue'),
          meta: {
            title: 'routes.demo.comp.table.fetch',
          },
          children: [],
        },
        {
          path: 'form',
          name: 'CompFormTable',
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
