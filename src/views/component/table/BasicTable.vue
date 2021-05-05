<template>
  <BasicTable
    title="基础示例"
    titleHelpMessage="温馨提醒"
    :columns="columns"
    :dataSource="data"
    :bordered="border"
    :pagination="pagination"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { BasicTable } from '/@/components/Table'

  export default defineComponent({
    name: 'BasicTable',
    components: {
      BasicTable,
    },
    setup() {
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ]

      const data = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ]

      const border = ref(true)
      const pagination = ref<any>(false)

      return {
        data,
        columns,
        border,
        pagination,
      }
    },
  })
</script>
