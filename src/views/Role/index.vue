<template>
  <div>
    <el-row :gutter="20" style="margin-top: 15px">
      <el-col :span="8">
        <p>角色列表:
          <el-button type="primary" icon="el-icon-plus" @click="showDialog" size="mini" circle></el-button>
        </p>
        <el-radio-group v-model="checkboxRole" :max="1" @change="RoleChange">
          <el-radio v-for="(item,key) in roleList" :key="key"
                    :label="item.id">{{item.name}}
          </el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="8">
        <p>菜单列表:</p>
        <el-tree :data="treeMenu" ref="menuTree"
                 node-key="id"
                 :props="treeMenuprops"
                 :show-checkbox="true"
                 :default-expand-all="true">
        </el-tree>
        <el-button class="updateButton" type="primary" size="mini" @click="updateRoleMenu">更新</el-button>
      </el-col>
      <el-col :span="8">
        <p>权限列表:</p>
        <el-checkbox-group v-model="checkPermission">
          <el-checkbox v-for="(item,key) in permissionList"
                       :label="item.id" :key="key">{{item.name}}
          </el-checkbox>
        </el-checkbox-group>
        <el-button class="updateButton" type="primary" size="mini" @click="updateCheckPermission">更新</el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加角色" :visible.sync="showSaveDialog" label-width="80px"
               width="30%">
      <el-form :modal="SaveFrom" ref="savefrom">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="SaveFrom.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showSaveDialog = false;SaveFrom={}">取消</el-button>
        <el-button type="primary" @click="SaveRole">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {roleinfo, Permission, getRolemenu, getRolePermission, UpdateMenu, UpdatePermission, save} from '@/api/Role'
  import {getMenu} from '@/api/login'

  export default {
    name: 'index',
    data() {
      return {
        roleList: [],
        checkboxRole: null,
        treeMenu: [],
        treeMenuprops: {
          label: 'title',
          children: 'children'
        },
        permissionList: [],
        checkPermission: [],
        showSaveDialog: false,
        SaveFrom: {
          name: ''
        }
      }
    },
    created() {
      this.getRoleinfo()
      this.getMenuData()
      this.getPermission()
    },
    methods: {
      getRoleinfo() {
        roleinfo().then(res => {
          this.roleList = res.data
        }).catch(error => {
          console.log(error)
        })
      },
      getMenuData() {
        getMenu().then(res => {
          this.treeMenu = res.data
        }).catch(error => {
          console.log(error)
        })
      },
      getPermission() {
        Permission().then(res => {
          this.permissionList = res.data
        }).catch(error => {
          console.log(error)
        })
      },
      getThisRoleMenu(roleid) {
        getRolemenu(roleid).then(res => {
          this.$refs.menuTree.setCheckedKeys(res.data)
        }).catch(error => {
          console.log(error)
        })
      },
      getThisRolePermission(id) {
        getRolePermission(id).then(res => {
          var permissionid = []
          res.data.forEach(item => {
            permissionid.push(item.id)
          })
          this.checkPermission = permissionid
        }).catch(error => {
          console.log(error)
        })
      },
      RoleChange(value) {
        this.checkboxRole = value
        /**
         * 清空
         * @type {Array}
         */
        this.checkPermission = []
        this.$refs.menuTree.setCheckedKeys([])
        /**
         * 获取选中角色的菜单与权限信息
         */
        this.getThisRoleMenu(this.checkboxRole)
        this.getThisRolePermission(this.checkboxRole)
      },
      updateRoleMenu() {
        if (this.checkboxRole) {
          var json = {
            RoleId: this.checkboxRole,
            MenuId: this.$refs.menuTree.getCheckedKeys()
          }
          UpdateMenu(json).then(res => {
            this.$message({message: res.message, type: 'success'})
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$message({message: '你还没选择角色', type: 'warning'})
        }
      },
      updateCheckPermission() {
        if (this.checkboxRole) {
          var json = {
            PermissionId: this.checkPermission,
            RoleId: this.checkboxRole
          }
          UpdatePermission(json).then(res => {
            this.$message({message: res.message, type: 'success'})
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$message({message: '你还没选择角色', type: 'warning'})
        }
      },
      showDialog() {
        this.showSaveDialog = !this.showSaveDialog
      },
      SaveRole() {
        save(this.SaveFrom).then(res => {
          console.log(res)
          this.showSaveDialog = false
        }).catch(error => {
          console.log(error)
          this.showSaveDialog = false
        })
      }
    }
  }
</script>

<style scoped>
  .updateButton {
    margin-top: 15px;
  }
</style>
