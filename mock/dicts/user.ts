export interface DictItem {
  label: string
  value: string | number
}

export const userStatusDict: DictItem[] = [
  { label: "正常", value: 1 },
  { label: "禁用", value: 0 },
  { label: "待激活", value: 2 },
]

export const genderDict: DictItem[] = [
  { label: "男", value: "M" },
  { label: "女", value: "F" },
  { label: "未知", value: "U" },
]
