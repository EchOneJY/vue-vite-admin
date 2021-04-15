import type { App } from 'vue'
import {
  createStore,
  // createLogger, Plugin
} from 'vuex'
import { config } from 'vuex-module-decorators'

config.rawError = true
// const plugins: Plugin<any>[] = isDev ? [createLogger()] : [];

const store = createStore({
  // modules: {},
  strict: import.meta.env.DEV,
  // plugins,
})

export function setupStore(app: App<Element>) {
  app.use(store)
}

export default store
