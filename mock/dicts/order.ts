import type { DictItem } from "./user"

export const orderStatusDict: DictItem[] = [
  { label: "待支付", value: "PENDING" },
  { label: "已支付", value: "PAID" },
  { label: "已发货", value: "SHIPPED" },
  { label: "已完成", value: "DONE" },
  { label: "已取消", value: "CANCELED" },
]

export const payTypeDict: DictItem[] = [
  { label: "微信支付", value: "WECHAT" },
  { label: "支付宝", value: "ALIPAY" },
  { label: "银行卡", value: "CARD" },
]
