import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { resolve } from 'path'

export const primaryColor = '#4BBE73'

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark })
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/styles/config.less')}";`,
    'primary-color': primaryColor,
    'info-color': primaryColor,
    'processing-color': primaryColor,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'border-color-base': '#EEEEEE',
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primaryColor, //   Link color
  }
}
