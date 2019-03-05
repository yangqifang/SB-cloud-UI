<template>
  <div>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    <el-row>
      <el-col :span="12">
        <columns v-model="chartData.columns"></columns>
        <Metrics v-model="chartSettings.metrics"></Metrics>
        <Dimension v-model="chartSettings.dimension"></Dimension>
      </el-col>
      <el-col :span="12">
        <xAxisType v-model="chartSettings.xAxisType"></xAxisType>
        <el-form>
          <el-form-item label="显示线条">
            <el-checkbox-group v-model="chartSettings.showLine">
              <el-checkbox v-for="(item,key) in chartSettings.metrics" :key="key" :label="item">
                {{item}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="指标别名">
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
  import {createfile} from '@/api/chartConfig'
  export default {
    name: "histogram",
    components: {LabelMap, columns, Metrics, Dimension, AreaSwitch, xAxisType, rows},
    data() {
      return {
        chartSettings: {
          showLine: [],
          metrics: ['访问用户'],
          dimension: ['日期'],
          labelMap: {},
          xAxisType: 'category',
        },
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
            {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
            {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
            {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
            {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
            {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
          ]
        }
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
          type: 'histogram'
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
    }
  }
</script>

<style scoped>

</style>
