<template>
  <div>
    <el-tree :data="DeptData" :props="props" ref="deptTree"
             show-checkbox :default-expand-all="true"
             :check-strictly="true" node-key="id" @check="checkTreechange"
             @node-click="nodeclick">
    </el-tree>
  </div>
</template>
<!--单选树-->
<script>
  export default {
    name: "Dept",
    props: {
      //树的数据
      DeptData: null,
      //
      props: null,
      //v-model 的值
      value: Number,
      //默认选中的 节点
      defaultChecked: []
    },
    data() {
      return {
        checkedDeptId: this.value
      }
    },
    mounted() {
      if (this.checkedDeptId) {
        this.$refs['deptTree'].setCheckedKeys([this.checkedDeptId])
      }
    },
    methods: {
      checkTreechange(data, node) {
        this.checkedDeptId = data.id
        this.$emit('input', this.checkedDeptId)
        this.$refs['deptTree'].setCheckedKeys([data.id])
      },
      nodeclick(object, node, component) {
        this.$emit('node-click', object, node, component)
      }
    },
    watch: {
      'value': function (newval) {
        if (newval) {
          this.$refs['deptTree'].setCheckedKeys([newval])
        }
      }
    }
  }
</script>

<style scoped>

</style>
