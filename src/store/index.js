import Vue from 'vue';
import Vuex from 'vuex';
import {getToken, setToken, removeToken} from '@src/util/token'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        User: {
            token: getToken(),
            name: '',
            //头像
            avatar: '',
            Permission: []
        }
    },
    getters: {
        User: state => state.User
    }
})

export default store