<template>
  <div class="app-shell">
    <aside class="app-sidebar">
      <div class="brand-block">
        <div class="brand-logo">C</div>
        <div>
          <div class="brand-title">Commercehq</div>
          <div class="brand-subtitle">Admin Panel</div>
        </div>
      </div>

      <el-menu router :default-active="$route.path" class="app-menu">
        <el-menu-item index="/demo-dashboard">Dashboard</el-menu-item>
        <el-menu-item index="/demo-chart">Charts</el-menu-item>
        <el-menu-item index="/analysis">Analysis</el-menu-item>
      </el-menu>

      <div class="upgrade-card">
        <div class="upgrade-title">Blue Theme</div>
        <div class="upgrade-desc">默认主题已启用，可继续扩展更多主题色。</div>
      </div>
    </aside>

    <main class="app-main">
      <header class="topbar">
        <el-input class="search-input" placeholder="Search..." />
        <div class="top-actions">
          <el-badge :value="4" class="notice-badge" />
          <el-avatar :size="32">N</el-avatar>
        </div>
      </header>
      <section class="content-wrap">
        <router-view />
      </section>
    </main>
  </div>
</template>
