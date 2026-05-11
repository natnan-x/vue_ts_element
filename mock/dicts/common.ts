import type { DictItem } from "./user"

export const yesNoDict: DictItem[] = [
  { label: "是", value: 1 },
  { label: "否", value: 0 },
]

export const enableDict: DictItem[] = [
  { label: "启用", value: 1 },
  { label: "停用", value: 0 },
]

export const priorityDict: DictItem[] = [
  { label: "低", value: "LOW" },
  { label: "中", value: "MEDIUM" },
  { label: "高", value: "HIGH" },
]
