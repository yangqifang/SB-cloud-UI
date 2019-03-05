<template>
  <div>
    <el-input placeholder="请输入内容" v-for="(item,index,key) in metrics" :key="key" v-model="metricsValue[index]">
      <template slot="prepend">{{item}}</template>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "LabelMap",
    props: {
      value: {},
      'metrics': Array
    },
    data() {
      return {
        labelMap: this.value,
        metricsValue: []
      }
    },
    created() {
      console.log(this.metrics)
    },
    methods: {},
    watch: {
      metrics: function (newval) {
        this.metrics = newval
        this.metricsValue.length = this.metrics.length
      },
      metricsValue: function (newval) {
        var json = {}
        for (var item in newval) {
          json[this.metrics[item]] = newval[item]
        }
        this.labelMap = json
        console.log(this.labelMap)
        this.$emit('input', this.labelMap)
      }
    }
  }
</script>

<style scoped>

</style>
