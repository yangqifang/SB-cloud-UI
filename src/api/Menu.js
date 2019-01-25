import request from '@/utils/request'

export function save(menu) {
  return request({
    url: '/admin/menu/save',
    method: 'post',
    data: menu
  })
}

export function delect(delectjson) {
  return request({
    url: '/admin/menu/delect',
    method: 'post',
    data: delectjson
  })
}

export function update(menu) {
  return request({
    url: '/admin/menu/update',
    method: 'post',
    data: menu
  })
}
