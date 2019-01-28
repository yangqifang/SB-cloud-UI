<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <Dept v-model="checkedDeptId" :DeptData="DeptTree" :props="DeptProps"></Dept>
        <p>{{checkedDeptId}}</p>
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
    <el-dialog :title="dialogTitle" :visible.sync="showdialog" @close="closeDialog" v-permission="'ROLE_ADMIN'">
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
          <el-checkbox-group v-model="AccountFrom.rolelist" ref="checkboxGourp">
            <el-checkbox v-for="(item,index) in rolelist" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="部门:">
          <Dept v-model="AccountFrom.deptId" :DeptData="DeptTree" :props="DeptProps"></Dept>
          <p>{{AccountFrom.deptId}}</p>
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
  import {Page, save, delect, update} from '@/api/User'
  import {roleinfo} from '@/api/Role'
  import {deptList} from '@/api/Dept'
  import Dept from '../Dept/Dept'

  export default {
    name: 'index',
    components: {Dept},
    data() {
      return {
        AccountData: [],
        DeptTree: null,
        DeptProps: {label: 'name'},
        checkedDeptId: null,
        //表单
        AccountFrom: {
          rolelist: [],
          deptId: null
        },
        //表单验证规则
        AccountFromRules: {
          username: [
            {required: true, message: '账户名不能为空', trigger: 'blur'},
            {max: 15, min: 6, message: '账户名长度6-15个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {max: 15, min: 6, message: '密码长度6-15个字符', trigger: 'blur'}
          ],
          givename: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {max: 15, min: 2, message: '用户名长度6-15个字符', trigger: 'blur'}
          ],
          mailbox: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {max: 15, min: 6, message: '邮箱长度4-15个字符', trigger: 'blur'}
          ],
          country: [
            {required: true, message: '地区不能为空', trigger: 'blur'},
            {max: 15, min: 6, message: '地区长度2-15个字符', trigger: 'blur'}
          ],
          rolelist: [
            {type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change'}
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
          let {data} = res
          this.DeptTree = data
        }).catch(error => {
          console.log(error)
        })
      },
      //获取角色信息
      getRoleinfo() {
        roleinfo().then(res => {
          var {code, data, message} = res
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
          var {code, data, message} = res
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
        this.AccountFrom.rolelist = row.roles
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
              var {code, data, message} = res
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
        from.rolelist.forEach(function (item, index) {
          rolelist.push({id: item})
        })
        from.roles = rolelist
      },
      delectAccount(id) {
        delect(id).then(res => {
          var {code, data, message} = res
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
              var {code, data, message} = res
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
      closeDialog() {
        console.log('closeDialog')
        this.AccountFrom = {
          rolelist: [],
        }
      }
    },
    watch: {
      'checkedDeptId': function (newval) {
        this.getAccountData(this.pagenum, this.pageSize)
      }
    }
  }
</script>

<style scoped>

</style>
