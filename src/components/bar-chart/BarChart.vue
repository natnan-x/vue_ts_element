<script setup lang="ts">
  import * as echarts from "echarts";
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
  } from "vue";
  import {
    DEFAULT_BAR_CHART_COLORS,
    DEFAULT_BAR_CHART_PALETTE,
    DEFAULT_BAR_CHART_TEXTS,
    type BarChartColorMap,
    type BarChartData,
    type BarChartMode,
    type BarChartTextConfig,
  } from "./types";

  const props = withDefaults(
    defineProps<{
      data: BarChartData;
      mode?: BarChartMode;
      unit?: string;
      colors?: Partial<BarChartColorMap>;
      chartHeight?: number;
      texts?: Partial<BarChartTextConfig>;
    }>(),
    {
      mode: "stacked",
      unit: "",
      chartHeight: 320,
    },
  );

  const chartRef = ref<HTMLDivElement | null>(null);
  let chartInstance: echarts.ECharts | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const mergedTexts = computed<BarChartTextConfig>(() => ({
    ...DEFAULT_BAR_CHART_TEXTS,
    ...(props.texts || {}),
  }));

  const resolveDefinedMap = (
    source: Partial<BarChartColorMap> | undefined,
  ): BarChartColorMap => {
    const nextMap: BarChartColorMap = { ...DEFAULT_BAR_CHART_COLORS };
    if (!source) return nextMap;
    Object.entries(source).forEach(([key, value]) => {
      if (typeof value === "string") {
        nextMap[key] = value;
      }
    });
    return nextMap;
  };

  const mergedColors = computed<BarChartColorMap>(() =>
    resolveDefinedMap(props.colors),
  );

  const hasData = computed(
    () => props.data.categories.length > 0 && props.data.series.length > 0,
  );

  const resolveColor = (seriesKey: string, index: number) =>
    mergedColors.value[seriesKey] ||
    DEFAULT_BAR_CHART_PALETTE[index % DEFAULT_BAR_CHART_PALETTE.length];

  const buildSeries = () =>
    props.data.series.map((item, index) => ({
      name: item.name,
      type: "bar",
      stack: props.mode === "stacked" ? "total" : undefined,
      barMaxWidth: 24,
      itemStyle: {
        color: resolveColor(item.colorKey || item.key, index),
        borderRadius: props.mode === "stacked" ? 2 : 6,
      },
      data: item.data,
    }));

  const renderChart = () => {
    if (!chartRef.value) return;
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.value);
    }

    chartInstance.setOption({
      legend: hasData.value
        ? {
            top: 0,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
          }
        : { show: false },
      grid: {
        left: 20,
        right: 20,
        top: 40,
        bottom: 20,
        containLabel: true,
      },
      tooltip: hasData.value
        ? {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            formatter: (
              params: Array<{
                marker: string;
                seriesName: string;
                value: number;
              }>,
            ) =>
              params
                .map(
                  (item) =>
                    `${item.marker}${item.seriesName}: ${item.value}${props.unit}`,
                )
                .join("<br/>"),
          }
        : undefined,
      xAxis: {
        type: "category",
        data: props.data.categories,
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: `{value}${props.unit}`,
        },
      },
      graphic: !hasData.value
        ? {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: mergedTexts.value.emptyText,
              fill: "#98a2b3",
              fontSize: 14,
            },
          }
        : undefined,
      series: hasData.value ? buildSeries() : [],
    });
  };

  const onResize = () => {
    chartInstance?.resize();
  };

  watch(
    () => [
      props.data,
      props.mode,
      props.unit,
      mergedColors.value,
      mergedTexts.value,
    ],
    async () => {
      await nextTick();
      renderChart();
    },
    { deep: true, immediate: true },
  );

  onMounted(() => {
    window.addEventListener("resize", onResize);
    if (chartRef.value) {
      resizeObserver = new ResizeObserver(() => onResize());
      resizeObserver.observe(chartRef.value);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
    resizeObserver?.disconnect();
    chartInstance?.dispose();
    chartInstance = null;
  });
</script>

<template>
  <div class="bar-chart">
    <slot name="before-chart" />
    <div
      ref="chartRef"
      class="bar-chart-canvas"
      :style="{ height: `${chartHeight}px` }"
    />
    <slot name="after-chart" />
  </div>
</template>

<style scoped>
  .bar-chart {
    width: 100%;
  }

  .bar-chart-canvas {
    width: 100%;
  }
</style>
