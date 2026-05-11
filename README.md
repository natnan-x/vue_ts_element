# Vue 3 + TypeScript + Vite

## 环境配置
- 开发环境（默认）：`VITE_API_BASE_URL=http://172.16.0.85:30563`
- 测试环境（mode=test）：`VITE_API_BASE_URL=http://172.16.0.85:30563`
- 生产环境：`VITE_API_BASE_URL=https://cloud.zdxwx.com`
- 统一模块前缀：`VITE_API_MODULE=/yjzhddxt-backend`

## 请求封装
- 请求实例：`src/utils/request.ts`
- 统一 API 出口：`src/api/index.ts`
- 特性：统一 `baseURL`、超时、Token 注入、业务错误提示、网络错误提示

## 启动命令
- 开发：`pnpm dev`
- 测试模式开发：`pnpm dev:test`
- 生产构建：`pnpm build`
- 测试构建：`pnpm build:test`
