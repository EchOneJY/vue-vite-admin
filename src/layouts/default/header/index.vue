<template>
  <Header :class="prefixCls">
    <div :class="`${prefixCls}-left`">
      <span :class="`${prefixCls}-tirgger`" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
      </span>
    </div>

    <div :class="`${prefixCls}-action`">
      <AppLocalePicker :class="`${prefixCls}-action__item`" :showText="false" :reload="true" />

      <span class="mx-2">欢迎您，admin</span>

      <span :class="`${prefixCls}-action__item`" @click="handleLoginOut">
        <Icon icon="ion:power-outline" />
      </span>
    </div>
  </Header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Layout } from 'ant-design-vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { Icon } from '/@/components/Icon'
  import { AppLocalePicker } from '/@/components/Application'

  import { useDesign } from '/@/hooks/web/useDesign'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { userStore } from '/@/store/modules/user'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      Icon,
      AppLocalePicker,
    },
    setup() {
      const { prefixCls } = useDesign('layout-header')
      const { getCollapsed, toggleCollapsed } = useMenuSetting()

      const handleLoginOut = () => {
        userStore.confirmLoginOut()
      }

      return {
        prefixCls,
        getCollapsed,
        toggleCollapsed,
        handleLoginOut,
      }
    },
  })
</script>

<style lang="less">
  @import './index.less';
</style>
