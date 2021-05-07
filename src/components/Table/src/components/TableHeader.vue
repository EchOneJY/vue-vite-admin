<template>
  <div :class="prefixCls">
    <template v-if="!useSearchForm">
      <slot name="tableTitle" v-if="$slots.tableTitle"></slot>

      <TableTitle
        :helpMessage="titleHelpMessage"
        :title="title"
        v-if="!$slots.tableTitle && title"
      />
    </template>

    <div :class="[`${prefixCls}__toolbar`, { form: useSearchForm }]">
      <div :class="`${prefixCls}__toolbar__slot`">
        <slot name="toolbar"></slot>
      </div>
      <Divider type="vertical" v-if="!useSearchForm && $slots.toolbar && showTableSetting" />
      <TableSetting :setting="tableSetting" v-if="showTableSetting" />
    </div>
  </div>
</template>
<script lang="ts">
  import type { TableSetting } from '../types/table'
  import type { PropType } from 'vue'

  import { defineComponent } from 'vue'
  import { Divider } from 'ant-design-vue'
  import TableSettingComponent from './settings/index.vue'
  import TableTitle from './TableTitle.vue'

  import { useDesign } from '/@/hooks/web/useDesign'

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      Divider,
      TableTitle,
      TableSetting: TableSettingComponent,
    },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
      },
      tableSetting: {
        type: Object as PropType<TableSetting>,
      },
      showTableSetting: {
        type: Boolean,
      },
      titleHelpMessage: {
        type: [String, Array] as PropType<string | string[]>,
        default: '',
      },
      useSearchForm: {
        type: Boolean,
      },
    },
    setup() {
      const { prefixCls } = useDesign('basic-table-header')
      return { prefixCls }
    },
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-header';

  .@{prefix-cls} {
    display: flex;
    padding: 4px 4px;
    border-bottom: none;
    justify-content: space-between;
    align-items: center;
    &__toolbar {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &.form {
        justify-content: space-between;
      }

      > * {
        margin-right: 8px;
      }

      &__slot {
        > * {
          margin-right: 12px;
        }
      }
    }
  }
</style>
