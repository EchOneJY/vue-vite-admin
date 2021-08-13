export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    // 路由title  一般必填
    title: string
    // Whether to ignore permissions
    ignoreAuth?: boolean
    // role info
    roles?: RoleEnum[]
    // 否忽略KeepAlive缓存
    ignoreKeepAlive?: boolean
    // 是否固定标签
    affix?: boolean
    // 图标，也是菜单图标
    icon?: string
    //内嵌iframe的地址
    frameSrc?: string
    //  指定该路由切换的动画名
    transitionName?: string
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean
    // Hide submenu
    hideChildrenInMenu?: boolean
    //如果该路由会携带参数，且需要在tab页上面显示。则需要设置为true
    carryParam?: boolean
    //是否为单个菜单
    single?: boolean
    // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
    currentActiveMenu?: string
    // 当前路由不在标签页显示
    hideTab?: boolean
    //当前路由不在菜单显示
    hideMenu?: boolean
    isLink?: boolean
    // only build for Menu
    ignoreRoute?: boolean
    // Hide path for children
    hidePathForChildren?: boolean
  }
}
