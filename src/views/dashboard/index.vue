<template>
  <Table :columns="columns" :data-source="data" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { Table } from 'ant-design-vue'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Table,
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

      return {
        data,
        columns,
      }
    },
  })
</script>
