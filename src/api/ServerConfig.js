import request from '@/utils/request'

export function list(json) {
  return request({
    url: '/admin/server/config/list',
    method: 'post',
    data: json
  })
}

export function save(json) {
  return request({
    url: '/admin/server/config/save',
    method: 'post',
    data: json
  })
}

export function update(json) {
  return request({
    url: '/admin/server/config/update',
    method: 'post',
    data: json
  })
}

export function delect(id) {
  return request({
    url: '/admin/server/config/delect',
    method: 'post',
    data: {
      id: id
    }
  })
}
