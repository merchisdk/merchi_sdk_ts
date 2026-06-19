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
