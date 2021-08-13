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
    title: 'routes.demo.level.level',
  },
  children: [
    {
      path: 'menu1',
      component: '',
      meta: {
        title: 'routes.demo.level.menu1',
      },
      children: [
        {
          path: 'menu1-1',
          component: '',
          meta: {
            title: 'routes.demo.level.menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              component: '/demo/level/Menu111',
              meta: {
                title: 'routes.demo.level.menu1-1-1',
              },
              children: [],
            },
          ],
        },
        {
          path: 'menu1-2',
          component: '/demo/level/Menu12',
          meta: {
            title: 'routes.demo.level.menu1-2',
          },
          children: [],
        },
      ],
    },
    {
      path: 'menu2',
      component: '/demo/level/Menu2',
      meta: {
        title: 'routes.demo.level.menu2',
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
  path: 'comp',
  component: '',
  meta: {
    icon: 'comp',
    title: 'routes.demo.comp.title',
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
        title: 'routes.demo.comp.form.title',
      },
      children: [
        {
          path: 'basic',
          component: '/demo/comp/form/BasicForm',
          meta: {
            title: 'routes.demo.comp.form.basic',
          },
          children: [],
        },
        {
          path: 'useForm',
          component: '/demo/comp/form/UseForm',
          meta: {
            title: 'routes.demo.comp.form.useForm',
          },
          children: [],
        },
        {
          path: 'refForm',
          component: '/demo/comp/form/RefForm',
          meta: {
            title: 'routes.demo.comp.form.refForm',
          },
          children: [],
        },
        {
          path: 'ruleForm',
          component: '/demo/comp/form/RuleForm',
          meta: {
            title: 'routes.demo.comp.form.ruleForm',
          },
          children: [],
        },
      ],
    },
    {
      path: 'table',
      component: '',
      meta: {
        title: 'routes.demo.comp.table.title',
      },
      children: [
        {
          path: 'basic',
          component: '/demo/comp/table/BasicTable',
          meta: {
            title: 'routes.demo.comp.table.basic',
          },
          children: [],
        },
        {
          path: 'fetch',
          component: '/demo/comp/table/FetchTable',
          meta: {
            title: 'routes.demo.comp.table.fetch',
          },
          children: [],
        },
        {
          path: 'form',
          component: '/demo/comp/table/FormTable',
          meta: {
            title: 'routes.demo.comp.table.form',
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
