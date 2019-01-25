<template>
  <div class="layout">
    <el-button type="primary" size="small" @click="showSaveDialog" v-permission="'ROOT'">添加</el-button>
    <el-table
      :data="tabledata">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showUpdateDialog(scope.row)" v-permission="'ROOT'">修改</el-button>
          <el-button type="danger" size="small" @click="delectRow(scope.row)" v-permission="'ROOT'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹出框-->
    <el-pagination class="layout" background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage"
                   :page-sizes="[5, 10, 20, 30]"
                   :page-size=pageSize
                   layout="sizes, prev, pager, next"
                   :total=total>
    </el-pagination>
    <el-dialog :visible.sync="Visible" :title="title">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="closeDialog">取 消</el-button>
         <el-button type="primary" v-if="isShowSaveButton" @click="SavePermission">添加</el-button>
        <el-button type="primary" v-if="isShowUpdateButton" @click="updatePerission">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { list, delect, save, update } from '@/api/permission'

  export default {
    name: 'index',
    data() {
      return {
        tabledata: [],
        currentPage: 1,
        total: 0,
        pageSize: 5,
        form: {
          name: '',
          value: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
            { max: 8, message: '长度最多 8 个字符', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入权限值', trigger: 'blur' },
            { max: 16, message: '长度最多 16 个字符', trigger: 'blur' }
          ]
        },
        Visible: false,//弹出框
        title: '添加',
        isShowUpdateButton: false,//是否显示修改按钮
        isShowSaveButton: true //是否显示添加按钮
      }
    },
    created() {
      this.getDate(this.currentPage, this.pageSize)
    },
    methods: {
      getDate(num, size) {
        list(num, size).then(res => {
          this.tabledata = res.data.list
          this.total = res.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getDate(this.currentPage, this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getDate(this.currentPage, this.pageSize)
      },
      delectRow(row) {
        this.$confirm('此操作将永久删除' + row.name + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delect(row.id).then(res => {
            this.$notify({
              message: res.message
            })
            this.getDate(this.currentPage, this.pageSize)
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      //显示添加框
      showSaveDialog() {
        this.isShowUpdateButton = false
        this.isShowSaveButton = true
        this.Visible = true
        this.title = '添加'
      },
      //显示编辑框
      showUpdateDialog(row) {
        this.isShowUpdateButton = true
        this.isShowSaveButton = false
        this.Visible = true
        this.title = '编辑'
        this.form = row
      },
      //关闭
      closeDialog() {
        this.Visible = false
        this.form = {}
      },
      SavePermission() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            save(this.form).then(res => {
              this.$notify({
                message: res.message
              })
              this.getDate(this.currentPage, this.pageSize)
              this.closeDialog()
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      },
      updatePerission() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            update(this.form).then(res => {
              let { code, message, data } = res.data
              this.getDate(this.currentPage, this.pageSize)
              this.closeDialog()
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .layout {
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 15px;
  }
</style>
