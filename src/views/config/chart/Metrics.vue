<template>
  <el-form ref="metrics" >
    <el-form-item label="指标">
      <el-input v-for="(item,index) in metrics" v-model="metrics[index]" :key="index" >
        <template slot="append">
          <el-button icon="el-icon-delete" @click="removeMetrics(index)"></el-button>
        </template>
      </el-input>
      <el-button type="primary" @click="addMetrics">addMetrics</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Metrics",
    props: {
      value: Array
    },
    data() {
      return {
        metrics: this.value
      };
    },
    methods: {
      addMetrics() {
        this.metrics.push('')
      },
      removeMetrics(index) {
        this.metrics.splice(index)
      },
    }
  }
</script>

<style scoped>

</style>
