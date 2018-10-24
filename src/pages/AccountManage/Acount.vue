<template>
    <div class="Acount-page">
        <el-button type="primary" icon="el-icon-plus"  @click="showAddDialog">添加</el-button>
        <el-table :data="AccountData" style="width: 100%">
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="username" label="用户名称">
            </el-table-column>
            <el-table-column prop="givename" label="姓名">
            </el-table-column>
            <el-table-column prop="country" label="国家">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row._del" size="mini" type="primary" @click="EditForm(scope.row)">编辑
                    </el-button>
                    <el-button v-if="!scope.row._del" size="mini" type="danger" @click="Banned(scope.row.id)">封禁
                    </el-button>
                    <el-button v-if="scope.row._del" size="mini" type="danger" @click="Cancelban(scope.row.id)">取消
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :background="true" layout="prev, pager, next" :total="total" :page-sizes=[2,10,20,30]
                       :page-size="PageSize" @current-change="CurrentChange">
        </el-pagination>
        <AddAccount :ifShowAccount="ifShowAccount" @closeAddAccount="closeDialog"></AddAccount>
    </div>
</template>

<script>
    import {findPage} from '@src/api/Account'
    import AddAccount from "./components/AddAccount";

    export default {
        name: "Acount",
        components: {AddAccount},
        data() {
            return {
                ifShowAccount: false,
                AccountData: [],
                account: {},
                total: 0,
                PageSize: 10
            };
        },
        created() {
            this.findAccountPage(0, this.PageSize)
        },
        methods: {
            findAccountPage(PageNum, PageSize) {
                findPage(PageNum, PageSize).then(response => {
                    this.AccountData = response.data.list
                    this.total = response.data.total
                    console.log(this.total)
                }).catch(error => {
                    console.log(error)
                })
            },
            EditForm(row) {
                console.log(row)
            },
            Banned(id) {
                console.log(id)
            },
            Cancelban(id) {
                console.log(id)
            },
            showAddDialog() {
                this.ifShowAccount = true
            },
            closeDialog() {
                this.ifShowAccount = false;
            },
            CurrentChange(pagenum) {
                this.findAccountPage(pagenum, this.PageSize)
            }
        }
    }
</script>

<style scoped>

</style>