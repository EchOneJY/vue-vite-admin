<template>
  <MenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" :key="item.path" />
  <SubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :class="[theme]"
    popupClassName="app-top-menu-popup"
    :key="item.path"
  >
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </SubMenu>
</template>
<script lang="ts">
  import type { Menu as MenuType } from '/@/router/types'

  import { defineComponent, computed } from 'vue'
  import { Menu } from 'ant-design-vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { itemProps } from '../props'
  import MenuItem from './MenuItem.vue'
  import MenuItemContent from './MenuItemContent.vue'

  export default defineComponent({
    name: 'SubMenuItem',
    isSubMenu: true,
    components: {
      MenuItem,
      SubMenu: Menu.SubMenu,
      MenuItemContent,
    },
    props: itemProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-menu-item')

      const getShowMenu = computed(() => !props.item.meta?.hideMenu)
      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        )
      }
      return {
        prefixCls,
        menuHasChildren,
        getShowMenu,
      }
    },
  })
</script>
