<template>
  <div class="Dashboard">
    <el-card class="avatar-card">
      <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
      <span style="margin-left: auto;margin-right:auto;position:absolute;">hi!{{name}}</span>
    </el-card>
    <el-row class="el-row-border">
      <el-col :span="6">
        <ve-line :data="chartData"></ve-line>
      </el-col>
      <el-col :span="6">
        <ve-line :data="chartData"></ve-line>
      </el-col>
      <el-col :span="6">
        <ve-line :data="chartData"></ve-line>
      </el-col>
      <el-col :span="6">
        <ve-line :data="chartData"></ve-line>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'avatar'
      ])
    },
    data() {
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            {'日期': '2019年2月25日', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
            {'日期': '2019年2月26日', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
            {'日期': '2019年2月27日', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
            {'日期': '2019年2月28日', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
            {'日期': '2019年2月29日', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
          ]
        }

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: linear-gradient(to top right, #409EFF, #f50bee);
  .Dashboard {
    margin-top: 20px;

    .avatar-card {
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      min-width: 100px;
      font-size: 30px;
    }

    .el-row-border {
      margin-top: 20px;
      border: 5px solid #d5d8e6;
      border-radius: 15px;
      background: $bg;
    }

    .chart-card {
      width: 500px;
      height: 500px;
      position: absolute;
      margin-left: 30px;
    }
  }
</style>

