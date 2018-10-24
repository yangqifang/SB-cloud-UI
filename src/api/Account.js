import service from '@src/axios'


export function findPage(pagenum, pagesize) {
    return service({
        url: '/admin/Account/page',
        method: 'post',
        params: {
            pagenum,
            pagesize
        }
    })
}

export function info() {
    return service({
        url: '/admin/Account/info',
        method: 'get'
    })
}

export function roleinfo() {
    return service({
        url: '/admin/Account/roleinfo',
        method: 'get'
    })
}

export function save(User) {
    return service({
        url: '/admin/Account/save',
        method: 'post',
        data: User
    })
}