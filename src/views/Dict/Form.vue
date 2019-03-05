<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="字典名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="字典分租" prop="group">
      <el-input v-model="form.group"></el-input>
    </el-form-item>
    <el-form-item label="字典值" prop="value">
      <el-input v-model="form.value"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Form",
    props: {
      value: {}
    },
    data() {
      return {
        form: this.value,
        rules: {
          name: [
            {required: true, message: '字典名称不能为空', trigger: 'blur'},
          ],
          group: [
            {required: true, message: '字典分组不能为空', trigger: 'blur'},
          ],
          value: [
            {required: true, message: '字典值不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    watch: {
      'value': function (newval) {
        if (newval) {
          this.form = newval
        }
      }
    }
  }
</script>

<style scoped>

</style>
