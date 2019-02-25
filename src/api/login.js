import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/oauth/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic c3BkYXRhOnNlY3JldA=='
    },
    params: {
      username,
      password,
      'grant_type': 'password'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/Account/info',
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/oauth/token',
    method: 'delete',
    headers: {
      'Authorization': 'Basic c3BkYXRhOnNlY3JldA=='
    },
    params: {
      'access_token': token
    }
  })
}

export function getMenu() {
  return request({
    url: '/admin/menu/menu',
    method: 'post'
  })
}
