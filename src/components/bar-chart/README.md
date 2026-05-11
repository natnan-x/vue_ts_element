# BarChart

通用柱状图组件，支持：
- 普通柱状图（`mode="normal"`）
- 堆叠柱状图（`mode="stacked"`）
- 颜色映射与单位由外部传递
- 自动缩放（`window.resize` + `ResizeObserver`）

## 基本用法

```vue
<script setup lang="ts">
import BarChart, { type BarChartData } from "@/components/bar-chart";

const chartData: BarChartData = {
  categories: ["A", "B", "C"],
  series: [
    { key: "pending", name: "待处理", data: [10, 12, 9], colorKey: "pending" },
    { key: "completed", name: "已完成", data: [8, 5, 7], colorKey: "completed" },
  ],
};
</script>

<template>
  <BarChart :data="chartData" mode="stacked" unit="件" />
</template>
```
