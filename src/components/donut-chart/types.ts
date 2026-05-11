/*
 * @Author: NanNan
 * @Date: 2026-05-11 16:10:10
 * @LastEditTime: 2026-05-11 16:29:20
 * @Description: 当前文件描述字段...
 */
export interface DonutChartItem {
  key: string;
  name: string;
  value: number;
  colorKey?: string;
}

export interface DonutChartFontSizeConfig {
  tooltipTitle: number;
  tooltipValue: number;
}

export interface DonutChartTexts {
  emptyText: string;
}

export interface DonutChartLegendStyleConfig {
  color: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
}

export type DonutChartColorMap = Record<string, string>;

export interface DonutChartLegendSlotProps {
  item: DonutChartItem;
  index: number;
  color: string;
  unit: string;
}

export const DEFAULT_DONUT_CHART_COLORS: DonutChartColorMap = {
  primary: "#980B0B",
  secondary: "#2E66FF",
  success: "#00B764",
  warning: "#F9C653",
  accent: "#FF9A42",
};

export const DEFAULT_DONUT_CHART_PALETTE = [
  "#980B0B",
  "#2E66FF",
  "#00B764",
  "#F9C653",
  "#FF9A42",
];

export const DEFAULT_DONUT_CHART_FONT_SIZE: DonutChartFontSizeConfig = {
  tooltipTitle: 14,
  tooltipValue: 14,
};

export const DEFAULT_DONUT_CHART_TEXTS: DonutChartTexts = {
  emptyText: "暂无数据",
};

export const DEFAULT_DONUT_CHART_LEGEND_STYLE: DonutChartLegendStyleConfig = {
  color: "#666666",
  fontSize: 14,
  textAlign: "center",
};
