<template>
  <div>
    <el-table
      :data="DictTable"
      style="width: 100%">
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="group" label="组"/>
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
  </div>
</template>

<script>
  import {list, save, update} from '@/api/sysDict'

  export default {
    name: "index",
    data() {
      return {
        DictTable: null,
        pagenum: 0,
        pageSize: 5,
        total: 0
      }
    },
    created() {
      this.getDictTable()
    },
    methods: {
      getDictTable() {
        var json = {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        }
        list(json).then(res => {
          let {code, data} = res
          this.DictTable=data.list
        }).catch(error => {
          console.log(error)
        })
      },
      ChangePageSize(val) {
        this.pageSize=val
        this.getDictTable()
      },
      CurrentChange(val) {
        this.pagenum=val
        this.getDictTable()
      }
    },
    watch: {}
  }
</script>

<style scoped>

</style>
