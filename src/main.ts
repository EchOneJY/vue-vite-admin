import '/@/styles/index.less'
import 'virtual:windi.css'

import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { setupRouterGuard } from '/@/router/guard'
import { setupI18n } from '/@/locales/setupI18n'
import { setupGlobDirectives } from '/@/directives'
import { useInit } from '/@/hooks/web/useInit'
import { registerGlobComp } from '/@/components/registerGlobComp'

// Register icon Sprite
import 'vite-plugin-svg-icons/register'

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

;(async () => {
  const app = createApp(App)

  // 配置vuex
  setupStore(app)

  //初始化系统配置
  useInit()

  // 注册全局组件
  registerGlobComp(app)

  // 配置多语言
  await setupI18n(app)

  // 配置路由
  setupRouter(app)

  // 配置路由守卫
  setupRouterGuard()

  // 注册全局directive
  setupGlobDirectives(app)

  // 当路由准备好后加载
  await router.isReady()

  app.mount('#app', true)
})()
