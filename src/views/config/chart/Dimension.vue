<template>
  <el-form ref="Dimension" >
    <el-form-item label="维度">
      <el-input v-for="(item,index) in dimension" v-model="dimension[index]" :key="index" >
        <template slot="append">
          <el-button icon="el-icon-delete" @click="removeDimension(index)"></el-button>
        </template>
      </el-input>
      <el-button type="primary" @click="addDimension">addDimension</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Dimension",
    props: {
      value: Array
    },
    data() {
      return {
        dimension: this.value
      }
    },
    methods: {
      removeDimension(index) {
        this.dimension.splice(index)
      },
      addDimension() {
        this.dimension.push('')
      },
    }
  }
</script>

<style scoped>

</style>
