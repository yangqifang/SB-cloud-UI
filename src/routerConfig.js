// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideLayout from './layouts/HeaderAsideLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const routerConfig = [
    {
        path: '/',
        layout: HeaderAsideLayout,
        component: Dashboard,
        children: [
            {
                path: '/dashboard/analysis',
                layout: HeaderAsideLayout,
                component: Dashboard,
            },
            {
                path: '/dashboard/monitor',
                layout: HeaderAsideLayout,
                component: NotFound,
            },
            {
                path: '/dashboard/workplace',
                layout: HeaderAsideLayout,
                component: NotFound,
            },
        ],
    },
    {
        path: '/login',
        layout: Login,
        component: Login,
    },
    {
        path: '/systemMG/system/account',
        layout: HeaderAsideLayout,
        component: () => import("@page/AccountManage"),
    },
    {
        path: '/systemMG/system/menu',
        layout: HeaderAsideLayout,
        component: () => import("@page/Menu"),
    },
    {
        path: '/systemMG/system/role',
        layout: HeaderAsideLayout,
        component: () => import('@page/Role')
    },
    {
        path: '*',
        layout: HeaderAsideLayout,
        component: NotFound,
    },
];

export default routerConfig;
