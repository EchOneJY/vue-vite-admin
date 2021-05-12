<template>
  <div class="flex" v-if="!detailVisible">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <mn-button type="primary" @click="handleAdd">新增</mn-button>
        <mn-button @click="handleAdd">导出</mn-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>

  <!-- Detail -->
  <OrganizationDetail :action="detailAction" :data="detailData" @back="handleBack" v-else />
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import OrganizationDetail from './Detail.vue'
  import { getOrganizationPageList } from '/@/api/system/organization'
  import DeptTree from './DeptTree.vue'

  import { columns, searchFormSchema } from './organization.data'

  export default defineComponent({
    name: 'OrganizationManagement',
    components: { BasicTable, DeptTree, TableAction, OrganizationDetail },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        showIndexColumn: false,
        api: getOrganizationPageList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          fieldMapToTime: [['RangePicker', ['createTimeBegin', 'createTimeEnd']]],
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      })
      const detailState = reactive({
        detailVisible: false,
        detailData: {},
        detailAction: 'add',
      })

      function handleAdd() {
        detailState.detailAction = 'add'
        detailState.detailVisible = true
        detailState.detailData = {}
      }

      function handleEdit(record: Recordable) {
        detailState.detailAction = 'edit'
        detailState.detailData = record
        detailState.detailVisible = true
      }

      function handleDelete(record: Recordable) {
        console.log(record)
      }

      function handleSuccess() {
        reload()
      }

      function handleSelect(deptId = '') {
        reload({ searchInfo: { deptId } })
      }

      function handleBack() {
        detailState.detailVisible = false
      }

      return {
        ...toRefs(detailState),
        registerTable,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleBack,
      }
    },
  })
</script>
