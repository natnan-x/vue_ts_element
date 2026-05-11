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
    DEFAULT_DONUT_CHART_COLORS,
    DEFAULT_DONUT_CHART_FONT_SIZE,
    DEFAULT_DONUT_CHART_LEGEND_STYLE,
    DEFAULT_DONUT_CHART_PALETTE,
    DEFAULT_DONUT_CHART_TEXTS,
    type DonutChartColorMap,
    type DonutChartFontSizeConfig,
    type DonutChartItem,
    type DonutChartLegendStyleConfig,
    type DonutChartTexts,
  } from "./types";

  const props = withDefaults(
    defineProps<{
      data: DonutChartItem[];
      colors?: Partial<DonutChartColorMap>;
      fontSize?: Partial<DonutChartFontSizeConfig>;
      legendStyle?: Partial<DonutChartLegendStyleConfig>;
      texts?: Partial<DonutChartTexts>;
      unit?: string;
      chartHeight?: number;
    }>(),
    {
      chartHeight: 360,
      unit: "",
    },
  );

  const resolveDefinedMap = (
    source: Partial<DonutChartColorMap> | undefined,
  ): DonutChartColorMap => {
    const nextMap: DonutChartColorMap = { ...DEFAULT_DONUT_CHART_COLORS };
    if (!source) return nextMap;
    Object.entries(source).forEach(([key, value]) => {
      if (typeof value === "string") {
        nextMap[key] = value;
      }
    });
    return nextMap;
  };

  const chartRef = ref<HTMLDivElement | null>(null);
  let chartInstance: echarts.ECharts | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const mergedColors = computed<DonutChartColorMap>(() =>
    resolveDefinedMap(props.colors),
  );

  const mergedFontSize = computed<DonutChartFontSizeConfig>(() => ({
    ...DEFAULT_DONUT_CHART_FONT_SIZE,
    ...(props.fontSize || {}),
  }));

  const mergedTexts = computed<DonutChartTexts>(() => ({
    ...DEFAULT_DONUT_CHART_TEXTS,
    ...(props.texts || {}),
  }));

  const mergedLegendStyle = computed<DonutChartLegendStyleConfig>(() => ({
    ...DEFAULT_DONUT_CHART_LEGEND_STYLE,
    ...(props.legendStyle || {}),
  }));

  const getColor = (item: DonutChartItem, index: number) =>
    mergedColors.value[item.colorKey || item.key] ||
    DEFAULT_DONUT_CHART_PALETTE[index % DEFAULT_DONUT_CHART_PALETTE.length];

  const total = computed(() =>
    props.data.reduce((sum, item) => sum + item.value, 0),
  );

  const getDataIndex = (item: DonutChartItem) =>
    props.data.findIndex((target) => target.key === item.key);

  const onLegendMouseEnter = (item: DonutChartItem) => {
    if (!chartInstance) return;
    const dataIndex = getDataIndex(item);
    if (dataIndex < 0) return;
    chartInstance.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex,
    });
  };

  const onLegendMouseLeave = (item: DonutChartItem) => {
    if (!chartInstance) return;
    const dataIndex = getDataIndex(item);
    if (dataIndex < 0) return;
    chartInstance.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex,
    });
  };

  const onLegendClick = (item: DonutChartItem) => {
    if (!chartInstance) return;
    const dataIndex = getDataIndex(item);
    if (dataIndex < 0) return;
    chartInstance.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex,
    });
  };

  const renderChart = () => {
    if (!chartRef.value) return;
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.value);
    }

    const hasData = props.data.length > 0;

    chartInstance.setOption({
      legend: {
        show: false,
      },
      tooltip: hasData
        ? {
            trigger: "item",
            backgroundColor: "#fff",
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 8,
            textStyle: { color: "#344054" },
            formatter: (params: {
              data: { name: string; value: number };
              marker: string;
              color: string;
            }) => {
              const percent = total.value
                ? ((params.data.value / total.value) * 100).toFixed(2)
                : "0.00";
              return `
              <div style="padding:2px 4px 2px 2px;">
                <div style="display:flex;align-items:center;gap:6px;font-size:${mergedFontSize.value.tooltipTitle}px;margin-bottom:8px;">
                  <span style="display:inline-block;width:12px;height:12px;border-radius:999px;background:${params.color};"></span>
                  <span style="color:#666666;">${params.data.name}</span>
                </div>
                <div style="font-size:${mergedFontSize.value.tooltipValue}px;font-weight:700;color:#101828;">
                  ${params.data.value}
                  <span style="padding:0 3px;color:#EBEBEB;">|</span>
                  ${percent}%
                </div>
              </div>
            `;
            },
          }
        : undefined,
      graphic: !hasData
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
      series: [
        {
          type: "pie",
          radius: ["50%", "74%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: true,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 6,
            borderRadius: 4,
          },
          data: hasData
            ? props.data.map((item, index) => ({
                name: item.name,
                value: item.value,
                itemStyle: {
                  color: getColor(item, index),
                },
              }))
            : [],
        },
      ],
    });
  };

  const onResize = () => {
    chartInstance?.resize();
  };

  watch(
    () => [
      props.data,
      mergedColors.value,
      mergedFontSize.value,
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
  <div class="donut-chart">
    <slot name="before-chart" />
    <div
      ref="chartRef"
      class="donut-chart-canvas"
      :style="{ height: `${chartHeight}px` }"
    />
    <slot name="after-chart" />
    <div class="donut-legend">
      <template v-if="data.length">
        <slot
          name="legend-area"
          :items="data"
          :unit="unit"
          :get-color="
            (item: DonutChartItem, index: number) => getColor(item, index)
          "
          :on-legend-mouse-enter="onLegendMouseEnter"
          :on-legend-mouse-leave="onLegendMouseLeave"
          :on-legend-click="onLegendClick"
        >
          <div class="donut-legend-list">
            <slot
              name="legend"
              v-for="(item, index) in data"
              :key="item.key"
              :item="item"
              :index="index"
              :color="getColor(item, index)"
              :unit="unit"
              :on-legend-mouse-enter="onLegendMouseEnter"
              :on-legend-mouse-leave="onLegendMouseLeave"
              :on-legend-click="onLegendClick"
            >
              <div
                class="donut-legend-item"
                :style="{
                  color: mergedLegendStyle.color,
                  fontSize: `${mergedLegendStyle.fontSize}px`,
                  textAlign: mergedLegendStyle.textAlign,
                }"
                @mouseenter="onLegendMouseEnter(item)"
                @mouseleave="onLegendMouseLeave(item)"
                @click="onLegendClick(item)"
              >
                <span
                  class="dot"
                  :style="{ backgroundColor: getColor(item, index) }"
                />
                <span class="name">{{ item.name }}</span>
                <span class="count ml-1">{{ item.value }}{{ unit }}</span>
              </div>
            </slot>
          </div>
        </slot>
      </template>
      <span v-else class="legend-empty">{{ mergedTexts.emptyText }}</span>
    </div>
  </div>
</template>

<style scoped>
  .donut-chart {
    width: 100%;
  }

  .donut-chart-canvas {
    width: 100%;
  }

  .donut-legend {
    margin-top: 6px;
  }

  .donut-legend-list {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 26px;
    justify-content: center;
    align-items: center;
  }

  .donut-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    white-space: normal;
    word-break: break-word;
    line-height: 1.5;
    cursor: pointer;
    user-select: none;
  }

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    flex: 0 0 auto;
  }

  .name,
  .count {
    color: inherit;
  }

  .legend-empty {
    display: block;
    font-size: 14px;
    color: #98a2b3;
    text-align: center;
  }
</style>
