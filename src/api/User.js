import request from '@/utils/request'

export function Page(json) {
  return request({
    url: '/admin/Account/page',
    method: 'post',
    data: json
  })
}

export function save(from) {
  return request({
    url: '/admin/Account/save',
    method: 'post',
    data: from
  })
}

export function delect(id) {
  return request({
    url: '/admin/Account/delect',
    method: 'post',
    params: id
  })
}
export function update(from) {
  return request({
    url: '/admin/Account/update',
    method: 'post',
    data: from
  })
}
