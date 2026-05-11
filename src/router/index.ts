import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
  ],
});

export default router;
