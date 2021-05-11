import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_util'
import { ExceptionEnum } from '/@/enums/exceptionEnum'

// single
const dashboardRoute = {
  path: 'dashboard/index',
  children: [],
  component: '/dashboard/index',
  meta: {
    title: 'routes.dashboard.dashboard',
    icon: 'dashboard',
    affix: true,
  },
}

const levelRoute = {
  path: 'level',
  component: '',
  meta: {
    icon: 'level',
    title: 'routes.level.level',
  },
  children: [
    {
      path: 'menu1',
      component: '',
      meta: {
        title: 'routes.level.menu1',
      },
      children: [
        {
          path: 'menu1-1',
          component: '',
          meta: {
            title: 'routes.level.menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              component: '/level/Menu111',
              meta: {
                title: 'routes.level.menu1-1-1',
              },
              children: [],
            },
          ],
        },
        {
          path: 'menu1-2',
          component: '/level/Menu12',
          meta: {
            title: 'routes.level.menu1-2',
          },
          children: [],
        },
      ],
    },
    {
      path: 'menu2',
      component: '/level/Menu2',
      meta: {
        title: 'routes.level.menu2',
      },
      children: [],
    },
  ],
}

const exceptionRoute = {
  path: 'exception',
  component: '',
  meta: {
    icon: 'exception',
    title: 'routes.exception.exception',
  },
  children: [
    {
      path: '403',
      component: '/core/exception/index',
      props: {
        status: ExceptionEnum.PAGE_NOT_ACCESS,
      },
      meta: {
        title: '403',
      },
      children: [],
    },
    {
      path: '404',
      component: '/core/exception/index',
      props: {
        status: ExceptionEnum.PAGE_NOT_FOUND,
      },
      meta: {
        title: '404',
      },
      children: [],
    },
    {
      path: '500',
      component: '/core/exception/index',
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        title: '500',
      },
      children: [],
    },
    {
      path: 'net-work-error',
      component: '/core/exception/index',
      props: {
        status: ExceptionEnum.NET_WORK_ERROR,
      },
      meta: {
        title: 'routes.exception.net-work-error',
      },
      children: [],
    },
    {
      path: 'not-data',
      component: '/core/exception/index',
      props: {
        status: ExceptionEnum.PAGE_NOT_DATA,
      },
      meta: {
        title: 'routes.exception.not-data',
      },
      children: [],
    },
  ],
}

const componentsRoute = {
  path: 'component',
  component: '',
  meta: {
    icon: 'component',
    title: 'routes.component.title',
  },
  children: [
    // {
    //   path: 'icon',
    //   component: '/component/icon/index',
    //   meta: {
    //     title: 'routes.component.icon.title',
    //   },
    //   children: [],
    // },
    {
      path: 'form',
      component: '',
      meta: {
        title: 'routes.component.form.title',
      },
      children: [
        {
          path: 'basic',
          component: '/component/form/BasicForm',
          meta: {
            title: 'routes.component.form.basic',
          },
          children: [],
        },
        {
          path: 'useForm',
          component: '/component/form/UseForm',
          meta: {
            title: 'routes.component.form.useForm',
          },
          children: [],
        },
        {
          path: 'refForm',
          component: '/component/form/RefForm',
          meta: {
            title: 'routes.component.form.refForm',
          },
          children: [],
        },
        {
          path: 'ruleForm',
          component: '/component/form/RuleForm',
          meta: {
            title: 'routes.component.form.ruleForm',
          },
          children: [],
        },
      ],
    },
    {
      path: 'table',
      component: '',
      meta: {
        title: 'routes.component.table.title',
      },
      children: [
        {
          path: 'basic',
          component: '/component/table/BasicTable',
          meta: {
            title: 'routes.component.table.basic',
          },
          children: [],
        },
        {
          path: 'fetch',
          component: '/component/table/FetchTable',
          meta: {
            title: 'routes.component.table.fetch',
          },
          children: [],
        },
        {
          path: 'form',
          component: '/component/table/FormTable',
          meta: {
            title: 'routes.component.table.form',
          },
          children: [],
        },
      ],
    },
  ],
}

const iframeRoute = {
  path: 'iframe',
  component: '',
  meta: {
    icon: 'iframe',
    title: 'routes.iframe.title',
  },
  children: [
    {
      path: 'vue3',
      component: '/core/iframe/blank',
      meta: {
        frameSrc: 'https://vue3js.cn/docs/zh/',
        title: 'routes.iframe.vue3',
      },
      children: [],
    },
    {
      path: 'ant-dv',
      component: '/core/iframe/blank',
      meta: {
        frameSrc: 'https://2x.antdv.com/docs/vue/introduce-cn/',
        title: 'routes.iframe.ant-dv',
      },
      children: [],
    },
  ],
}

const systemRoute = {
  path: 'system',
  component: '',
  meta: {
    icon: 'system',
    title: 'system.title',
  },
  children: [
    {
      path: 'organization',
      component: '/system/organization/index',
      meta: {
        title: 'system.organization.title',
      },
      children: [],
    },
    {
      path: 'role',
      component: '/system/role/index',
      meta: {
        title: 'system.role.title',
      },
      children: [],
    },
    {
      path: 'setting',
      component: '/system/setting/index',
      meta: {
        title: 'system.setting.title',
      },
      children: [],
    },
    {
      path: 'user',
      component: '/system/user/index',
      meta: {
        title: 'system.user.title',
      },
      children: [],
    },
  ],
}

export default [
  {
    url: '/basic-api/getMenuListById',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess([
        dashboardRoute,
        componentsRoute,
        levelRoute,
        exceptionRoute,
        iframeRoute,
        systemRoute,
      ])
    },
  },
] as MockMethod[]