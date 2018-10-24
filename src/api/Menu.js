import service from '@src/axios'


export function get() {
    return service({
        url: '/admin/menu/menu',
        method: 'post'
    })
}

export function update(menu) {
    return service({
        url: '/admin/menu/update',
        method: 'post',
        data: menu
    })
}

export function delect(id) {
    return service({
        url: '/admin/menu/delect',
        method: 'post',
        data: {
            'id': id
        }
    })
}

export function save(savefrom) {
    return service({
        url: '/admin/menu/save',
        method: 'post',
        data: savefrom
    })
}