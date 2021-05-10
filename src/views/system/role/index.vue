<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- <template #form-custom> custom-slot </template> -->

      <template #toolbar>
        <mn-button type="primary" @click="handleCreate">新增</mn-button>
        <mn-button @click="handleOutput">导出</mn-button>
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
          :dropDownActions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: (_action) => {
                return record.status !== '0' // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
            },
            {
              label: '停用',
              popConfirm: {
                title: '是否停用？',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: () => {
                return record.status === '0' // 根据业务控制是否显示: enable状态的显示禁用按钮
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { columns, searchFormSchema } from './role.data'

  import { useModal } from '/@/components/Modal'
  import RoleModal from './RoleModal.vue'

  import { getRoleListByPage } from '/@/api/system/role'

  export default defineComponent({
    components: { BasicTable, TableAction, RoleModal },
    setup() {
      const [registerModal, { openModal }] = useModal()
      const [registerTable, { reload }] = useTable({
        title: '人员信息',
        api: getRoleListByPage,
        columns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
        size: 'small',
      })

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        })
      }

      function handleOutput() {
        console.log('导出')
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

      function handleOpen(record: Recordable) {
        console.log('点击了启用', record)
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleOutput,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleOpen,
      }
    },
  })
</script>
