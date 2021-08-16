import Icon from './Icon/index'
import { Button } from './Button'
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
} from 'ant-design-vue'

import { App } from 'vue'

const compList = [Icon, Button, AntButton.Group]

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp)
  })

  app.use(Input).use(Button).use(Layout)
}
