<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <BasicForm
      ref="formElRef"
      :isFormTable="getBindValues.useSearchForm"
      submitOnReset
      v-bind="getFormProps"
      v-if="getBindValues.useSearchForm"
      :tableAction="tableAction"
      @register="registerForm"
      @submit="handleSearchInfoChange"
      @advanced-change="redoHeight"
    >
      <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </BasicForm>

    <Table
      ref="tableElRef"
      v-bind="getBindValues"
      :rowClassName="getRowClassName"
      @change="handleTableChange"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>

      <template #[`header-${column.dataIndex}`] v-for="column in columns" :key="column.dataIndex">
        <HeaderCell :column="column" />
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
  import type { BasicTableProps, TableActionType, SizeType } from './types/table'

  import { defineComponent, ref, computed, unref, toRaw } from 'vue'
  import { Table } from 'ant-design-vue'
  import { BasicForm, useForm } from '/@/components/Form/index'
  // import expandIcon from './components/ExpandIcon'
  import HeaderCell from './components/HeaderCell.vue'

  import { usePagination } from './hooks/usePagination'
  import { useColumns } from './hooks/useColumns'
  import { useDataSource } from './hooks/useDataSource'
  import { useLoading } from './hooks/useLoading'
  import { useRowSelection } from './hooks/useRowSelection'
  import { useTableScroll } from './hooks/useTableScroll'
  import { useCustomRow } from './hooks/useCustomRow'
  import { useTableStyle } from './hooks/useTableStyle'
  import { useTableHeader } from './hooks/useTableHeader'
  // import { useTableExpand } from './hooks/useTableExpand'
  import { createTableContext } from './hooks/useTableContext'
  import { useTableFooter } from './hooks/useTableFooter'
  import { useTableForm } from './hooks/useTableForm'
  import { useExpose } from '/@/hooks/core/useExpose'
  import { useDesign } from '/@/hooks/web/useDesign'

  import { omit } from 'lodash-es'
  import { basicProps } from './props'

  export default defineComponent({
    components: {
      Table,
      BasicForm,
      HeaderCell,
    },
    props: basicProps,
    emits: [
      'fetch-success',
      'fetch-error',
      'selection-change',
      'register',
      'row-click',
      'row-dbClick',
      'row-contextmenu',
      'row-mouseenter',
      'row-mouseleave',
    ],
    setup(props, { attrs, emit, slots }) {
      const formElRef = ref<ComponentRef>(null)
      const tableElRef = ref<ComponentRef>(null)
      const tableData = ref<Recordable[]>([])

      const wrapRef = ref<Nullable<HTMLDivElement>>(null)
      const innerPropsRef = ref<Partial<BasicTableProps>>()

      const { prefixCls } = useDesign('basic-table')
      const [registerForm, formActions] = useForm()

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) } as BasicTableProps
      })

      const { getLoading, setLoading } = useLoading(getProps)
      const {
        getPaginationInfo,
        getPagination,
        setPagination,
        setShowPagination,
        getShowPagination,
      } = usePagination(getProps)

      const {
        getRowSelection,
        getRowSelectionRef,
        getSelectRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
        deleteSelectRowByKey,
        setSelectedRowKeys,
      } = useRowSelection(getProps, tableData, emit)

      const {
        handleTableChange,
        getDataSourceRef,
        getDataSource,
        setTableData,
        fetch,
        getRowKey,
        reload,
        getAutoCreateKey,
        updateTableData,
      } = useDataSource(
        getProps,
        {
          tableData,
          getPaginationInfo,
          setLoading,
          setPagination,
          getFieldsValue: formActions.getFieldsValue,
          clearSelectedRowKeys,
        },
        emit
      )

      const {
        getViewColumns,
        getColumns,
        setCacheColumnsByField,
        setColumns,
        getColumnsRef,
        getCacheColumns,
      } = useColumns(getProps, getPaginationInfo)

      const { getScrollRef, redoHeight } = useTableScroll(
        getProps,
        tableElRef,
        getColumnsRef,
        getRowSelectionRef,
        getDataSourceRef
      )

      const { customRow } = useCustomRow(getProps, {
        setSelectedRowKeys,
        getSelectRowKeys,
        clearSelectedRowKeys,
        getAutoCreateKey,
        emit,
      })

      const { getRowClassName } = useTableStyle(getProps, prefixCls)

      // const { getExpandOption, expandAll, collapseAll } = useTableExpand(getProps, tableData, emit)

      const { getHeaderProps } = useTableHeader(getProps, slots)

      const { getFooterProps } = useTableFooter(
        getProps,
        getScrollRef,
        tableElRef,
        getDataSourceRef
      )

      const {
        getFormProps,
        replaceFormSlotKey,
        getFormSlotKeys,
        handleSearchInfoChange,
      } = useTableForm(getProps, slots, fetch, getLoading)

      const getBindValues = computed(() => {
        const dataSource = unref(getDataSourceRef)
        let propsData: Recordable = {
          size: 'middle',
          // // ...(dataSource.length === 0 ? { getPopupContainer: () => document.body } : {}),
          ...attrs,
          customRow,
          // expandIcon: expandIcon(),
          ...unref(getProps),
          ...unref(getHeaderProps),
          scroll: unref(getScrollRef),
          loading: unref(getLoading),
          tableLayout: 'fixed',
          rowSelection: unref(getRowSelectionRef),
          rowKey: unref(getRowKey),
          columns: toRaw(unref(getViewColumns)),
          pagination: toRaw(unref(getPaginationInfo)),
          dataSource,
          footer: unref(getFooterProps),
          // ...unref(getExpandOption),
        }
        // if (slots.expandedRowRender) {
        //   propsData = omit(propsData, 'scroll')
        // }

        propsData = omit(propsData, 'class')
        return propsData
      })

      // setTimeout(() => {
      //   console.log(unref(getRowClassName))
      //   // console.log(unref(getBindValues))
      // }, 2000)

      const getWrapperClass = computed(() => {
        const values = unref(getBindValues)
        return [
          prefixCls,
          attrs.class,
          {
            [`${prefixCls}-form-container`]: values.useSearchForm,
          },
        ]
      })

      const getEmptyDataIsShowTable = computed(() => {
        const { emptyDataIsShowTable, useSearchForm } = unref(getProps)
        if (emptyDataIsShowTable || !useSearchForm) {
          return true
        }
        return !!unref(getDataSourceRef).length
      })

      function setProps(props: Partial<BasicTableProps>) {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props }
      }

      const tableAction: TableActionType = {
        reload,
        getSelectRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
        deleteSelectRowByKey,
        setPagination,
        setTableData,
        redoHeight,
        setSelectedRowKeys,
        setColumns,
        setLoading,
        getDataSource,
        setProps,
        getRowSelection,
        getPaginationRef: getPagination,
        getColumns,
        getCacheColumns,
        emit,
        updateTableData,
        setShowPagination,
        getShowPagination,
        setCacheColumnsByField,
        // expandAll,
        // collapseAll,
        getSize: () => {
          return unref(getBindValues).size as SizeType
        },
      }
      createTableContext({ ...tableAction, wrapRef, getBindValues })

      useExpose<TableActionType>(tableAction)

      emit('register', tableAction, formActions)

      return {
        formElRef,
        tableElRef,
        getBindValues,
        getLoading,
        registerForm,
        handleSearchInfoChange,
        getEmptyDataIsShowTable,
        handleTableChange,
        getRowClassName,
        wrapRef,
        tableAction,
        redoHeight,
        getFormProps,
        replaceFormSlotKey,
        getFormSlotKeys,
        getWrapperClass,
        columns: getViewColumns,
      }
    },
  })
</script>
<style lang="less">
  @border-color: #cecece4d;

  @prefix-cls: ~'@{namespace}-basic-table';

  .@{prefix-cls} {
    &-row__striped {
      td {
        background-color: #fafafa;
      }
    }

    &-form-container {
      position: relative;
      padding: 0.75rem 1rem;

      .ant-form {
        padding: 0.75rem 0.75rem 0.25rem 0.25rem;
        margin-bottom: 0.75rem;
        background-color: @component-background;
        border-radius: 2px;
      }
    }

    .ant-tag {
      margin-right: 0;
    }

    .ant-table-wrapper {
      padding: 6px;
      background-color: @component-background;
      border-radius: 2px;

      .ant-table-title {
        min-height: 40px;
        padding: 0 0 8px 0 !important;
      }

      .ant-table.ant-table-bordered .ant-table-title {
        border: none !important;
      }
    }

    .ant-table {
      width: 100%;
      overflow-x: hidden;

      .ant-table-tbody > tr.ant-table-row-selected td {
        background-color: fade(@primary-color, 8%) !important;
      }
    }

    .ant-pagination {
      margin: 10px 0 0 0;
    }

    .ant-table-footer {
      padding: 0;

      .ant-table-wrapper {
        padding: 0;
      }

      table {
        border: none !important;
      }

      .ant-table-body {
        overflow-x: hidden !important;
        overflow-y: scroll !important;
      }

      td {
        padding: 12px 8px;
      }
    }
  }
</style>
