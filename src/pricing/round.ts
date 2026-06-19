/**
 * Round `value` to `dp` decimal places using decimal half-even (round half to
 * even / banker's rounding) so it mirrors the server's `Decimal(round(x, n))`.
 *
 * This intentionally matches Python's *decimal* half-even behaviour, NOT Python
 * float `round()` (e.g. `roundHalfEven(2.675, 2) === 2.68`, whereas float
 * `round(2.675, 2)` yields 2.67).
 *
 * Targeted at the money domain: small magnitudes and `dp <= 3`. The `EPS`
 * half-detection tolerance is tuned for that domain and is not intended for
 * arbitrary large magnitudes or high precision.
 */
export function roundHalfEven(value: number, dp: number): number {
  if (!isFinite(value)) return value;
  const factor = Math.pow(10, dp);
  const scaled = value * factor;
  const floor = Math.floor(scaled);
  const diff = scaled - floor;
  const EPS = 1e-9;
  let rounded: number;
  if (Math.abs(diff - 0.5) < EPS) {
    rounded = floor % 2 === 0 ? floor : floor + 1;
  } else {
    rounded = Math.round(scaled);
  }
  return rounded / factor;
}
