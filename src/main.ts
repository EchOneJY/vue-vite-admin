import '/@/styles/index.less'
import 'virtual:windi.css'

import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { setupRouterGuard } from '/@/router/guard'

import { localeStore } from '/@/store/modules/locale'
import { setupI18n } from '/@/locales/setupI18n'

// Register icon Sprite
import 'vite-plugin-svg-icons/register'

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

;(async () => {
  const app = createApp(App)

  // Configure vuex store
  setupStore(app)

  localeStore.initLocale()

  // Multilingual configuration
  await setupI18n(app)

  // Configure routing
  setupRouter(app)

  // router-guard
  setupRouterGuard()

  // Mount when the route is ready
  await router.isReady()

  app.mount('#app', true)
})()
