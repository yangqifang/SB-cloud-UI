import axios from 'axios'
import store from "../store";
import {Message, MessageBox} from 'element-ui'

const service = axios.create({
    baseURL: 'http://106.12.80.211:8080/',
    timeout: 5000
})
service.interceptors.request.use(
    config => {
        if (store.getters.User.token) {
            config.params = {
                ...config.params,
                access_token: store.state.User.token
            }
        }
        return config;
    }
)

service.interceptors.response.use(
    response => {
        const resul = response.data;
        if (resul.code !== 2000) {
            Message({
                message: resul.message,
                type: 'warning'
            })
        } else {
            return response.data;
        }
    },
    error => {
        const resul = error.response.data
        Message({
            message: resul.message + "code " + resul.code,
            type: 'warning'
        })
    }
)
export default service