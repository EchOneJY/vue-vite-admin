<template>
  <Header class="layout-header">
    <div class="layout-header-left">
      <span class="layout-header-tirgger" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
      </span>
    </div>

    <div class="layout-header-action"> 欢迎您，admin </div>
  </Header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Layout } from 'ant-design-vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting()
      return {
        getCollapsed,
        toggleCollapsed,
      }
    },
  })
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    padding: 0;
    &-left {
      display: flex;
      height: 100%;
      align-items: center;
    }
    &-tirgger {
      display: flex;
      height: 100%;
      padding: 1px 10px 0 10px;
      cursor: pointer;
      align-items: center;
      &:hover {
        background: #f6f6f6;
      }
    }
  }
</style>
