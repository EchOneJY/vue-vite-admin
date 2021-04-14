<template>
  <Layout>
    <LayoutContent />
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  import LayoutContent from './content/index.vue'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Layout,
      LayoutContent,
    },
  })
</script>
