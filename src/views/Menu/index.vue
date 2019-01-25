<template>
  <div>
    <el-row style="margin-top: 30px" :gutter="20">
      <el-col :span="12">
        <el-row>
          <el-button type="primary" size="small" @click="saveClick">添加</el-button>
          <el-button type="danger" size="small" @click="deleteMenu">删除</el-button>
        </el-row>
        <el-tree :data="allTreeMenu" style="margin-top: 15px"
                 :props="treeprops"
                 :default-expand-all="true"
                 @node-click="TreeMenuCurrentNode"
        >
        </el-tree>
      </el-col>
      <el-col :span="12">
        <el-form ref="menuFrom" :rules="FromRules" :model="menuFrom">
          <el-form-item label="上级菜单">
            <el-input v-model="menuFrom.supername" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="menuFrom.title"></el-input>
          </el-form-item>
          <el-form-item label="菜单地址" prop="path">
            <el-input v-model="menuFrom.path"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="menuFrom.icon"></el-input>
          </el-form-item>
          <el-form-item label="组件路径">
            <el-input v-model="menuFrom.component"></el-input>
          </el-form-item>
          <el-form-item label="转发地址">
            <el-input v-model="menuFrom.redirect"></el-input>
          </el-form-item>
          <el-form-item label="排序值" prop="sort">
            <el-input v-model="menuFrom.sort"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="!menuFrom.id" @click="save('menuFrom')">保存</el-button>
            <el-button type="primary" v-if="menuFrom.id" @click="updatemenu">更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getMenu } from '@/api/login'
  import { save, delect, update } from '@/api/Menu'

  export default {
    name: 'index',
    data() {
      return {
        allTreeMenu: [],
        treeprops: {
          label: 'title',
          children: 'children'
        },
        menuFrom: {
          superior: 0,
          supername: '',
          name: ''
        },
        FromRules: {
          path: [
            { required: true, message: '请输入菜单路径', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入菜单图标', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请输入菜单排序值', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      getMenu().then(res => {
        this.allTreeMenu = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      TreeMenuCurrentNode(node) {
        this.menuFrom = node
      },
      saveClick() {
        if (this.menuFrom.id) {
          var supername = this.menuFrom.name
          var superior = this.menuFrom.id
          this.menuFrom = {}
          this.menuFrom.supername = supername
          this.menuFrom.superior = superior
          console.log(this.menuFrom)
        } else {
          this.menuFrom.supername = '顶级节点'
          console.log(this.menuFrom)
        }
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.menuFrom)
            save(this.menuFrom).then(res => {
              console.log(res)
            }).catch(error => {
              console.log(error)
            })
          } else {
            return false
          }
        })
      },
      deleteMenu() {
        if (this.menuFrom.id) {
          this.$confirm('此操作将删除该菜单(' + this.menuFrom.title + '),想要恢复要手动修改数据库, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var delectJson = {
              id: this.menuFrom.id
            }
            delect(delectJson).then(res => {
              if (res.data) {
                this.$message({ message: '删除成功', type: 'success' })
              } else {
                this.$message.error('删除失败')
              }
            }).catch(error => {
              console.log(error)
            })
          }).catch(() => {

          })
        } else {
          this.$message({
            message: '当前没有选择菜单',
            type: 'warning'
          })
        }
      },
      updatemenu() {
        update(this.menuFrom).then(res => {
          if (res.data) {
            this.$message({ message: '修改成功', type: 'success' })
          } else {
            this.$message.error('修改失败')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
