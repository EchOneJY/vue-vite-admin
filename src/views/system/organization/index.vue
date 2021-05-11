<template>
  <div class="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <mn-button type="primary" @click="handleCreate">新增</mn-button>
        <mn-button @click="handleCreate">导出</mn-button>
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
    <OrganizationModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import OrganizationModal from './OrganizationModal.vue'
  import { getOrganizationPageList } from '/@/api/system/organization'
  import DeptTree from './DeptTree.vue'

  import { useModal } from '/@/components/Modal'

  import { columns, searchFormSchema } from './organization.data'

  export default defineComponent({
    name: 'OrganizationManagement',
    components: { OrganizationModal, BasicTable, DeptTree, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal()
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

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        })
      }

      function handleEdit(record: Recordable) {
        console.log(record)
        openModal(true, {
          record,
          isUpdate: true,
        })
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

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
      }
    },
  })
</script>
