<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useDashboardStore } from '../stores/useDashboardStore'

const store = useDashboardStore()
const now = ref(dayjs())

const summaryCards = computed(() => [
  { title: '用户总量', value: store.totalUsers, suffix: '人' },
  { title: '支付订单', value: store.paidOrders, suffix: '笔' },
  { title: '待处理工单', value: store.pendingTickets, suffix: '条' },
  { title: '转化率', value: store.conversionRate, suffix: '%' },
])

const refreshTime = () => {
  now.value = dayjs()
  store.increaseUsers()
}
</script>

<template>
  <div class="page">
    <el-card shadow="never" class="page-header">
      <div class="header-row">
        <div>
          <h2>Demo 1：运营看板</h2>
          <p>当前时间：{{ now.format('YYYY-MM-DD HH:mm:ss') }}</p>
        </div>
        <el-button type="primary" @click="refreshTime">刷新数据</el-button>
      </div>
    </el-card>

    <el-row :gutter="16" class="card-row">
      <el-col v-for="item in summaryCards" :key="item.title" :span="6">
        <el-card shadow="hover">
          <div class="metric-title">{{ item.title }}</div>
          <div class="metric-value">{{ item.value }}{{ item.suffix }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never">
      <template #header>今日待办</template>
      <el-table :data="store.todos" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="事项" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button link type="primary" @click="store.completeTodo(row.id)">
              完成
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
