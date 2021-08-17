<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue'
  import Icon from '@ant-design/icons-vue'

  import * as CustomeIcon from '/@/components/Icon/index'
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
          <CustomeIcon.Icon
            size={18}
            icon={unref(getIcon) || ''}
            class={`${prefixCls}-wrapper__icon`}
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
