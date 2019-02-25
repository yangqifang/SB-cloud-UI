import request from '@/utils/request'


export function list(json) {
  return request({
    url: '/admin/sysdict/list',
    method: 'post',
    data: json
  })
}

export function save(json) {
  return request({
    url: '/admin/sysdict/save',
    method: 'post',
    data: json
  })
}

export function update(json) {
  return request({
    url: '/admin/sysdict/update',
    method: 'post',
    data: json
  })
}
