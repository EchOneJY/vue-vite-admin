<template>
  <Menu theme="dark">
    <MenuItem>
      <UserOutlined />
      <span>nav 1</span>
    </MenuItem>
    <MenuItem>
      <VideoCameraOutlined />
      <span>nav 2</span>
    </MenuItem>
  </Menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Menu } from 'ant-design-vue'
  import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'LayoutMenu',
    components: {
      Menu,
      MenuItem: Menu.Item,
      UserOutlined,
      VideoCameraOutlined,
    },
  })
</script>
