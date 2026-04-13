export function formatCompactNumber(value: number): string {
  if (value < 1_000) return value.toString();
  if (value < 1_000_000) {
    const k = value / 1_000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  const m = value / 1_000_000;
  return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
}

export function formatFullNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
