<template>
  <div style="margin: 20px;">
    <div class="find-input-group">
      <el-input size="small" v-model="query.key"
                placeholder="key"
                clearable>
      </el-input>
      <el-input size="small" v-model="query.application"
                placeholder="application"
                clearable>
      </el-input>
      <el-input size="small" v-model="query.profile"
                placeholder="profile"
                clearable>
      </el-input>
      <el-input size="small" v-model="query.label"
                placeholder="label"
                clearable>
      </el-input>
      <el-button type="primary" size="small" @click="queryClick()">查询</el-button>
      <el-button type="success" size="small" @click="addclick">添加</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="key" label="key">
      </el-table-column>
      <el-table-column prop="application" label="application">
      </el-table-column>
      <el-table-column prop="profile" label="profile">
      </el-table-column>
      <el-table-column prop="label" label="label">
      </el-table-column>
      <el-table-column label="operation" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="Toview(scope.row.value)">查看</el-button>
          <el-button type="warning" size="small" @click="updataClick(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="delectClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="initData" @current-change="initData"
                   layout="prev, pager, next"
                   :page-sizes="[5, 10, 20, 30]" :page-size="pagesize"
                   :total="total" :current-page.sync="pagenum">
    </el-pagination>
    <el-dialog
      :title="ifadd?'添加配置':'修改配置'"
      :visible.sync="show"
      :before-close="handleClose">
      <ConfigForm ref="dialogform" v-model="formdata"></ConfigForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" v-if="ifadd" @click="submitSave()">提交</el-button>
        <el-button type="primary" size="small" v-if="!ifadd" @click="submitUpdate()">确定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
  import {list, save, update, delect} from '@/api/ServerConfig'
  import ConfigForm from './ConfigForm'

  export default {
    name: "index",
    components: {
      ConfigForm
    },
    data() {
      return {
        tableData: [],
        total: 0,
        pagenum: 1,
        pagesize: 5,
        show: false,
        ifadd: false,
        formdata: {},
        query: {
          key: '',
          application: '',
          profile: '',
          label: ''
        }
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        var json = {
          parament: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        list(json).then(res => {
          this.tableData = res.data.list
          this.total = res.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      queryClick() {
        this.pagenum = 1
        this.initData()
      },
      Toview(value) {
        this.$alert(value, '配置值', {
          confirmButtonText: '确定',
        });
      },
      handleClose() {
        this.show = false
        this.formdata = {}
        this.ifadd = false
      },
      addclick() {
        this.formdata = {}
        this.ifadd = true
        this.show = true
      },
      updataClick(row) {
        this.show = true
        this.formdata = row
      },
      validateForm() {
        var validate = false
        this.$refs['dialogform'].$refs['ConfigForm'].validate((valid) => {
          validate = valid
        })
        return validate
      },
      submitSave() {
        if (this.validateForm()) {
          save(this.formdata).then(res => {
            var {data} = res
            if (data) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            } else {
              this.$message.error("添加失败!")
            }
            this.initData()
            this.handleClose()
          }).catch(error => {
            console.log(error)
          })
        }
      },
      submitUpdate() {
        if (this.validateForm()) {
          update(this.formdata).then(res => {
            var {data} = res
            if (data) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$message.error("修改失败!")
            }
            this.handleClose()
          }).catch(error => {
            console.log(error)
          })
        }
      },
      delectClick(id) {
        this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delect(id).then(res => {
            var {data} = res
            if (data) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message.error('删除失败')
            }
          }).catch(error => {
            console.log(error)
          })
          this.initData()
        }).catch(() => {
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .find-input-group {
    .el-input {
      max-width: 300px;
      min-width: 50px;
    }
  }
</style>
