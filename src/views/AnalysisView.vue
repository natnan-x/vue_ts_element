<script setup lang="ts">
  import * as echarts from "echarts";
  import dayjs from "dayjs";
  import { computed, onBeforeUnmount, onMounted, ref } from "vue";
  import BarChart, { type BarChartData } from "@/components/bar-chart";
  import DonutChart, { type DonutChartItem } from "@/components/donut-chart";
  import {
    analysisApi,
    type AnalysisProcessAvgDurationItemVO,
    type AnalysisTimeQuery,
    type AnalysisTrendVO,
    type AnalysisTypeDistributionItemVO,
  } from "@/api/analysis";

  const trendRef = ref<HTMLDivElement | null>(null);

  let trendChart: echarts.ECharts | null = null;

  const query: AnalysisTimeQuery = {
    timeDimension: "DAY",
    startDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  };

  const typeDistributionData = ref<AnalysisTypeDistributionItemVO[]>([
    {
      eventType: "flowSaturation",
      eventTypeName: "客流超载告警",
      typeName: null,
      totalCount: 32,
      processingCount: 0,
      pendingCount: 20,
      completedCount: 4,
    },
    {
      eventType: "flowOverload",
      eventTypeName: "客流预测预警",
      typeName: null,
      totalCount: 16,
      processingCount: 0,
      pendingCount: 7,
      completedCount: 3,
    },
    {
      eventType: "meteorologicalDisaster",
      eventTypeName: "气象灾害预警",
      typeName: null,
      totalCount: 97,
      processingCount: 0,
      pendingCount: 47,
      completedCount: 3,
    },
  ]);

  const avgDurationData = ref<AnalysisProcessAvgDurationItemVO[]>([
    {
      typeName: null,
      totalCount: 16,
      avgMinutes: 59.31,
      eventType: "flowOverload",
      eventTypeName: "客流预测预警",
    },
    {
      typeName: null,
      totalCount: 32,
      avgMinutes: 50.25,
      eventType: "flowSaturation",
      eventTypeName: "客流超载告警",
    },
    {
      typeName: null,
      totalCount: 97,
      avgMinutes: 8.54,
      eventType: "meteorologicalDisaster",
      eventTypeName: "气象灾害预警",
    },
  ]);

  const pieChartData = computed<DonutChartItem[]>(() =>
    typeDistributionData.value.map((item) => ({
      key: item.eventType,
      name: item.eventTypeName,
      value: item.totalCount ?? item.count ?? 0,
      colorKey: item.eventType,
    })),
  );

  const stackedBarData = computed<BarChartData>(() => ({
    categories: typeDistributionData.value.map((item) => item.eventTypeName),
    series: [
      {
        key: "pending",
        name: "待处理",
        colorKey: "pending",
        data: typeDistributionData.value.map((item) => item.pendingCount ?? 0),
      },
      {
        key: "completed",
        name: "已完成",
        colorKey: "completed",
        data: typeDistributionData.value.map(
          (item) => item.completedCount ?? 0,
        ),
      },
      {
        key: "processing",
        name: "处理中",
        colorKey: "processing",
        data: typeDistributionData.value.map(
          (item) => item.processingCount ?? 0,
        ),
      },
    ],
  }));

  const avgDurationBarData = computed<BarChartData>(() => ({
    categories: avgDurationData.value.map((item) => item.eventTypeName),
    series: [
      {
        key: "avg",
        name: "平均时长",
        colorKey: "avg",
        data: avgDurationData.value.map((item) => Number(item.avgMinutes ?? 0)),
      },
    ],
  }));

  const fallbackTrendData: AnalysisTrendVO = {
    categories: ["04-01", "04-02", "04-03", "04-04", "04-05", "04-06", "04-07"],
    warningTotalSeries: [23, 28, 31, 24, 38, 36, 29],
    handledTotalSeries: [18, 22, 24, 19, 31, 30, 26],
    processingTotalSeries: [3, 4, 5, 4, 4, 3, 2],
    pendingTotalSeries: [2, 2, 2, 1, 3, 3, 1],
  };

  const initTrendChart = (data: AnalysisTrendVO) => {
    if (!trendRef.value) return;
    trendChart = echarts.init(trendRef.value);
    trendChart.setOption({
      tooltip: { trigger: "axis" },
      legend: { top: 0 },
      grid: { left: 20, right: 20, top: 40, bottom: 20, containLabel: true },
      xAxis: { type: "category", data: data.categories },
      yAxis: { type: "value" },
      series: [
        {
          name: "告警总数",
          type: "line",
          smooth: true,
          data: data.warningTotalSeries,
        },
        {
          name: "已处理",
          type: "line",
          smooth: true,
          data: data.handledTotalSeries,
        },
        {
          name: "处理中",
          type: "line",
          smooth: true,
          data: data.processingTotalSeries,
        },
        {
          name: "待处理",
          type: "line",
          smooth: true,
          data: data.pendingTotalSeries,
        },
      ],
    });
  };

  const loadAnalysisData = async () => {
    try {
      const [typeDistributionResp, avgDurationResp, trendData] =
        await Promise.all([
          analysisApi.getTypeDistribution(query),
          analysisApi.getAvgDuration(query),
          analysisApi.getTrend(query),
        ]);
      typeDistributionData.value = typeDistributionResp;
      avgDurationData.value = avgDurationResp;
      initTrendChart(trendData);
    } catch {
      initTrendChart(fallbackTrendData);
    }
  };

  const onResize = () => {
    trendChart?.resize();
  };

  onMounted(() => {
    loadAnalysisData();
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
    trendChart?.dispose();
  });
</script>

<template>
  <div class="analysis-page">
    <el-card shadow="never">
      <template #header>告警类型分布</template>
      <DonutChart :data="pieChartData" unit="件" />
    </el-card>
    <el-card shadow="never">
      <template #header>处理状态分析（堆叠）</template>
      <BarChart :data="stackedBarData" mode="stacked" unit="件" />
    </el-card>
    <el-card shadow="never">
      <template #header>平均处理时长（普通）</template>
      <BarChart :data="avgDurationBarData" mode="normal" unit="分钟" />
    </el-card>
    <el-card shadow="never">
      <template #header>趋势分析</template>
      <div ref="trendRef" class="chart-box" />
    </el-card>
  </div>
</template>
