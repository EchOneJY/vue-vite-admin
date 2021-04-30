<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue'
  import Icon from '@ant-design/icons-vue'

  import { SvgIcon } from '/@/components/Icon/index'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { contentProps } from '../props'
  const { t } = useI18n()

  export default defineComponent({
    name: 'MenuItemContent',
    components: {
      Icon,
    },
    props: contentProps,
    setup(props) {
      const { prefixCls } = useDesign('menu-item-content')
      const getI18nName = computed(() => t(props.item?.name))
      const getIcon = computed(() => props.item?.icon)

      function renderIcon() {
        return (
          <SvgIcon
            name={unref(getIcon) || ''}
            size={15}
            class={`${prefixCls}-wrapper__icon mr-2.5`}
          />
        )
      }

      return () => {
        return (
          <>
            {unref(getIcon) ? <Icon component={renderIcon()} /> : null}
            <span>{unref(getI18nName)}</span>
          </>
        )
      }
    },
  })
</script>
