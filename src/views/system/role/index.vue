<template>
  <BasicTable @register="registerTable">
    <!-- <template #form-custom> custom-slot </template> -->

    <template #toolbar>
      <Button type="primary" @click="getFormValues">获取表单数据</Button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Button } from 'ant-design-vue'
  import { BasicTable, useTable } from '/@/components/Table'
  import { columns, searchFormSchema } from './role.data'

  import { getRoleListByPage } from '/@/api/system/role'

  export default defineComponent({
    components: { BasicTable, Button },
    setup() {
      const [registerTable, { getForm }] = useTable({
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
      })

      function getFormValues() {
        console.log(getForm().getFieldsValue())
      }

      return {
        registerTable,
        getFormValues,
      }
    },
  })
</script>
