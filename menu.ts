export interface MenuType {
  path: string //路径
  component: string //模块
  hidden: boolean //是否显示
  meta: {
    title: string //菜单名称
    icon?: string //图标，也是菜单图标
    btnAuth?: string[] //按钮权限
  }
  children?: MenuType[]
}
