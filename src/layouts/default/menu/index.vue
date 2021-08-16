<template>
  <Menu
    theme="dark"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleMenuClick"
    mode="inline"
  >
    <template v-for="item in menus" :key="item.path">
      <SubMenuItem :item="item" />
    </template>
  </Menu>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  import { Router } from 'vue-router'

  import { Menu } from 'ant-design-vue'

  import { useRouter } from 'vue-router'

  import { usePermissionStore } from '/@/store/modules/permission'
  import SubMenuItem from './components/SubMenuItem.vue'
  import { getAllParentPath } from '/@/router/helper/menuHelper'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { useUserStore } from '/@/store/modules/user'

  import { listenerRouteChange } from '/@/logics/mitt/routeChange'

  interface State {
    openKeys: string[]
    selectedKeys: string[]
  }

  export default defineComponent({
    name: 'LayoutMenu',
    components: {
      Menu,
      SubMenuItem,
    },
    setup() {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()

      const router: Router = useRouter()

      const state = reactive<State>({
        openKeys: [],
        selectedKeys: [],
      })

      const menus = permissionStore.getFrontMenuList

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME || !userStore.getToken) {
          return
        }
        state.openKeys = getAllParentPath(menus, route.path)
        state.selectedKeys = [route.path]
      })

      const handleMenuClick = (e) => {
        state.selectedKeys = e.keyPath
        router.push(e.key)
      }

      return {
        ...toRefs(state),
        handleMenuClick,
        menus,
      }
    },
  })
</script>
