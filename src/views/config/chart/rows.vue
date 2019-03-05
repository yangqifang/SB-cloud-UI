<template>
  <div>
    <el-button type="primary" plain @click="addcolumn">添加数据列</el-button>
    <el-table ref="row"
              :data="tableData"
              style="width: 100%" v-if="tableData.length>0 && falg">
      <el-table-column v-for="(item,key,value) in tableData[0]" :prop="key" :label="key"
                       :key="key">
        <template slot-scope="scope">
          <el-input v-model="scope.row[key]"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button type="danger" plain icon="el-icon-delete" @click="Remove(scope.$index)"></el-button>
          <el-button type="primary" plain @click="addRow(scope.row)">COPY</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "rows",
    props: {
      value: Array
    },
    data() {
      return {
        falg: true,
        tableData: this.value
      }
    },
    methods: {
      nextTick() {
        this.falg = false
        this.$nextTick(() => {
          this.falg = true
        })
      },
      addRow(row) {
        let dome = {}
        for (var item in row) {
          console.log(row[item])
          dome[item] = row[item]
        }

        this.value.push(dome)
        this.nextTick()
      },
      addcolumn() {
        this.$prompt('名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (this.value.length == 0) {
            this.value.push({})
          }
          for (var item in this.value) {
            this.value[item][value] = null
          }
          this.nextTick()
        }).catch((err) => {
          console.log(err)
        });
      },
      Remove(index) {
        this.value.splice(index, 1)
      }
    },
    watch: {
      value: function (newval) {
        console.log(newval)
      }
    }
  }
</script>

<style scoped>

</style>
