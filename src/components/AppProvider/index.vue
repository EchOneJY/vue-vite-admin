<script lang="ts">
  import { defineComponent, toRefs } from 'vue'

  import { prefixCls } from '/@/settings/design'
  import { createAppProviderContext } from './useAppContext'

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props: {
      prefixCls: {
        type: String,
        default: prefixCls,
      },
    },
    setup(props, { slots }) {
      const { prefixCls } = toRefs(props)

      createAppProviderContext({ prefixCls })

      return () => slots.default?.()
    },
  })
</script>
