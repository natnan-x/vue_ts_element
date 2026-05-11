import type { RouteRecordRaw } from "vue-router"

const analysisRoutes: RouteRecordRaw[] = [
  {
    path: "/analysis",
    name: "analysis",
    component: () => import("@/views/AnalysisView.vue"),
  },
]

export default analysisRoutes
