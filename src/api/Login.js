import service from '../axios'

export default function Login(username, password) {
    return service({
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