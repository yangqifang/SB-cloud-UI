import request from '@/utils/request'

export function deptList() {
  return request({
    url: '/admin/dept/deptlist',
    method: 'get'
  })
}

export function save(json) {
  return request({
    url: '/admin/dept/save',
    method: 'post',
    data: json
  })
}

export function update(json) {
  return request({
    url: '/admin/dept/update',
    method: 'post',
    data: json
  })
}
