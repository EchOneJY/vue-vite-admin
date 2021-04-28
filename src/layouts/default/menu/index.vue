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
  import { defineComponent, reactive, toRefs, watch } from 'vue'

  import { Router } from 'vue-router'

  import { Menu } from 'ant-design-vue'
  // import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'

  import { useRouter, useRoute } from 'vue-router'

  import { permissionStore } from '/@/store/modules/permission'
  import SubMenuItem from './components/SubMenuItem.vue'
  import { getAllParentPath } from '/@/router/helper/menuHelper'

  interface State {
    openKeys: string[]
    selectedKeys: string[]
  }

  export default defineComponent({
    name: 'LayoutMenu',
    components: {
      Menu,
      SubMenuItem,
      // MenuItem: Menu.MenuItem,
      // UserOutlined,
      // VideoCameraOutlined,
    },
    setup() {
      const router: Router = useRouter()
      const route = useRoute()

      const state = reactive<State>({
        openKeys: [],
        selectedKeys: [],
      })

      const menus = permissionStore.getBackMenuList

      watch(
        () => route.path,
        () => {
          state.openKeys = getAllParentPath(menus, route.path)
          state.selectedKeys.push(route.path)
        },
        {
          immediate: true,
        }
      )

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
