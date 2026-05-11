# DonutChart

通用环形图组件，适用于告警占比、类型分布、渠道占比等场景。

## 特性
- 通用数据结构，不依赖业务模块
- 默认色值、字号、文案集中在 `types.ts`
- 支持 `window.resize` + `ResizeObserver` 自动缩放
- 默认使用 ECharts 内置 legend，图例与扇区联动
- 支持 `before-chart`、`after-chart`、`legend-area` 插槽扩展

## 使用示例

```vue
<script setup lang="ts">
import DonutChart, { type DonutChartItem } from "@/components/donut-chart"

const chartData: DonutChartItem[] = [
  { key: "flowSaturation", name: "客流超载告警", value: 20, colorKey: "primary" },
  { key: "meteorologicalDisaster", name: "气象预警", value: 10, colorKey: "secondary" },
]
</script>

<template>
  <DonutChart :data="chartData" unit="件" />
</template>
```

## 新增配置

- `unit`：图例数量单位，默认空字符串，由外部传入
- `legendStyle`：图例默认样式（文字颜色/字号/对齐）
  - 默认值在 `types.ts`：
    - `color: "#666666"`
    - `fontSize: 14`
    - `textAlign: "center"`
  - 文本默认支持自动换行

## 插槽

- `legend-area`：整块图例区域插槽（仅在你需要自定义时使用）
  - 插槽参数：`items`、`unit`、`getColor`
- 未传 `legend-area` 时，使用 ECharts 内置 legend（推荐，保留默认联动）
