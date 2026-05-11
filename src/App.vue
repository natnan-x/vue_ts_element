<template>
  <el-container class="layout">
    <el-aside width="220px" class="sidebar">
      <div class="brand">Vue3 Demo Suite</div>
      <el-menu
        router
        :default-active="$route.path"
        class="menu"
      >
        <el-menu-item index="/demo-dashboard">Demo 1：运营看板</el-menu-item>
        <el-menu-item index="/demo-chart">Demo 2：图表展示</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">Vue3 + TS + Router + Pinia + Dayjs + Element Plus + ECharts</el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
