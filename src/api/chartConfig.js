import request from '@/utils/request'


export function createfile(json) {
  return request({
    url: '/admin/chart/create',
    method: 'post',
    data: json
  })
}

export function tet() {
}
