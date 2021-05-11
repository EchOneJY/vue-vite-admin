# 技术选型
- Vue->3.x
- Vite->2.x
- TypeScript->4.x
- Ant-Design-Vue->^2.1.2
- Axios->^0.21.1
- Less->^4.1.1
- Eslint->7.x
- Prettier->^2.2.1


# 基础架构
## 目录结构
<br />
| ├── build # 构建相关脚本<br />├── mock # 模拟数据<br />├── public # 静态资源<br />├── src # 项目代码<br />│   ├── api #请求相关<br />│   ├── assets # 静态资源<br />│   ├── components # 组件<br />│   ├── styles # 样式<br />│   ├── enums # 常量，枚举<br />│   ├── hooks # hooks<br />│   ├── layouts # 布局<br />│   ├── main.ts # 入口文件<br />│   ├── router #路由，菜单等<br />│   ├── locale #多语言文件<br />│   ├── settings # 配置文件<br />│   ├── store # vuex<br />│   ├── utils # 工具类<br />│   └── views # 页面<br />└── types # 类型定义 |
| --- |

## Vite配置


## Mock


## 路由及菜单


## 权限


# 基础开发
## 样式


## 请求


## 缓存
### 浏览器缓存


### Vuex


# 组件
## 图标
### Icon
#### 示例
```javascript
<Icon icon="ion:language" color="white" :size="14/>

<Icon icon="language" color="white" :size="14" prefix="ion"/>
```
#### 属性
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 名称（后缀为 |svg 即为SvgIcon） | String | —— |
| color | 颜色 | String | —— |
| size | 尺寸 | String | —— |
| spin | 旋转动画 | Boolen | false |
| prefix | 名称前缀 | String | —— |

### SvgIcon
#### 示例
```javascript
<SvgIcon :size="size" :name="getSvgIcon" v-if="isSvgIcon" :spin="spin" />
```
#### 属性
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 名称 | String | icon |
| size | 尺寸 | String | —— |
| spin | 旋转动画 | Boolen | false |
| prefix | 名称前缀 | String | —— |



## 按钮
### MnButton
> 该组件已全局注册，无需单独引入

#### 示例
```javascript
<mn-button type="link" size="small">
  <MoreOutlined class="icon-more" />
</mn-button>
```
#### 属性
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 `primary` `default` `danger` `dashed` `link` | String | default |
| color | 颜色 `error` `warning` `success` | String | —— |
| loading | 加载状态 | Boolen | false |
| disabled | 禁用状态 | Boolean | false |
| preIcon | 前置图标 | String | —— |
| postIcon | 后置图标 | String | —— |
| onClick | 点击事件 | Function | —— |

#### slot
| 名称 | 说明 |
| --- | --- |
| default | 默认插槽 |

## 表单
### BasicForm
#### 示例
**基础使用**
> 详见 src/views/component/form/BasicForm.vue



**表单校验**
> 详见 src/view/component/form/RuleForm.vue



#### 属性
> 以下Column属性与Antd-Vue中Grid->Col属性一致

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | Object | {} |
| labelWidth | label 标签宽度 | String | Number | 0 |
| schemas | 表单配置规则 | Array | [] |
| disabled | 禁用表单 | Boolean | false |
| size | 尺寸 `default` `small` `large` | String | default |
| layout | 布局 `horizontal` `vertical` `inline` | String | horizontal |
| labelAlign | 标签对齐方式 | String | —— |
| colon | 标签冒号显示 | Boolean | true |
| isFormTable | 是否为表格表单 | Boolean | false |
| compact | 是否紧凑表单 | Boolean | false |
| autoSetPlaceHolder | 是否自动设置placeholder | Boolean | true |
| baseRowStyle | 自定义Row样式 | Object | —— |
| baseColProps | 自定义Column属性 | Object | —— |
| rulesMessageJoinLabel | 是否将label添加到校验提示信息 | Boolean | true |
| showActionButtonGroup | 是否显示操作按钮 | Boolean | true |
| actionColOptions | 操作列Column配置 | Object | —— |
| showResetButton | 是否显示重置按钮 | Boolean | true |
| resetButtonOptions | 重置按钮配置 | Object | —— |
| showSubmitButton | 是否显示提交按钮 | Boolean | true |
| submitButtonOptions | 提交按钮配置 | Object | —— |
| labelCol | 标签Column属性 | Object | —— |
| wrapperCol | 表单子项Column属性 | Object | —— |
| fieldMapToTime | 间隔时间自定义 | Array | [] |
| transformDateFunc | 转换Date函数 | Function | —— |
| autoFocusFirstItem | 是否聚焦第一个Input框 | Boolen | false |



**schema**

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| field | （必填）字段名称 | String | default |
| label | （必填）标签名称 | Boolen | false |
| component | （必填）组件类型 | String | —— |
| componentProps | 组件属性 | Object | Function | —— |
| valueField | 字段值 | String | —— |
| changeEvent | 触发事件名称 | String | change |
| labelWidth | 标签宽度 | String | Number | —— |
| subLabel | 二级标签名称 | String | —— |
| helpMessage | 辅助提示信息 | String | —— |
| helpComponentProps | 辅助组件属性 | Object | —— |
| required | 是否必填 | Boolen | false |
| suffix | 后缀 | Boolean |  Number |  Function | —— |
| rules | 校验规则 | Array | [] |
| rulesMessageJoinLabel | 是否将label添加到校验提示信息 | Boolen | —— |
| itemProps | 表单子项属性，与antd-vue中Form.Item属性一致 | Object | —— |
| colProps | Column属性 | Object | —— |
| defaultValue | 默认值 | —— | —— |
| ifShow | 通过v-if控制是否显示 | Boolean | Function | —— |
| show | 通过v-show控制是否显示 | Boolean | Function | —— |
| render | 自定义render form-item标签里的View | Function | String | —— |
| renderColContent | 自定义render表单子项View | Function | String | —— |
| renderCompContent | 自定义render表单组件View | Function | String | —— |
| slot | form-item内插槽名称 | String | —— |
| colSlot | 表单子项插槽名称 | String | —— |
| dynamicDisabled | 动态定义禁用状态 | Boolean | Function | —— |
| dynamicRules | 动态生成表单规则 | Function | —— |



**component**

| 名称 | 说明 |
| --- | --- |
| Input | 输入框 |
| InputGroup | 输入框组合 |
| InputPassword | 密码框 |
| InputSearch | 搜索框 |
| InputNumber | 数字输入框 |
| Select | 选择器 |
| ApiSelect | 接口选择器 |
| SelectOptGroup | 选择器选项分组 |
| TreeSelect | 树形选择器 |
| Transfer | 穿梭框 |
| RadioButtonGroup | 表单单选框组合 |
| RadioGroup | 单选框组合 |
| Checkbox | 多选框 |
| CheckboxGroup | 多选框组合 |
| AutoComplete | 自动完成 |
| Cascader | 级联选择器 |
| DatePicker | 日期选择器 |
| MonthPicker | 月份选择器 |
| RangePicker | 日期区间选择器 |
| WeekPicker | 周选择器 |
| TimePicker | 时间选择器 |
| Switch | 开关 |
| Render | 自定义render |
| Slider | 滑动输入条 |



#### 事件
| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| reset | 重置表单 | function(model) |
| submit | 提交表单 | function(model) |
| register | 注册表单 | function(action) |



#### slot
| 名称 | 说明 |
| --- | --- |
| formHeader | 表单头 |
| formFooter | 表单尾 |
| resetBefore | 重置按钮前 |
| submitBefore | 提交按钮前 |



#### hooks
**示例**
```typescript
<template>
   <BasicForm @register="register" @submit="handleSubmit">
        <template #resetBefore> test </template>
        <template #custom> custom </template>
    </BasicForm>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index'

	export default defineComponent({
    components: { BasicForm },
    setup() {
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
          console.log(values)
        },
        setProps,
      }
    },
  })
</script>
```


**参数**<br />**useForm**
```typescript
const [register, methods] = useForm(formProps)
```
**methods**

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| setProps | 设置表单属性 | function(formProps) |
| updateSchema | 更新schemas配置 | function(formSchemas) |
| resetSchema | 重置schemas是配置 | function(formSchemas) |
| getFieldsValue | 获得表单值 | function() |
| setFieldsValue | 设置表单值 | function(values) |
| resetFields | 重置表单值 | function() |
| scrollToField | 滚动到表单指定项 | function(name,options) |
| removeSchemaByFiled | 根据field删除指定schema | function(fields) |
| appendSchemaByField | 根据field添加指定schema | function(schema,prefixField,first=false) |
| validate | 验证表单 | function(nameList) |
| validateFields | 验证表单值 | function(nameList) |
| clearValidate | 清除表单验证 | function(nameList) |
| submit | 提交 | function(values) |

## 表格
### BasicTable
#### 示例
**基础使用**
> 详见 src/views/component/table/BasicTable.vue



**请求表格**
> 详见 src/views/component/table/FetchTable.vue


<br />**表单表格**
> 详见 src/views/component/table/FormTable.vue

<br />
#### 属性
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableLayout | 表格布局，`auto` `fixed`，与Antd-Vue中Table->tableLayout一致 | String | —— |
| size | 表格大小，`default` `middle`  `small` | String | default  |
| title | 表格标题，与Antd-Vue中Table->title一致 | —— | —— |
| titleHelpMessage | 标题右侧提示 | String | Array | —— |
| striped | 斑马纹 | Boolean | true |
| bordered | 是否显示边框 | Boolean | false |
| showHeader | 是否展示表头 |  |  |
| columns | 列配置，Column继承Antd-Vue中Table->Column属性，详见TableColumn | Array | [] |
| showIndexColumn | 是否显示序列号 | Boolean | true |
| childrenColumnName | 列中含有子列属性名 | String | children |
| indexColumnProps | 序列号列配置，同Column | Object | null |
| actionColumn | 操作列配置，同Column | Object | null |
| ellipsis | 文本超过宽度是否显示。。。 | Boolean | true |
| dataSource | 表格数据 | Array | [] |
| sortFn | 自定义排序方法 | Function | —— |
| filterFn | 排序方法 | Function | —— |
| canResize | 是否自适应高度 | Boolean | true |
| resizeHeightOffset | 自适应高度偏移， 计算结果-偏移量 | Number | 0 |
| maxHeight | 表格滚动最大高度 | Number | —— |
| scroll | 滚动距离 | Object | {x:Number,y:Number} |
| showTableSetting | 是否显示表格设置 | Boolean | false |
| tableSetting | 表格设置配置，详见`TablSetting` | Object | —— |
| rowKey | 行键值 | String | Function |<br />undefined | undefined |
| autoCreateKey | 是否自动生成行键值 | Boolean | true |
| clickToRowSelect | 是否点击行选中 | Boolean | true |
| rowSelection | 行选择配置，与antd-vue中Table->rowSelection配置一致 | Object | null |
| loading | 加载状态 | Boolean | false |
| pagination | 分页配置，详见Antd-Vue中Pagination属性 | Boolen | Object | —— |
| clearSelectOnPageChange | 分页改变的时候清空选项 | Boolean | false |
| useSearchForm | 是否为表单表格 | Boolean | false |
| formConfig | 表单配置 | Object | —— |
| emptyDataIsShowTable | 在开起搜索表单的时候，如果没有数据是否显示表格 | Boolean | true |
| api | 请求接口函数 | Function | —— |
| beforeFetch | 请求之前处理参数 | Function | —— |
| afterFetch | 自定义处理接口返回参数 | Function | —— |
| handleSearchInfoFn | 查询条件请求之前处理 | Function | —— |
| fetchSetting | 请求接口配置，详见`FetchSetting` | Object | —— |
| immediate | 是否立即请求接口 | Boolean | true |
| customHeaderRow | 设置头部行属性，与Antd-Vue中Table->customHeaderRow一致 | Function(column, index) | —— |
| customRow | 设置头部行属性，与Antd-Vue中Table->customRow一致 | Function(record, index) | —— |
| getPopupContainer | 与Antd-Vue中Table-><br />getPopupContainer一致 | —— | —— |
| transformCellText | 与Antd-Vue中Table-><br />transformCellText一致 | —— | —— |
| components | 与Antd-Vue中Table-><br />components一致 | —— | —— |
| footer | 与Antd-Vue中Table-><br />foote一致 | —— | —— |



**TableSetting**

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| redo | 刷新 | Boolean | true |
| size | 密度 | Boolean | true |
| setting | 列设置 | Boolean | true |
| fullScreen | 全屏 | Boolean | false |


<br />**FetchSetting**

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pageField | 请求接口当前页数字段  | String | page |
| sizeField | 每页显示多少条字段  | String | pageSize |
| listField | 请求结果列表字段  | String | items |
| totalField | 请求结果总数字段 | String | total |

<br />
#### 事件
| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| register | 注册表格 | function(tableAction,formAction) |
| fetch-success | 请求成功 | function({items:dataSource,total}) |
| fetch-error | 请求失败 | function(error) |
| selection-change | 选项改变 | function({keys,rows}) |
| row-click | 点击行 | function(record,index,e) |
| row-dbClick | 双击行 | function(record,index,e) |
| row-contextmenu | 右键点击行 | function(record,index,e) |
| row-mouseenter | 鼠标进入行 | function(record,index,e) |
| row-mouseleave | 鼠标离开行 | function(record,index,e) |

#### slot
| 名称 | 说明 |
| --- | --- |
| tableTitle | 表格标题 |

#### hooks
**示例**

**参数**<br />**useTable**
```typescript
const [register, methods] = useTable(tableProps)
```
**methods**

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| setProps | 设置表格属性 | function(formProps) |
| reload | 请求表格 | function(params) |
| redoHeight | 重置表格高度 | function() |
| setLoading | 设置加载状态 | function(loading) |
| getDataSource | 获取dataSource | function() |
| setTableData | 设置dataSource | function(fields) |
| getColumns | 获取columns | function(options) |
| setColumns | 设置columns | function(columns) |
| setPagination | 设置分页信息 | function(info) |
| deleteSelectRowByKey | 删除选择行的键值 | function(nameList) |
| getSelectRowKeys | 获取选择行的键值 | function(nameList) |
| getSelectRows | 获取选择行 | function(nameList) |
| clearSelectedRowKeys | 清除选择行的键值 | function() |
| setSelectedRowKeys | 设置选择行的键值 | function(keys) |
| getPaginationRef | 获取分页信息 | function() |
| getSize | 获取尺寸 | function() |
| updateTableData | 更新表格数据 | function(index,key,value) |
| getRowSelection | 获取表格选项数据 | function() |
| getCacheColumns | 获取持久化columns | function() |
| getForm | 获取表单methods | function() |
| setShowPagination | 设置分页显示 | function(show) |
| getShowPagination | 获取是否显示分页 | function() |

