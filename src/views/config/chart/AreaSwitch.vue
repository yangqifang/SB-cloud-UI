<template>
  <el-form ref="Area" label-width="80px">
    <el-form-item label="面积图">
      <el-switch
        v-model="area"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "AreaSwitch",
    props: {
      value: false
    },
    data() {
      return {
        area: this.value
      }
    },
    methods: {},
    watch: {
      area: function (newval) {
        this.$emit('input', newval)
        console.log(this.value)
      }
    }
  }
</script>

<style scoped>

</style>
