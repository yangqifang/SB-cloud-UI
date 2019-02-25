<template>
  <div>
    <el-button type="primary" size="mini" @click="addClick">添加</el-button>
    <el-row :gutter="20">
      <el-col :span="8">
        <Dept :DeptData="deptTreeData" :props="deptProps" @node-click="DeptTreeClick" v-model="checkedDeptId"></Dept>
      </el-col>
      <el-col :span="16">
        <el-form ref="editform" :model="editform" label-width="80px" :rules="rules">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="父级部门" prop="parent">
            <Dept :DeptData="deptTreeData" :props="deptProps" v-model="editform.parent"></Dept>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updataClick">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="showFrom">
      <el-form ref="addform" :model="addform" label-width="80px" :rules="rules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showFrom = false" size="mini">取消</el-button>
        <el-button type="primary" size="mini" @click="saveDept">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {deptList, save, update, exist} from '@/api/Dept'
  import Dept from './Dept'

  export default {
    name: 'index',
    components: {Dept},
    data() {
      return {
        deptTreeData: null,
        deptProps: {
          label: 'name'
        },
        deptform: {
          id: Number,
          name: '',
          parent: Number
        },
        showFrom: false,
        checkedDeptId: 0,
        addform: {name: '', parent: null},
        editform: {name: '', parent: null, id: null},
        rules: {
          name: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          parent: [
            {required: true, message: '请选择上级部门', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      this.getDept()
    },
    methods: {
      getDept() {
        deptList().then(res => {
          var {code, data} = res
          this.deptTreeData = data
          console.log(this.deptTreeData)
        }).catch(error => {
          console.log(error)
        })
      },
      DeptTreeClick(object, node, component) {
        console.log('DeptTreeClick')
        console.log(object)
        this.editform.name = object.name
        this.editform.parent = object.parent
        this.editform.id = object.id
      },
      addClick() {
        this.showFrom = true
      },
      //添加部门
      saveDept() {
        this.$refs['addform'].validate((valid) => {
          if (valid) {
            exist(this.addform).then(res => {
              let {code, message, data} = res
              if (!data) {
                save(this.addform).then(res => {
                  this.getDept()
                }).catch(error => {
                  console.log(error)
                  this.$message.error('系统错误');
                })
              } else {
                this.$message.error('部门已存在');
              }
            }).catch(error => {
              console.log(error)
              this.$message.error('系统错误');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      //
      updataClick() {
        this.$refs['editform'].validate((valid) => {
          if (valid) {
            exist(this.editform).then(res => {
              let {code, message, data} = res
              if (!data) {
                update(this.editform).then(res => {
                  let {code, message, data} = res
                  if (data) {
                    this.getDept()
                  } else {
                    this.$message.error('修改失败');
                  }
                }).catch(error => {
                  this.$message.error('系统错误');
                })
              } else {
                this.$message.error('部门已存在');
              }
            }).catch(error => {
              console.log(error)
              this.$message.error('系统错误');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    watch: {
      checkedDeptId: function (newval) {
        this.addform.parent = newval
      }
    }
  }
</script>

<style scoped>

</style>
