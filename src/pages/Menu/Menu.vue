<template>
    <div class="Menu-page" style="width: 70%">
        <el-row :gutter="80">
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <span>菜单列表</span>
                        <el-button size="mini" @click="showMenuDialog(null)" style="float: right" type="success">添加</el-button>
                    </div>
                    <el-tree :data="treedata" show-checkbox node-key="id" :check-change="true"
                             :props="props" @node-click="nodeclick" @check-change="checkchange">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                          <el-button type="text" size="mini" @click="() => showMenuDialog(data.id)">添加</el-button>
                          <el-button type="text" size="mini" @click="() => remove(data)">Delete</el-button>
                        </span>
                      </span>
                    </el-tree>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card>
                    <div slot="header">
                        <span>编辑</span>
                    </div>
                    <el-form ref="form" :model="MenuFrom" label-width="80px">
                        <el-form-item label="菜单名称:">
                            <el-input v-model="MenuFrom.name"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单URL:">
                            <el-input v-model="MenuFrom.url"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单图标:">
                            <el-input v-model="MenuFrom.icon"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单排序:">
                            <el-input v-model="MenuFrom.sort"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="UpdateMenu">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
                title="添加"
                :visible.sync="ifshowDialog"
                width="30%"
                center>
            <el-form ref="form" :model="saveFrom" label-width="80px">
                <el-form-item label="菜单名称:">
                    <el-input v-model="saveFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单URL:">
                    <el-input v-model="saveFrom.url"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标:">
                    <el-input v-model="saveFrom.icon"></el-input>
                </el-form-item>
                <el-form-item label="菜单排序:">
                    <el-input v-model="saveFrom.sort"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {get, update, delect, save} from '@src/api/Menu'

    export default {
        name: "Menu",
        data() {
            return {
                treedata: [],
                MenuFrom: {},
                saveFrom: {},
                props: {//el-tree 默认为name
                    label: 'name'
                },
                MenuDialogData: {},
                ifshowDialog: false,
                superior: 0
            }
        },
        created() {
            this.get()
        },
        methods: {
            get() {
                get().then(response => {
                    this.treedata = response.data
                }).catch(error => {
                    console.log(error)
                })
            },
            nodeclick(data) {
                this.MenuFrom = data
            },
            checkchange(data, node) {
                this.MenuFrom = data
            },
            UpdateMenu() {
                var menufrom = this.MenuFrom
                update(menufrom).then(response => {
                    this.$notify({
                        title: '操作成功',
                        message: response.message,
                        type: 'success'
                    })
                }).catch(error => {
                    console.log(error)
                })
            },
            showMenuDialog(superior) {
                this.ifshowDialog = true
                console.log(superior)
                if (superior) {
                    this.saveFrom.superior = superior
                }
            },
            save() {
                console.log(this.saveFrom)
                save(this.saveFrom).then(response => {
                    this.$notify({
                        title: '操作成功',
                        message: response.message,
                        type: 'success'
                    })
                }).catch(error => {
                    console.log(error)
                })
            },
            remove(data) {
                console.log(data)
                delect(data.id).then(response => {
                    this.$notify({
                        title: '操作成功',
                        message: response.message,
                        type: 'success'
                    })
                    this.get()
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>