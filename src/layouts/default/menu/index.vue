<template>
  <Menu
    theme="dark"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleMenuClick"
  >
    <MenuItem key="/dashboard/index">
      <UserOutlined />
      <span>dashboard</span>
    </MenuItem>
    <MenuItem key="/about/index">
      <VideoCameraOutlined />
      <span>about</span>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, watch } from 'vue'

  import { Router } from 'vue-router'

  import { Menu } from 'ant-design-vue'
  import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'

  import { useRouter, useRoute } from 'vue-router'

  interface State {
    openKeys: string[]
    selectedKeys: string[]
  }

  export default defineComponent({
    name: 'LayoutMenu',
    components: {
      Menu,
      MenuItem: Menu.Item,
      UserOutlined,
      VideoCameraOutlined,
    },
    setup() {
      const router: Router = useRouter()
      const route = useRoute()

      const state = reactive<State>({
        openKeys: [],
        selectedKeys: [],
      })

      watch(
        () => route.path,
        () => {
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
      }
    },
  })
</script>
