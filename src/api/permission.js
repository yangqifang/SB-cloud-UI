import request from '@/utils/request'

export function list(num, size) {
  return request({
    url: '/admin/Permission/list',
    method: 'post',
    data: {
      pagenum: num,
      pagesize: size
    }
  })
}

export function delect(id) {
  return request({
    url: '/admin/Permission/delect',
    method: 'post',
    data: {
      id
    }
  })
}

export function save(json) {
  return request({
    url: '/admin/Permission/save',
    method: 'post',
    data: json
  })
}
export function update(json) {
  return request({
    url: '/admin/Permission/update',
    method: 'post',
    data: json
  })
}
