export interface MenuSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  collapsed: boolean
  menuWidth: number
  trigger: 'top'
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
  show: boolean

  // 显示全屏按钮
  showFullScreen: boolean
}

export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean

  headerSetting: HeaderSetting

  // 菜单类型
  menuSetting: MenuSetting
}
