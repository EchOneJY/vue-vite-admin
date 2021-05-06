<template>
  <a-col v-bind="actionColOpt" :style="{ textAlign: 'right' }" v-if="showActionButtonGroup">
    <FormItem>
      <slot name="resetBefore"></slot>
      <Button
        type="default"
        class="mr-2"
        v-bind="getResetBtnOptions"
        @click="resetAction"
        v-if="showResetButton"
      >
        {{ getResetBtnOptions.text }}
      </Button>
      <slot name="submitBefore"></slot>

      <Button
        type="primary"
        class="mr-2"
        v-bind="getSubmitBtnOptions"
        @click="submitAction"
        v-if="showSubmitButton"
      >
        {{ getSubmitBtnOptions.text }}
      </Button>
    </FormItem>
  </a-col>
</template>
<script lang="ts">
  import type { ColEx } from '../types/index'
  import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'

  import { defineComponent, computed, PropType } from 'vue'
  import { Form, Col } from 'ant-design-vue'
  import { Button } from '/@/components/Button'
  import { useFormContext } from '../hooks/useFormContext'

  import { useI18n } from '/@/hooks/web/useI18n'
  import { propTypes } from '/@/utils/propTypes'

  type ButtonOptions = Partial<ButtonProps> & { text: string }

  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      FormItem: Form.Item,
      Button,
      [Col.name]: Col,
    },
    props: {
      showActionButtonGroup: propTypes.bool.def(true),
      showResetButton: propTypes.bool.def(true),
      showSubmitButton: propTypes.bool.def(true),
      resetButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({}),
      },
      submitButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({}),
      },
      actionColOptions: {
        type: Object as PropType<Partial<ColEx>>,
        default: () => ({}),
      },
      actionSpan: propTypes.number.def(6),
    },
    setup(props) {
      const { t } = useI18n()

      const actionColOpt = computed(() => {
        const { actionColOptions } = props
        const actionColOpt: Partial<ColEx> = {
          span: 4,
          ...actionColOptions,
        }
        return actionColOpt
      })

      const getResetBtnOptions = computed(
        (): ButtonOptions => {
          return Object.assign(
            {
              text: t('common.resetText'),
            },
            props.resetButtonOptions
          )
        }
      )

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            text: t('common.queryText'),
          },
          props.submitButtonOptions
        )
      })

      return {
        t,
        actionColOpt,
        getResetBtnOptions,
        getSubmitBtnOptions,
        ...useFormContext(),
      }
    },
  })
</script>
