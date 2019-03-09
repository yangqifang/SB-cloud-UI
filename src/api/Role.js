import request from '@/utils/request'

export function save(json) {
  return request({
    url: '/admin/role/save',
    method: 'post',
    data: json
  })
}

export function delect(id) {
  return request({
    url: '/admin/role/delect',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function roleinfo() {
  return request({
    url: '/admin/Account/roleinfo',
    method: 'get'
  })
}

export function Permission() {
  return request({
    url: '/admin/Permission/get',
    method: 'get'
  })
}

export function getRolemenu(id) {
  return request({
    url: '/admin/role/rolemenu',
    method: 'post',
    params: {
      id
    }
  })
}

export function getRolePermission(id) {
  return request({
    url: '/admin/Permission/RoleIdPermission',
    method: 'post',
    params: {
      id
    }
  })
}

export function UpdateMenu(Json) {
  return request({
    url: '/admin/role/UpdateMenu',
    method: 'post',
    data: Json
  })
}

export function UpdatePermission(json) {
  return request({
    url: '/admin/role/UpdatePermission',
    method: 'post',
    data: json
  })
}
