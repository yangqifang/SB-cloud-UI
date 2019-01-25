<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tree :data="DeptTree" :props="DeptProps" ref="deptTree"
                 show-checkbox :default-expand-all="true"
                 :check-strictly="true" node-key="id" @check="checkTreechange"
        />
      </el-col>
      <el-col :span="20">
        <el-button type="primary" size="small" v-permission="'ROLE_ADMIN'" @click="addButtonClick">添加</el-button>
        <el-table :data="AccountData">
          <el-table-column prop="id" label="ID">
          </el-table-column>
          <el-table-column prop="username" label="账户名">
          </el-table-column>
          <el-table-column prop="givename" label="用户名">
          </el-table-column>
          <el-table-column prop="mailbox" label="邮箱">
          </el-table-column>
          <el-table-column prop="country" label="地区">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" v-permission="'ROLE_ADMIN'" @click="TableUpdateButton(scope.row)">
                修改
              </el-button>
              <el-button type="danger" size="small" v-permission="'ROLE_ADMIN'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       @size-change="sizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="pagenum"
                       :page-sizes="[5, 10, 20, 30]"
                       :page-size=pageSize
                       layout="sizes, prev, pager, next"
                       :total=total>
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="showdialog">
      <el-form ref="AccountFrom" :model="AccountFrom" :rules="AccountFromRules" label-width="80px">
        <el-form-item label="账户名:" prop="username">
          <el-input v-model="AccountFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="AccountFrom.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="givename">
          <el-input v-model="AccountFrom.givename"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="mailbox">
          <el-input v-model="AccountFrom.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="地区:" prop="country">
          <el-input v-model="AccountFrom.country"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="rolelist">
          <el-checkbox-group v-model="AccountFrom.rolelist">
            <el-checkbox v-for="(item,index) in rolelist" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="部门:">
          <el-tree :data="DeptTree" :props="DeptProps" ref="deptFromeTree"
                   show-checkbox :default-expand-all="true" :default-checked-keys="[AccountFrom.deptId]"
                   :check-strictly="true" node-key="id" @check="checkFromTreechange"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showdialog = false">取 消</el-button>
          <el-button type="primary" @click="AccountSave" v-if="showSavebutton">保存</el-button>
        <el-button type="primary" v-if="!showSavebutton" @click="updateAccount">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { Page, save, delect, update } from '@/api/User'
  import { roleinfo } from '@/api/Role'
  import { deptList } from '@/api/Dept'

  export default {
    name: 'index',
    data() {
      return {
        AccountData: [],
        DeptTree: null,
        DeptProps: { label: 'name' },
        checkedDeptId: null,
        //表单
        AccountFrom: {
          rolelist: [],
          deptId: null
        },
        //表单验证规则
        AccountFromRules: {
          username: [
            { required: true, message: '账户名不能为空', trigger: 'blur' },
            { max: 15, min: 6, message: '账户名长度6-15个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { max: 15, min: 6, message: '密码长度6-15个字符', trigger: 'blur' }
          ],
          givename: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { max: 15, min: 6, message: '用户名长度6-15个字符', trigger: 'blur' }
          ],
          mailbox: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { max: 15, min: 6, message: '邮箱长度4-15个字符', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '地区不能为空', trigger: 'blur' },
            { max: 15, min: 6, message: '地区长度2-15个字符', trigger: 'blur' }
          ],
          rolelist: [
            { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
          ]
        },
        rolelistModel: [],
        rolelist: [],
        pageSize: 5,
        pagenum: 1,
        total: 0,
        showdialog: false,
        showSavebutton: true,
        dialogTitle: '添加用户'
      }
    },
    created() {
      this.getAccountData(this.pagenum, this.pageSize)
      this.getRoleinfo()
      this.getDeptTree()
    },
    methods: {
      //获取部门树
      getDeptTree() {
        deptList().then(res => {
          let { data } = res
          this.DeptTree = data
        }).catch(error => {
          console.log(error)
        })
      },
      //部门树被选中的事件
      checkTreechange(data, node) {
        this.checkedDeptId = data.id
        this.$refs['deptTree'].setCheckedKeys([data.id])
        this.getAccountData(this.pagenum, this.pageSize)
      },
      //获取角色信息
      getRoleinfo() {
        roleinfo().then(res => {
          var { code, data, message } = res
          this.rolelist = data
        }).catch(error => {
          console.log(error)
        })
      },
      getAccountData(pagenum, pagesize) {
        var json = {
          pagenum: pagenum,
          pagesize: pagesize
        }
        if (this.checkedDeptId) {
          json['parament'] = {
            deptId: this.checkedDeptId
          }
        }
        Page(json).then(res => {
          var { code, data, message } = res
          this.total = data.total
          this.AccountData = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      sizeChange(val) {
        this.pageSize = val
        this.getAccountData(this.pagenum, this.pageSize)
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.getAccountData(this.pagenum, this.pageSize)
      },
      addButtonClick() {
        this.showdialog = true
        this.showSavebutton = true
        this.dialogTitle = '添加账户'
      },
      TableUpdateButton(row) {
        this.AccountFrom = row
        var rolelist = []
        row.roles.forEach(function(item) {
          rolelist.push(item.id)
        })
        this.AccountFrom.rolelist = rolelist
        console.log(this.AccountFrom.rolelist)
        this.showdialog = true
        this.showSavebutton = false
        this.dialogTitle = '修改账户'
      },
      /**
       * 添加账户
       * @constructor
       */
      AccountSave() {
        this.$refs['AccountFrom'].validate((valid) => {
          if (valid) {
            this.updateFromData(this.AccountFrom)
            save(this.AccountFrom).then(res => {
              var { code, data, message } = res
              if (data) {
                this.$message({
                  message: message,
                  type: 'success'
                })
                this.getAccountData(this.pagenum, this.pageSize)
                this.showdialog = false
              } else {
                this.$message.error(message)
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      },
      //修改表单数据
      updateFromData(from) {
        var rolelist = []
        from.rolelist.forEach(function(item, index) {
          rolelist.push({ id: item })
        })
        from.roles = rolelist
      },
      delectAccount(id) {
        delect(id).then(res => {
          var { code, data, message } = res
          if (data) {
            this.$message({
              message: message,
              type: 'success'
            })
          } else {
            this.$message.error(message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      updateAccount() {
        this.$refs['AccountFrom'].validate((valid) => {
          if (valid) {
            this.updateFromData(this.AccountFrom)
            update(this.AccountFrom).then(res => {
              var { code, data, message } = res
              if (data) {
                this.$message({
                  message: message,
                  type: 'success'
                })
                this.getAccountData(this.pagenum, this.pageSize)
                this.showdialog = false
              } else {
                this.$message.error(message)
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      },
      //添加修改表单中的部门树 点击事件
      checkFromTreechange(data, node) {
        this.AccountFrom.deptId = data.id
        this.$refs['deptFromeTree'].setCheckedKeys([data.id])
        console.log(this.AccountFrom.deptId)
      }
    }
  }
</script>

<style scoped>

</style>
