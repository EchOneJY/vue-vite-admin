import type { FieldMapToTime, FormSchema } from './types/form'
import type { CSSProperties, PropType } from 'vue'
import type { ColEx } from './types'
import type { TableActionType } from '/@/components/Table'
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'

import { propTypes } from '/@/utils/propTypes'

export const basicProps = {
  // 是否为表格表单
  isFormTable: propTypes.bool,
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  // 间隔时间自定义 [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD']
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  // 是否紧凑表单
  compact: propTypes.bool,
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  // mergeDynamicData: {
  //   type: Object as PropType<Recordable>,
  //   default: null,
  // },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  autoSetPlaceHolder: propTypes.bool.def(true),
  // 重置表单时是否重新查询
  submitOnReset: propTypes.bool,
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  // 禁用表单
  disabled: propTypes.bool,
  // 转化时间
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date?.format('YYYY-MM-DD HH:mm:ss')
    },
  },
  rulesMessageJoinLabel: propTypes.bool.def(true),

  // 是否显示操作按钮
  showActionButtonGroup: propTypes.bool.def(true),
  // 操作列Col配置
  actionColOptions: Object as PropType<Partial<ColEx>>,
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
  autoFocusFirstItem: propTypes.bool,
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 以下为默认props
  // hideRequiredMark: propTypes.bool,

  labelCol: Object as PropType<Partial<ColEx>>,

  layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),

  tableAction: {
    type: Object as PropType<TableActionType>,
  },

  wrapperCol: Object as PropType<Partial<ColEx>>,

  colon: propTypes.bool,
}
