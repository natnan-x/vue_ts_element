/*
 * @Author: NanNan
 * @Date: 2026-05-11 15:19:17
 * @LastEditTime: 2026-05-11 15:20:33
 * @Description: 当前文件描述字段...
 */
import { request } from "@/utils/request";

export interface HealthData {
  status: string;
  timestamp: string;
}

export const getHealth = () =>
  request<HealthData>({
    url: "/health",
    method: "get",
  });
