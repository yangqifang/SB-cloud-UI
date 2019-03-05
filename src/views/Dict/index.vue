<template>
  <div style="margin-left: 10px;margin-top: 10px">
    <el-button type="primary" size="mini" @click="addClick">添加</el-button>
    <el-table
      :data="DictTable"
      style="width: 100%">
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="group" label="组"/>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showValue(scope.row)" size="small" type="success">查看字典值</el-button>
          <el-button @click="editClick(scope.row)" size="small">修改</el-button>
          <!--removeClick-->
          <el-button size="small" type="danger" @click="removeClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @size-change="ChangePageSize"
                   @current-change="CurrentChange"
                   :current-page.sync="pagenum"
                   :page-sizes="[5, 10, 20, 30]"
                   :page-size=pageSize
                   layout="sizes, prev, pager, next"
                   :total=total>
    </el-pagination>
    <el-dialog center
               title="添加字典" @close="close"
               :visible.sync="showSaveDialog">
      <Form v-model="form" ref="RefForm"></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSaveDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveclick">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog center
               title="编辑字典" @close="close"
               :visible.sync="showEditDialog">
      <Form v-model="form" ref="editForm"></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="updataClick">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {list, save, update, remove} from '@/api/sysDict'
  import Form from './Form'

  export default {
    name: "index",
    components: {Form},
    data() {
      return {
        DictTable: null,
        pagenum: 1,
        pageSize: 5,
        total: 0,
        showSaveDialog: false,
        showEditDialog: false,
        form: {},
      }
    },
    created() {
      this.getDictTable()
    },
    methods: {
      getDictTable() {
        var json = {
          pagenum: this.pagenum,
          pagesize: this.pageSize,
        }
        list(json).then(res => {
          let {code, data} = res
          this.total = data.total
          this.DictTable = data.list
        }).catch(error => {
          console.log(error)
        })
      },
      ChangePageSize(val) {
        this.pageSize = val
        this.getDictTable()
      },
      CurrentChange(val) {
        this.pagenum = val
        this.getDictTable()
      },
      addClick() {
        this.showSaveDialog = true
      },
      saveclick() {
        this.$refs['RefForm'].$refs['form'].validate((valid => {
          if (valid) {
            save(this.form).then(res => {
              let {code, data} = res
              if (data) {
              } else {
                this.$message.error('添加失败');
              }
              this.showSaveDialog = false
              this.getDictTable()
            }).catch(error => {
              console.log(error)
              this.$message.error('系统错误');
            })
          } else {
            this.$message.error('输入错误 禁止提交');
            return false
          }
        }))
      },
      editClick(form) {
        this.form = form
        this.showEditDialog = true
      },
      updataClick() {
        this.$refs['editForm'].$refs['form'].validate((valid => {
          if (valid) {
            update(this.form).then(res => {
              let {code, data} = res
              if (data) {
                this.getDictTable()
              } else {
                this.$message.error('修改失败');
              }
              this.showEditDialog = false
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$message.error('输入错误 禁止提交')
            return false
          }
        }))
      },
      removeClick(row) {
        this.$confirm('此操作将永久删除该字典, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(row.id).then(res => {
            let {code, data} = res
            if (data) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getDictTable()
            } else {
              this.$message.error('删除失败!')
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showValue(row) {
        this.$alert(row.name + ':' + row.value, '分组名:' + row.group, {
          confirmButtonText: '确定',
        });
      },
      //弹出层关闭回调
      close() {
        this.form = {}
      }
    }
  }
</script>

<style scoped>

</style>
