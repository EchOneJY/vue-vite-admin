import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { AppRouteModule } from './type'

const Layout = () => import('/@/layouts/default/index.vue')

const constantRoutes: AppRouteModule[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    children: [
      {
        path: ':path(.*)',
        name: 'RedirectPage',
        component: () => import('/@/views/redirect/index.vue'),
        meta: {
          title: 'Redirect',
        },
      },
    ],
    meta: { title: '跳转中...' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        name: 'DashboardPage',
        path: 'index',
        component: () => import('/@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
    ],
    meta: { title: '首页' },
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        name: 'AboutPage',
        path: 'index',
        component: () => import('/@/views/about/index.vue'),
        meta: {
          title: 'About',
        },
      },
    ],
    meta: { title: '关于' },
  },
  {
    path: '/',
    name: 'GoDefault',
    redirect: '/dashboard',
    meta: {
      title: 'GoDefault',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: (constantRoutes as unknown) as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
