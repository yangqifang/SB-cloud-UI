import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    if (store.getters.User.token || to.path == '/login') {
        next();
    } else {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        });
    }
})

var app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
