<template>
  <el-dialog title="info" :visible="show">
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="show = false">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "InfoDialog",
    props: {
      value: Boolean
    },
    data() {
      return {
        show: this.value
      }
    },
    created() {
      console.log(this.show)
    },
    methods: {},
    watch: {
      value: function (newval) {
        console.log(newval)
      }
    }
  }
</script>

<style scoped>

</style>
