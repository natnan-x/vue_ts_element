import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";

interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

const baseURL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_MODULE}`;

const service: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    if (res?.code === 200 || res?.code === 0) {
      return {
        ...response,
        data: res.data,
      };
    }
    ElMessage.error(res?.message || "请求失败");
    return Promise.reject(new Error(res?.message || "请求失败"));
  },
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || "网络异常";
    ElMessage.error(message);
    return Promise.reject(error);
  },
);

export const request = <T = unknown>(config: AxiosRequestConfig) =>
  service
    .request<unknown, AxiosResponse<T>>(config)
    .then((response) => response.data);

export default service;
