<template>
  <div>
    <el-tree :data="deptTreeData" :props="deptProps" show-checkbox>
    </el-tree>
  </div>
</template>

<script>
  import { deptList, save, update } from '@/api/Dept'

  export default {
    name: 'index',
    data() {
      return {
        deptTreeData: null,
        deptProps: {
          label:'name'
        }
      }
    },
    created() {
      this.getDept()
    },
    methods: {
      getDept() {
        deptList().then(res => {
          var { code, data } = res
          this.deptTreeData = data
          console.log(this.deptTreeData)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
