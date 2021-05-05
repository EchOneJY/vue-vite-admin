<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleReloadCurrent"> 刷新当前页 </Button>
        <Button type="primary" @click="handleReload"> 刷新并返回第一页 </Button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Button } from 'ant-design-vue'
  import { BasicTable, useTable } from '/@/components/Table'
  import { getBasicColumns } from './tableData'

  import { demoListApi } from '/@/api/component/table'
  export default defineComponent({
    name: 'FetchTable',
    components: {
      Button,
      BasicTable,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '远程加载示例',
        api: demoListApi,
        columns: getBasicColumns(),
      })

      function handleReloadCurrent() {
        reload()
      }

      function handleReload() {
        reload({
          page: 1,
        })
      }

      return {
        registerTable,
        handleReloadCurrent,
        handleReload,
      }
    },
  })
</script>
