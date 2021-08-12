import { MockMethod } from 'vite-plugin-mock'
import { resultPageSuccess, resultSuccess } from '../_util'

const organizationList = (() => {
  const result: any[] = []
  for (let index = 0; index < 15; index++) {
    result.push({
      id: `${index}`,
      orgCode: `${index + 1}`,
      orgName: '@cword(2,8)',
      parentOrgName: '@cword(2,8)',
      'test|1': [1, 2, 3, 4],
      'status|1': ['0', '1'],
      createAccountName: '@cword(2,3)',
    })
  }
  return result
})()

const organizationTreeList = (() => {
  const result: any[] = []
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      orgName: ['A大区', 'B大区', 'C大区'][index],
      orgCode: index + 1,
      orgId: index,
      'checked|1': [0, 1],
      parentId: '',
      icon: 'parent_org|svg',
      children: (() => {
        const children: any[] = []
        for (let j = 0; j < 2; j++) {
          children.push({
            id: `${index}-${j}`,
            orgName: ['和林基地大区工厂', '包头基地工厂'][j],
            orgCode: j + 1,
            orgId: j,
            'checked|1': [0, 1],
            parentId: index,
            icon: 'org|svg',
            children: undefined,
          })
        }
        return children
      })(),
    })
  }
  return result
})()

export default [
  {
    url: '/basic-api/system/getOrganizationListByPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, organizationList)
    },
  },
  {
    url: '/basic-api/system/organizationTreeList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(organizationTreeList)
    },
  },
] as MockMethod[]
