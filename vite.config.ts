/*
 * @Author: NanNan
 * @Date: 2026-05-11 10:21:05
 * @LastEditTime: 2026-05-11 10:27:20
 * @Description: 当前文件描述字段...
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      mock: path.resolve(__dirname, "mock"),
    },
  },
});
