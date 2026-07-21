export function money(value) {
  if (value === 0) return 'FREE'
  return `$${value.toFixed(2)}`
}
