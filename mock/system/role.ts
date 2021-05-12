import { MockMethod } from 'vite-plugin-mock'
import { resultPageSuccess } from '../_util'

const roleList = (() => {
  const result: any[] = []
  for (let index = 0; index < 4; index++) {
    result.push({
      id: `${index}`,
      orderNo: `${index + 1}`,
      roleName: ['超级管理员', '管理员', '文章管理员', '普通用户'][index],
      roleValue: '@first',
      createTime: '@datetime',
      remark: '@cword(10,20)',
      'status|1': [0, 1],
    })
  }
  return result
})()

export default [
  {
    url: '/basic-api/system/getRoleListByPage',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, roleList)
    },
  },
] as MockMethod[]
