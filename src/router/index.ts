import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import analysisRoutes from "./modules/analysis";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/demo-dashboard",
  },
  {
    path: "/demo-dashboard",
    name: "demo-dashboard",
    component: () => import("@/views/DemoDashboard.vue"),
  },
  {
    path: "/demo-chart",
    name: "demo-chart",
    component: () => import("@/views/DemoChart.vue"),
  },
  ...analysisRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
