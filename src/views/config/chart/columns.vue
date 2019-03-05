<template>
  <el-form ref="columns">
    <el-form-item label="数据列">
      <div v-for="(item,index) in columns">
        <el-input v-model="columns[index]" clearable>
          <template slot="append">
            <el-button icon="el-icon-delete" @click="removeColumns(index)"></el-button>
          </template>
        </el-input>
      </div>
      <el-button type="primary" @click="addColumns">添加数据列</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "columns",
    props: {
      value: Array
    },
    data() {
      return {
        columns: this.value
      }
    },
    created() {
    },
    methods: {
      addColumns() {
        this.columns.push('')
      },
      removeColumns(index) {
        this.columns.splice(index)
      },
    },
    watch: {
      'value': function (newval) {
        console.log(newval)
        this.$emit('input', newval)
      }
    }
  }
</script>

<style scoped>

</style>
