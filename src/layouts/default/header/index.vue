<template>
  <Header :class="prefixCls">
    <div :class="`${prefixCls}-left`">
      <span :class="`${prefixCls}-tirgger`" @click="toggleCollapsed">
        <MenuUnfoldOutlined :style="{ fontSize: '16px' }" v-if="getCollapsed" />
        <MenuFoldOutlined :style="{ fontSize: '16px' }" v-else />
      </span>

      <LayoutBreadcrumb />
    </div>

    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action__item `" />

      <AppLocalePicker :class="`${prefixCls}-action__item`" :showText="false" :reload="true" />

      <UserDropDown />
    </div>
  </Header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Layout } from 'ant-design-vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

  import { AppLocalePicker, AppSearch } from '/@/components/Application'
  import { LayoutBreadcrumb, UserDropDown } from './components'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      AppLocalePicker,
      LayoutBreadcrumb,
      AppSearch,
      UserDropDown,
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

<style lang="less">
  @import './index.less';
</style>
