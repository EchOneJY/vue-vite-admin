import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_util'

// single
const dashboardRoute = {
  path: '/login',
  name: 'Login',
  component: '/@/views/login/index.vue',
  meta: {
    title: '登录',
  },
}

export default [
  {
    url: '/basic-api/getMenuListById',
    timeout: 1000,
    method: 'get',
    response: () => {
      resultSuccess([dashboardRoute])
    },
  },
] as MockMethod[]
