<template>
  <span :class="`${prefixCls} flex items-center`">
    <SvgIcon
      v-if="getIcon"
      :name="getIcon"
      :size="15"
      :class="`${prefixCls}-wrapper__icon mr-2.5`"
    />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import { SvgIcon } from '/@/components/Icon/index'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { contentProps } from '../props'
  const { t } = useI18n()

  export default defineComponent({
    name: 'MenuItemContent',
    components: {
      SvgIcon,
    },
    props: contentProps,
    setup(props) {
      const { prefixCls } = useDesign('menu-item-content')
      const getI18nName = computed(() => t(props.item?.name))
      const getIcon = computed(() => props.item?.icon)

      return {
        prefixCls,
        getI18nName,
        getIcon,
      }
    },
  })
</script>
