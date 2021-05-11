import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '组织编码',
    dataIndex: 'orgCode',
    width: 120,
    fixed: 'left',
  },
  {
    title: '组织名称',
    dataIndex: 'orgName',
    width: 150,
  },
  {
    title: '上级组织',
    dataIndex: 'parentOrgName',
    width: 150,
  },
  {
    title: '组织类型',
    dataIndex: 'type',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
  },
  {
    title: '创建人',
    dataIndex: 'createAccountName',
    // width: 150,
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'orgName',
    label: '组织名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: [
        {
          label: '启用',
          value: '0',
          key: '0',
        },
        {
          label: '停用',
          value: '1',
          key: '1',
        },
      ],
    },
  },
  {
    field: 'RangePicker',
    label: '起止时间',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
]

export const organizationFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    show: false,
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
]
