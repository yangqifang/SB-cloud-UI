<template>
  <el-form ref="ConfigForm" :model="value" :rules="rules" :label-position="'top'">
    <el-form-item label="key" prop="key">
      <el-input v-model="value.key"></el-input>
    </el-form-item>
    <el-form-item label="value" prop="value">
      <el-input v-model="value.value"></el-input>
    </el-form-item>
    <el-form-item label="application" prop="application">
      <el-input v-model="value.application"></el-input>
    </el-form-item>
    <el-form-item label="profile" prop="profile">
      <el-input v-model="value.profile"></el-input>
    </el-form-item>
    <el-form-item label="label" prop="label">
      <el-input v-model="value.label"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "ConfigForm",
    props: {
      value: {}
    },
    data() {
      return {
        rules: {
          key: [
            {required: true, message: 'key不能为空', trigger: 'blur'}
          ],
          value: [
            {required: true, message: 'value不能为空', trigger: 'blur'}
          ],
          application: [
            {required: true, message: 'application不能为空', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: 'profile不能为空', trigger: 'blur'}
          ],
          label: [
            {required: true, message: 'label不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {},
    watch: {}
  }
</script>

<style scoped>

</style>
