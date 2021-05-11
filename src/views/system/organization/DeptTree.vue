<template>
  <div class="bg-white m-3 mr-0 overflow-hidden">
    <BasicTree
      title="组织管理"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'orgName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'

  import { BasicTree, TreeItem } from '/@/components/Tree'
  import { getOrganizationTreeList } from '/@/api/system/organization'

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([])

      async function fetch() {
        treeData.value = ((await getOrganizationTreeList()) as unknown) as TreeItem[]
      }

      function handleSelect(keys: string, e) {
        emit('select', keys[0])
        console.log(keys, e)
      }

      onMounted(() => {
        fetch()
      })
      return { treeData, handleSelect }
    },
  })
</script>
