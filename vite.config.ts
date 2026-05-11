/*
 * @Author: NanNan
 * @Date: 2026-05-11 10:21:05
 * @LastEditTime: 2026-05-11 10:27:20
 * @Description: 当前文件描述字段...
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      mock: path.resolve(__dirname, "mock"),
    },
  },
  server: {
    host: true,
    port: 9490,
    open: true,
    strictPort: false,
    hmr: true,
    proxy: {
      "/release": {
        target: "https://cloud.zdxwx.com",
        secure: false,
        changeOrigin: true,
        rewrite: (urlPath) => urlPath.replace(/^\/release/, "/api"),
      },
      "/api/": {
        target: "http://192.168.9.66:9000",
        secure: false,
        changeOrigin: true,
        rewrite: (urlPath) => urlPath.replace(/^\/api/, "/"),
      },
      "/test": {
        target: "http://172.16.0.85:30563",
        secure: false,
        changeOrigin: true,
        rewrite: (urlPath) => urlPath.replace(/^\/test/, "/api"),
      },
      "/_AMapService/": {
        target: "http://172.16.0.85:31503/",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
