import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from './_util'

// single
const asyncRoute = {
  path: 'dashboard/index',
  children: [],
  component: '/dashboard/index',
  meta: {
    title: 'routes.dashboard.dashboard',
    icon: 'home',
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

export default [
  {
    url: '/basic-api/getMenuListById',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess([asyncRoute, levelRoute])
    },
  },
] as MockMethod[]
