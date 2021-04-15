<template>
  <Header :class="prefixCls">
    <div :class="`${prefixCls}-left`">
      <span :class="`${prefixCls}-tirgger`" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
      </span>
    </div>

    <div :class="`${prefixCls}-action`"> 欢迎您，admin </div>
  </Header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Layout } from 'ant-design-vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    setup() {
      const { prefixCls } = useDesign('layout-header')
      const { getCollapsed, toggleCollapsed } = useMenuSetting()
      return {
        prefixCls,
        getCollapsed,
        toggleCollapsed,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-header';

  .@{prefix-cls} {
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
