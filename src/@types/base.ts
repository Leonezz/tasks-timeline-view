export const PredefinedColors = [
  'success',
  'secondary',
  'warning',
  'danger',
  'default',
  'primary'
] as const
export type ThemeColor = (typeof PredefinedColors)[number]
