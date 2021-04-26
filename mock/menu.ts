import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from './_util'

// single
const asyncRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  children: [],
  meta: {
    title: 'routes.dashboard',
    icon: 'home',
    affix: true,
  },
}

const levelRoute = {
  path: '/level',
  name: 'Level',
  meta: {
    icon: 'level',
    title: 'routes.level',
  },
  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        title: 'Menu1',
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      meta: {
        title: 'Menu2',
      },
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
