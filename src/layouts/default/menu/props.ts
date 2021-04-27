import type { Menu } from '/@/router/types'
import type { PropType } from 'vue'

import { propTypes } from '/@/utils/propTypes'
export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: propTypes.bool,
  // 最好是4 倍数
  inlineIndent: propTypes.number.def(20),

  theme: propTypes.string.def('dark'),
  inlineCollapsed: propTypes.bool,
  mixSider: propTypes.bool,

  isHorizontal: propTypes.bool,
  accordion: propTypes.bool.def(true),
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>,
  },
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  level: propTypes.number,
  // theme: {
  //   type: String,
  //   default: 'dark' || 'light',
  // },
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool,
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true),
}
