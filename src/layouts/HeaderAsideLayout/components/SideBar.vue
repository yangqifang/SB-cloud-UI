<template>
    <scroll-bar>
        <div class="logo">
            <img src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png" width="40">
            <span class="site-name">SPdata ADMIN</span>
        </div>
        <el-menu
                mode="vertical"
                :show-timeout="200"
                background-color="#00142a"
                text-color="hsla(0, 0%, 100%, .65)"
                active-text-color="#409EFF"
        >
            <template v-for="item in asideMenuConfig">
                <router-link v-if="!item.children" :to="item.url" :key="item.name">
                    <el-menu-item :index="item.url">
                        <i v-if="item.icon" :class="item.icon"></i>
                        <span v-if="item.name" slot="title">{{item.name}}</span>
                    </el-menu-item>
                </router-link>

                <el-submenu v-else :index="item.name || item.url" :key="item.name">
                    <template slot="title">
                        <i v-if="item && item.icon" :class="item.icon"></i>
                        <span v-if="item && item.name" slot="title">{{item.name}}</span>
                    </template>
                    <template v-for="child in item.children" v-if="!child.hidden">
                        <router-link :to="item.url + child.url" :key="child.name">
                            <el-menu-item :index="item.url + child.url">
                                <span v-if="child && child.name" slot="title">{{child.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-submenu>

            </template>
        </el-menu>
    </scroll-bar>
</template>

<script>
    import ScrollBar from './ScrollBar';
    import {asideMenuConfig} from '../../../menuConfig';
    import {get} from '@src/api/Menu'

    export default {
        components: {ScrollBar},
        name: 'SideBar',
        props: {},
        data() {
            return {
                asideMenuConfig,
            };
        },
        created: function () {
            var self = this
            get().then(response => {
                var resul = response.data
                self.asideMenuConfig = resul
                var data = []
                // self.Iteration(resul, data)
            }).catch(error => {
                console.log(error)
            })
        },
        methods: {
            Iteration: (menuData, asideMenu) => {
                var item = {}
                menuData.forEach(function (v, i) {
                    if (v.children) {
                        var children = []
                        item.name = v.name
                        item.path = v.url
                        item.icon = v.icon
                        // vue.Iteration(v.children, children)
                        item.children = children
                        asideMenu.push(item)
                    } else {
                        item.name = v.name
                        item.path = v.url
                        item.icon = v.icon
                        asideMenu.push(item)
                    }
                })
            },
            IterationChildren(children, asideMenuChildren) {
                var item = {}
                children.forEach(function (v, i) {
                    item.name = v.name
                    item.path = v.url
                    item.icon = v.icon
                })
                asideMenuChildren.push(item
                )
            }
        }
    };
</script>

<style lang="scss" scoped>
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64px;
        line-height: 64px;
        background: #002140;
        color: #fff;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        overflow: hidden;
    }

    .site-name {
        margin-left: 10px;
    }

    .sidebar-container {
        box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
        transition: width 0.28s;
        width: 256px !important;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        a {
            display: inline-block;
            width: 100%;
        }
        .el-menu {
            padding-top: 16px;
            width: 100% !important;
            border: none;
        }
        .el-submenu .el-menu-item {
            min-width: 256px !important;
            padding-left: 48px !important;
            background-color: #000c17 !important;
            &:hover {
                color: #fff !important;
            }
        }
        .el-menu-item,
        .el-submenu .el-menu-item {
            &.is-active {
                background-color: #188fff !important;
                color: #fff !important;
            }
        }
        .el-submenu__title i {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.65);
        }
    }
</style>
