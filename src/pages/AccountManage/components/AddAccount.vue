<template>
    <el-dialog :visible.sync="ifShowAccount" title="添加账户" :before-close="close" :open="open">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        <span>填写账户</span>
                    </div>
                    <el-input placeholder="账户姓名" v-model="User.givename">
                    </el-input>
                    <el-input placeholder="请输入账户名称" v-model="User.username">
                    </el-input>
                    <el-input placeholder="请输入账户密码" v-model="User.password" type="password">
                    </el-input>
                    <el-input placeholder="重复输入密码" v-model="User.password" type="password">
                    </el-input>
                    <el-input placeholder="邮箱" v-model="User.mailbox">
                    </el-input>
                    <el-select v-model="User.country" placeholder="请选择地区">
                        <el-option v-for="(item,index) in country" :value="item.en_name" :key="index"
                                   :label="item.zh_name">
                        </el-option>
                    </el-select>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        <span>选择角色</span>
                    </div>
                    <el-checkbox-group v-model="checkedRole">
                        <el-checkbox v-for="(role,index) in roles" :key="index" :label="role.id">{{role.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-card>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="add">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {roleinfo, save} from '@src/api/Account'

    export default {
        name: "AddAccount",
        props: {
            ifShowAccount: Boolean
        },
        data() {
            return {
                User: {
                    username: '',
                    password: '',
                    givename: '',
                    mailbox: '',
                    country: '',
                    roles: []
                },
                country: [
                    {
                        zh_name: '中国',
                        en_name: 'china'
                    }
                ],
                roles: [],
                checkedRole: []
            }
        },
        created() {
            roleinfo().then(response => {
                this.roles = response.data
                console.log(this.roles)
            }).catch(error => {
                console.log(error)
            })
        },
        methods: {
            add() {
                var role = [];
                this.checkedRole.forEach(function (item, index) {
                    role.push({
                        id: item
                    })
                })
                this.User.roles = role
                save(this.User).then(response => {
                    this.$message({
                        showClose: true,
                        message: response.message,
                        type: 'success'
                    })
                    this.close();
                }).catch(error => {
                    console.log(error)
                    this.close();
                })
            },
            close() {
                this.$emit('closeAddAccount')
            },
            open() {
                console.log("open")
            }
        }
    }
</script>

<style scoped>

</style>