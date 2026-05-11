import { defineStore } from 'pinia'

interface TodoItem {
  id: number
  title: string
  status: '待处理' | '进行中' | '已完成'
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    totalUsers: 12480,
    paidOrders: 983,
    pendingTickets: 27,
    conversionRate: 18.3,
    todos: [
      { id: 1, title: '巡检支付服务', status: '待处理' },
      { id: 2, title: '更新周报图表', status: '进行中' },
      { id: 3, title: '回归测试登录流程', status: '已完成' },
    ] as TodoItem[],
  }),
  actions: {
    increaseUsers() {
      this.totalUsers += 12
    },
    completeTodo(id: number) {
      const item = this.todos.find((todo) => todo.id === id)
      if (item) {
        item.status = '已完成'
      }
    },
  },
})
