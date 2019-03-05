<template>
  <el-form ref="xAxisTypesettings" label-width="80px">
    <el-form-item label="X轴数据类型">
      <el-select v-model="xAxisType" placeholder="time">
        <el-option v-for="item in xAxisTypelist" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "xAxisType",
    props: {
      value: String
    },
    data() {
      return {
        xAxisType: this.value,
        xAxisTypelist: ['time', "category", "value", "log"]
      }
    },
    methods: {},
    watch: {
      xAxisType: function (newval) {
        this.$emit('input', newval)
      }
    }
  }
</script>

<style scoped>

</style>
