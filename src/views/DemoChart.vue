<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['访问量', '订单量'],
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: [
      { type: 'value', name: '访问量' },
      { type: 'value', name: '订单量' },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: [120, 132, 201, 154, 190, 330, 410],
      },
      {
        name: '订单量',
        type: 'bar',
        yAxisIndex: 1,
        data: [20, 18, 29, 24, 27, 45, 52],
      },
    ],
  })
}

const onResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<template>
  <div class="page">
    <el-card shadow="never" class="page-header">
      <h2>Demo 2：ECharts 图表</h2>
      <p>折线 + 柱状组合图，展示周访问与订单数据。</p>
    </el-card>
    <el-card shadow="never">
      <div ref="chartRef" class="chart" />
    </el-card>
  </div>
</template>
