const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

// 14999 → "₹14,999"
export function formatPrice(amount) {
  return inr.format(amount)
}
