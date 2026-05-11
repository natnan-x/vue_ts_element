/*
 * @Author: NanNan
 * @Date: 2026-05-11 16:59:43
 * @LastEditTime: 2026-05-11 17:04:00
 * @Description: 当前文件描述字段...
 */
export type BarChartMode = "stacked" | "normal";

export interface BarChartSeries {
  key: string;
  name: string;
  data: number[];
  colorKey?: string;
}

export interface BarChartData {
  categories: string[];
  series: BarChartSeries[];
}

export interface BarChartTextConfig {
  emptyText: string;
}

export type BarChartColorMap = Record<string, string>;

export const DEFAULT_BAR_CHART_COLORS: BarChartColorMap = {
  processing: "#2E66FF",
  pending: "#F9C653",
  completed: "#00B764",
  avg: "#980B0B",
};

export const DEFAULT_BAR_CHART_PALETTE = [
  "#2E66FF",
  "#F9C653",
  "#00B764",
  "#980B0B",
  "#FF9A42",
];

export const DEFAULT_BAR_CHART_TEXTS: BarChartTextConfig = {
  emptyText: "暂无数据",
};
