<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { BasicTable, useTable } from '/@/components/Table'
  import { getBasicColumns } from './tableData'

  import { demoListApi } from '/@/api/component/table'
  export default defineComponent({
    name: 'FetchTable',
    components: {
      BasicTable,
    },
    setup() {
      const [registerTable] = useTable({
        title: '远程加载示例',
        api: demoListApi,
        columns: getBasicColumns(),
      })

      return {
        registerTable,
      }
    },
  })
</script>
