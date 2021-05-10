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
| .
├── build # 构建相关脚本
├── mock # 模拟数据
├── public # 静态资源
├── src # 项目代码
│   ├── api #请求相关
│   ├── assets # 静态资源
│   ├── components # 组件
│   ├── styles # 样式
│   ├── enums # 常量，枚举
│   ├── hooks # hooks
│   ├── layouts # 布局
│   ├── main.ts # 入口文件
│   ├── router #路由，菜单等
│   ├── locale #多语言文件
│   ├── settings # 配置文件
│   ├── store # vuex
│   ├── utils # 工具类
│   └── views # 页面
└── types # 类型定义

1234567891011121314151617181920212223 |
| --- |

## Vite配置


## Mock


## 路由及菜单


## 权限
1234567891011121314151617181920212223
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
| suffix | 后缀 | Boolean | Number | Function | —— |
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

## 表格
### BasicTable
#### 示例


#### 属性
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableLayout | 表格布局，auto |  fixed | string，与Antd-Vue中Table->tableLayout一致 | String | —— |
| size | 表格大小，default | middle | small | String | default  |
| title | 表格标题 | VNodeChild | JSX.Element | string | ((data: Recordable) =>string) |  |
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
| scroll | 滚动距离 | Object | {x: Number,y:Number} |
| showTableSetting | 是否显示表格设置 | Boolean | false |
| tableSetting | 表格设置配置 | Object | {
    redo: true,
    size: true,
    setting: true,
    fullScreen: false
 } |
| rowKey | 行键值 | String | Function |
undefined | undefined |
| autoCreateKey | 是否自动生成行键值 | Boolean | true |
| clickToRowSelect | 是否点击行选中 | Boolean | true |
| rowSelection | 行选择配置，与antd-vue中Table->rowSelection配置一致 | Object | null |
| loading | 加载状态 | Boolean | false |
| pagination | 分页配置，详见`Pagination` | Boolen | Object | —— |
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
| getPopupContainer | 与Antd-Vue中Table->
getPopupContainer一致 | —— | —— |
| transformCellText | 与Antd-Vue中Table->
transformCellText一致 | —— | —— |
| components | 与Antd-Vue中Table->
components一致 | —— | —— |
| footer | 与Antd-Vue中Table->
foote一致 | —— | —— |



#### 事件
| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| register | 注册表格 | 
 |
| fetch-success | 请求成功 |  |
| fetch-error | 请求失败 | 
 |
| selection-change | 选项改变 | 
 |
| row-click | 点击行 |  |
| row-dbClick | 双击行 |  |
| row-contextmenu | 右键点击行 |  |
| row-mouseenter | 鼠标进入行 |  |
| row-mouseleave | 鼠标离开行 |  |

#### slot
| 名称 | 说明 |
| --- | --- |
| tableTitle | 表格标题 |

### 



## 
