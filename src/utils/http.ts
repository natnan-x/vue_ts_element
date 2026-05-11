import type { AxiosRequestConfig } from "axios"
import { request } from "@/utils/request"

export const http = {
  get<T>(url: string, params?: Record<string, unknown>, config: AxiosRequestConfig = {}) {
    return request<T>({
      url,
      method: "get",
      params,
      ...config,
    })
  },
  post<T>(url: string, data?: unknown, config: AxiosRequestConfig = {}) {
    return request<T>({
      url,
      method: "post",
      data,
      ...config,
    })
  },
}
