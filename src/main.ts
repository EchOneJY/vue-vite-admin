import '/@/styles/index.less'

import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from '/@/router'
import { setupStore } from '/@/store'

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

;(async () => {
  const app = createApp(App)

  // Configure routing
  setupRouter(app)

  // Configure vuex store
  setupStore(app)

  await router.isReady()

  app.mount('#app', true)
})()
