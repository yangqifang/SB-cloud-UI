import service from '@src/axios'


export function roleinfo() {
    return service({
        url: '/admin/Account/roleinfo',
        method: 'get'
    })
}

export function save(Role) {
    return service({
        url: '/admin/role/save',
        method: 'post',
        data: Role
    })
}

export function delect(Role) {
    return service({
        url: '/admin/role/delect',
        method: 'post',
        data: Role
    })
}