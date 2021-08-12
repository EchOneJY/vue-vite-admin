<template>
  <div class="h-full">
    <Row :gutter="24" class="h-full p-4">
      <Col :span="14">
        <div class="h-full flex flex-col">
          <PageTitle class="p-4 bg-white flex-none" title="组织管理" />
          <BasicForm class="bg-white flex-auto mt-5" @register="register" />
        </div>
      </Col>
      <Col :span="10">
        <BasicTree :treeData="treeData" :replaceFields="{ key: 'id', title: 'orgName' }">
          <template #headerTitle>
            <PageTitle class="p-2 bg-white" title="权限配置" />
          </template>
        </BasicTree>
      </Col>
    </Row>
    <PageFooter>
      <template #right>
        <mn-button class="mr-3" type="primary" @click="handleSubmit">保存</mn-button>
        <mn-button @click="handleBack">返回</mn-button>
      </template>
    </PageFooter>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { Row, Col } from 'ant-design-vue'

  import { PageTitle } from '/@/components/Page'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { BasicTree, TreeItem } from '/@/components/Tree'
  import { PageFooter } from '/@/components/Page'

  import { getOrganizationTreeList } from '/@/api/system/organization'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'OrganizationDetail',
    components: { Row, Col, PageTitle, BasicForm, BasicTree, PageFooter },
    props: {
      action: propTypes.string.def('add'),
      data: propTypes.object,
    },
    emits: ['back'],
    setup(props, { emit }) {
      const schemas: FormSchema[] = [
        {
          field: 'parentOrgName',
          component: 'Input',
          label: '上级组织',
          colProps: {
            span: 20,
          },
          rules: [
            {
              required: true,
              trigger: 'change',
            },
          ],
        },
        {
          field: 'test',
          component: 'Select',
          label: '组织类型',
          colProps: {
            span: 20,
          },
          componentProps: {
            options: [
              {
                label: '管理组织',
                value: 1,
              },
              {
                label: '工厂',
                value: 2,
              },
              {
                label: '外设仓',
                value: 3,
              },
              {
                label: '其他',
                value: 4,
              },
            ],
          },
          rules: [
            {
              required: true,
              // trigger: 'blur',
            },
          ],
        },
        {
          field: 'orgName',
          component: 'Input',
          label: '组织名称',
          colProps: {
            span: 20,
          },
          rules: [
            {
              required: true,
              trigger: 'change',
            },
          ],
        },
        {
          field: 'orgCode',
          component: 'Input',
          label: '组织编码',
          colProps: {
            span: 20,
          },
          rules: [
            {
              required: true,
              trigger: 'change',
            },
          ],
        },
      ]

      // composition-表单
      const [register, { validate, getFieldsValue, setFieldsValue, resetFields }] = useForm({
        labelWidth: 140,
        schemas,
        showActionButtonGroup: false,
      })

      onMounted(() => {
        const { action, data } = props
        console.log(data)
        if (action === 'edit') {
          setFieldsValue(data)
        }
      })

      function handleSubmit() {
        validate().then(() => {
          const parmas = getFieldsValue()
          console.log(parmas)
        })
      }

      // composition-树
      const treeData = ref<TreeItem[]>([])

      async function fetch() {
        treeData.value = ((await getOrganizationTreeList()) as unknown) as TreeItem[]
      }

      onMounted(() => {
        fetch()
      })

      // 返回
      function handleBack() {
        resetFields()
        emit('back')
      }

      return {
        register,
        treeData,
        handleSubmit,
        handleBack,
      }
    },
  })
</script>
