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

const productList = [
  { name: 'Luxury Sofa', sales: '$5,134.95', orders: 573, views: '2,318.90', rate: '$3,318.10' },
  { name: 'Luxury Product', sales: '$5,249.95', orders: 573, views: '6,456.90', rate: '$4,318.20' },
  { name: 'Luxury Chair', sales: '$3,142.95', orders: 573, views: '7,768.90', rate: '$5,434.40' },
]

const channelList = [
  { name: 'Direct', amount: '$24,685', rate: '65.6%' },
  { name: 'Organic Search', amount: '$72,465', rate: '45.2%' },
  { name: 'Referral', amount: '$32,685', rate: '15.6%' },
  { name: 'Social', amount: '$34,685', rate: '25.2%' },
]
</script>

<template>
  <div class="dashboard-grid">
    <div class="dashboard-main">
      <el-card shadow="never" class="dashboard-header-card">
        <div class="header-row">
          <div>
            <h2>Growing Super Human Rate Funnels</h2>
            <p>最后更新：{{ now.format('YYYY-MM-DD HH:mm:ss') }}</p>
          </div>
          <el-button type="primary" @click="refreshTime">刷新数据</el-button>
        </div>
      </el-card>

      <div class="metrics-grid">
        <el-card v-for="item in summaryCards" :key="item.title" shadow="hover" class="metric-card">
          <div class="metric-title">{{ item.title }}</div>
          <div class="metric-value">{{ item.value }}{{ item.suffix }}</div>
        </el-card>
      </div>

      <el-card shadow="never" class="table-card">
        <template #header>
          <div class="table-title">
            <span>Luxury Product</span>
            <el-button text type="primary">VIEW ALL</el-button>
          </div>
        </template>
        <el-table :data="productList" class="product-table">
          <el-table-column prop="name" label="Product" min-width="180" />
          <el-table-column prop="sales" label="Sales" />
          <el-table-column prop="orders" label="Orders" />
          <el-table-column prop="views" label="Views" />
          <el-table-column prop="rate" label="Rate" />
        </el-table>
      </el-card>
    </div>

    <div class="dashboard-side">
      <el-card shadow="never" class="side-card active-card">
        <div class="side-card-title">Active Visitors Right Now</div>
        <div class="visitor-count">3467</div>
        <div class="side-card-desc">Page view per minute</div>
      </el-card>

      <el-card shadow="never" class="side-card">
        <div class="side-card-title">In The Last 30 Days</div>
        <div class="side-card-desc">45.1% 的用户在结账流程中离开页面</div>
        <div class="side-card-actions">
          <el-button size="small">LAST 30 DAYS</el-button>
          <el-button size="small" type="primary">CHECK DATA</el-button>
        </div>
      </el-card>

      <el-card shadow="never" class="side-card">
        <div class="side-card-title">Revenue By Channel</div>
        <div v-for="item in channelList" :key="item.name" class="channel-row">
          <span>{{ item.name }}</span>
          <span>{{ item.amount }}</span>
          <span class="channel-rate">{{ item.rate }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
