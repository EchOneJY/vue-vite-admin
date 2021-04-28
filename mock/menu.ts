import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from './_util'
import { ExceptionEnum } from '/@/enums/exceptionEnum'

// single
const asyncRoute = {
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
      component: '/exception/index',
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
      component: '/exception/index',
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
      component: '/exception/index',
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
      component: '/exception/index',
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
      component: '/exception/index',
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

export default [
  {
    url: '/basic-api/getMenuListById',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess([asyncRoute, levelRoute, exceptionRoute])
    },
  },
] as MockMethod[]
