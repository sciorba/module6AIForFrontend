interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "blue" | "green" | "yellow" | "red";
  showLabel?: boolean;
}

const colorClasses = {
  blue: "bg-blue-500 dark:bg-blue-400",
  green: "bg-green-500 dark:bg-green-400",
  yellow: "bg-yellow-500 dark:bg-yellow-400",
  red: "bg-red-500 dark:bg-red-400",
} as const;

export function ProgressBar({ value, max = 100, color = "blue", showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 transition-colors" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="shrink-0 text-xs font-medium text-gray-600 dark:text-gray-400">{pct}%</span>}
    </div>
  );
}
