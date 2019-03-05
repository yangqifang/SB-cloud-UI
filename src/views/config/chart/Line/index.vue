<template>
  <div>
    <ve-line v-if="reFresh" :data="chartData" :settings="chartSettings"></ve-line>
    <el-row>
      <el-col :span="12">
        <columns v-model="chartData.columns"></columns>
        <Metrics v-model="chartSettings.metrics"></Metrics>
        <Dimension v-model="chartSettings.dimension"></Dimension>
      </el-col>
      <el-col :span="12">
        <AreaSwitch v-model="chartSettings.area"></AreaSwitch>
        <xAxisType v-model="chartSettings.xAxisType"></xAxisType>
        <el-form ref="settings" label-width="80px">
          <el-form-item label="指标别名">
            {{chartSettings.labelMap}}
            <LabelMap v-model="chartSettings.labelMap" :metrics="chartSettings.metrics"></LabelMap>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <rows v-model="chartData.rows"></rows>
    <el-button @click="savefile" type="danger">生成文件</el-button>
    <span>如果图表不自动显示请点击更新图表</span>
    <el-button @click="updateChart" type="danger">更新图表</el-button>
  </div>
</template>

<script>
  import columns from '../columns'
  import Metrics from '../Metrics'
  import Dimension from '../Dimension'
  import AreaSwitch from '../AreaSwitch'
  import xAxisType from '../xAxisType'
  import rows from '../rows'
  import LabelMap from '../LabelMap'
  // API
  import {createfile} from '@/api/chartConfig'

  export default {
    components: {LabelMap, columns, Metrics, Dimension, AreaSwitch, xAxisType, rows},
    name: "chart",
    data() {
      return {
        reFresh: true,
        labelMap_reFresh: true,
        chartSettings: {
          metrics: ['访问用户'],
          dimension: ['日期'],
          area: false,
          xAxisType: 'category',
          legendName: {},
          labelMap: {}
        },
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            {'日期': '2019年2月26日', '访问用户': 1393,},
            {'日期': '2019年2月27日', '访问用户': 3530,},
            {'日期': '2019年2月28日', '访问用户': 2923,},
            {'日期': '2019年2月29日', '访问用户': 1723,},
            {'日期': '2019年2月30日', '访问用户': 3792,},
            {'日期': '2019年2月31日', '访问用户': 4593,}
          ]
        },
        xAxisType: ['time', "category", "value", "log"]
      }
    },
    methods: {
      updateChart() {
        this.reFresh = false
        this.$nextTick(() => {
          this.reFresh = true
        })
      },
      savefile() {
        var chartData = this.chartData
        chartData.rows = []
        var json = {
          chartData: chartData,
          chartSettings: this.chartSettings,
          type: 'line'
        }
        createfile(json).then(res => {
          var {code, data} = res
          this.$alert(data, '生成结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${action}`
              });
            }
          });
        }).catch(error => {
          console.log(error)
        })
      }
    },
    watch: {
      'chartData': function (newval) {
        console.log(chartData)
      }
    }
  }
</script>

<style scoped>

</style>
