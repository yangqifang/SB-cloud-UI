<template>
  <div>
    <el-button type="primary" size="mini">添加</el-button>
    <el-row :gutter="20">
      <el-col :span="8">
        <Dept :DeptData="deptTreeData" :props="deptProps" @node-click="DeptTreeClick"></Dept>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {deptList, save, update} from '@/api/Dept'
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
        show: true
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
        console.log(node)
        console.log(component)
      }
    }
  }
</script>

<style scoped>

</style>
