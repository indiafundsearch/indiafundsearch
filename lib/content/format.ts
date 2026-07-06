/** ₹ crore formatter — 1.85 → "₹1.85 Cr", 0.62 → "₹62 L" */
export const formatCr = (v: number): string =>
  v >= 1 ? `₹${v.toFixed(2)} Cr` : `₹${(v * 100).toFixed(0)} L`

/** FD baseline: ₹1 Cr at 7% pre-tax, 30% slab ⇒ ~4.9% post-tax, 5 years */
export const FD_PATH_5Y = Math.pow(1.049, 5)
