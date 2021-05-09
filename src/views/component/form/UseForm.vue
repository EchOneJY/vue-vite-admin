<template>
  <div class="m-4">
    <div class="mb-4">
      <mn-button @click="setProps({ labelWidth: 150 })" class="mr-2"> 更改labelWidth </mn-button>
      <mn-button @click="setProps({ labelWidth: 120 })" class="mr-2"> 还原labelWidth </mn-button>
      <mn-button @click="setProps({ size: 'large' })" class="mr-2"> 更改Size </mn-button>
      <mn-button @click="setProps({ size: 'default' })" class="mr-2"> 还原Size </mn-button>
      <mn-button @click="setProps({ disabled: true })" class="mr-2"> 禁用表单 </mn-button>
      <mn-button @click="setProps({ disabled: false })" class="mr-2"> 解除禁用 </mn-button>
      <mn-button @click="setProps({ compact: true })" class="mr-2"> 紧凑表单 </mn-button>
      <mn-button @click="setProps({ compact: false })" class="mr-2"> 还原正常间距 </mn-button>
      <mn-button @click="setProps({ actionColOptions: { span: 8 } })" class="mr-2">
        操作按钮位置
      </mn-button>
    </div>
    <div class="mb-4">
      <mn-button @click="setProps({ showActionButtonGroup: false })" class="mr-2">
        隐藏操作按钮
      </mn-button>
      <mn-button @click="setProps({ showActionButtonGroup: true })" class="mr-2">
        显示操作按钮
      </mn-button>
      <mn-button @click="setProps({ showResetButton: false })" class="mr-2">
        隐藏重置按钮
      </mn-button>
      <mn-button @click="setProps({ showResetButton: true })" class="mr-2">
        显示重置按钮
      </mn-button>
      <mn-button @click="setProps({ showSubmitButton: false })" class="mr-2">
        隐藏查询按钮
      </mn-button>
      <mn-button @click="setProps({ showSubmitButton: true })" class="mr-2">
        显示查询按钮
      </mn-button>
      <mn-button
        @click="
          setProps({
            resetButtonOptions: {
              disabled: true,
              text: '重置New',
            },
          })
        "
        class="mr-2"
      >
        修改重置按钮
      </mn-button>
      <mn-button
        @click="
          setProps({
            submitButtonOptions: {
              disabled: true,
              loading: true,
            },
          })
        "
        class="mr-2"
      >
        修改查询按钮
      </mn-button>
    </div>
    <div class="pt-4 bg-white">
      <BasicForm @register="register" @submit="handleSubmit" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index'
  import { useMessage } from '/@/hooks/web/useMessage'

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e)
        },
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
  ]

  export default defineComponent({
    components: { BasicForm },
    setup() {
      const { createMessage } = useMessage()

      const [register, { setProps }] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
      })
      return {
        register,
        schemas,
        handleSubmit: (values: Recordable) => {
          createMessage.success('click search,values:' + JSON.stringify(values))
        },
        setProps,
      }
    },
  })
</script>
