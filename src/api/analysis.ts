/*
 * @Author: NanNan
 * @Date: 2026-04-11 12:21:14
 * @LastEditTime: 2026-05-11 17:01:21
 * @Description: 当前文件描述字段...
 */
import { http } from "@/utils/http";

export type TimeDimension = "DAY" | "MONTH" | "YEAR";

export type AnalysisEventType =
  | "flowSaturation"
  | "flowOverload"
  | "meteorologicalDisaster"
  | "onlineReview"
  | "aiMonitor";

export type AnalysisEventTypeName = string;

export interface AnalysisTimeQuery {
  timeDimension: TimeDimension;
  startDate: string;
}

export interface AnalysisOverviewVO {
  eventCount: number;
  eventChangeCount: number;
  eventChangeRate: number;
  eventChangeDirection: "up" | "down";
  weatherCount: number;
  weatherChangeCount: number;
  weatherChangeRate: number;
  weatherChangeDirection: "up" | "down";
  forecastCount: number;
  forecastChangeCount: number;
  forecastChangeRate: number;
  forecastChangeDirection: "up" | "down";
  opinionCount: number;
  opinionChangeCount: number;
  opinionChangeRate: number;
  opinionChangeDirection: "up" | "down";
  aiCount: number;
  aiChangeCount: number;
  aiChangeRate: number;
  aiChangeDirection: "up" | "down";
}

export interface AnalysisWarningPieItemVO {
  eventType: AnalysisEventType;
  eventTypeName: AnalysisEventTypeName;
  count: number;
  changeRate: number;
  changeDirection: "up" | "down";
}

export interface AnalysisTypeDistributionItemVO {
  typeName: string | null;
  totalCount: number;
  processingCount: number;
  pendingCount: number;
  completedCount: number;
  eventType: AnalysisEventType;
  eventTypeName: AnalysisEventTypeName;
  // 兼容旧结构
  count?: number;
}

export interface AnalysisProcessStatusBarItemVO {
  eventType: AnalysisEventType;
  eventTypeName: AnalysisEventTypeName;
  processingCount: number;
  pendingCount: number;
  completedCount: number;
}

export interface AnalysisProcessAvgDurationItemVO {
  typeName?: string | null;
  totalCount?: number;
  eventType: AnalysisEventType;
  eventTypeName: AnalysisEventTypeName;
  avgMinutes: number;
}

export interface AnalysisTrendVO {
  categories: string[];
  warningTotalSeries: number[];
  handledTotalSeries: number[];
  processingTotalSeries: number[];
  pendingTotalSeries: number[];
}

export const analysisApi = {
  getSummaryCards(data: AnalysisTimeQuery) {
    return http.post<AnalysisOverviewVO>("/alertStatistics/summaryCards", data);
  },
  getTypeDistribution(data: AnalysisTimeQuery) {
    return http.post<AnalysisTypeDistributionItemVO[]>(
      "/alertStatistics/typeDistribution",
      data,
    );
  },
  getStatusAnalysis(data: AnalysisTimeQuery) {
    return http.post<AnalysisProcessStatusBarItemVO[]>(
      "/alertStatistics/statusAnalysis",
      data,
    );
  },
  getAvgDuration(data: AnalysisTimeQuery) {
    return http.post<AnalysisProcessAvgDurationItemVO[]>(
      "/alertStatistics/avgDuration",
      data,
    );
  },
  getTrend(data: AnalysisTimeQuery) {
    return http.post<AnalysisTrendVO>("/alertStatistics/trend", data);
  },
};
