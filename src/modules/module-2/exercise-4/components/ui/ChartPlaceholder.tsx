import type { ChartData } from "../../types/analytics";

interface ChartPlaceholderProps {
  title: string;
  type: "bar" | "donut" | "line";
  data: ChartData[];
  isLoading?: boolean;
}

const barColors = [
  "bg-blue-500 dark:bg-blue-400",
  "bg-blue-400 dark:bg-blue-300",
  "bg-blue-300 dark:bg-blue-500",
  "bg-blue-600 dark:bg-blue-300",
  "bg-blue-500 dark:bg-blue-400",
  "bg-blue-400 dark:bg-blue-300",
  "bg-blue-300 dark:bg-blue-500",
];

const donutColors = [
  "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500",
];

function BarChart({ data }: { data: ChartData[] }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-48 items-end gap-2 px-2">
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-md transition-all duration-500 ${barColors[i % barColors.length]}`}
            style={{ height: `${(d.value / maxVal) * 100}%` }}
          />
          <span className="text-[10px] text-gray-500 dark:text-gray-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }: { data: ChartData[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="flex items-center gap-6">
      {/* Simple visual donut */}
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          {data.reduce<{ elements: React.ReactNode[]; offset: number }>(
            (acc, d, i) => {
              const pct = (d.value / total) * 100;
              const colors = ["stroke-blue-500", "stroke-emerald-500", "stroke-amber-500", "stroke-purple-500"];
              acc.elements.push(
                <circle
                  key={d.label}
                  cx="18" cy="18" r="15.915"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeDashoffset={`${-acc.offset}`}
                  className={colors[i % colors.length]}
                />
              );
              acc.offset += pct;
              return acc;
            },
            { elements: [], offset: 0 },
          ).elements}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{total}%</span>
        </div>
      </div>
      {/* Legend */}
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${donutColors[i % donutColors.length]}`} />
            <span className="text-xs text-gray-600 dark:text-gray-400">{d.label}</span>
            <span className="text-xs font-medium text-gray-900 dark:text-white">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ data }: { data: ChartData[] }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 280 + 10;
    const y = 130 - (d.value / maxVal) * 110;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `10,130 ${points} 290,130`;

  return (
    <div className="h-48 px-2">
      <svg viewBox="0 0 300 150" className="h-full w-full" preserveAspectRatio="none">
        <polygon points={areaPoints} className="fill-blue-500/10 dark:fill-blue-400/10" />
        <polyline points={points} fill="none" strokeWidth="2" className="stroke-blue-500 dark:stroke-blue-400" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 280 + 10;
          const y = 130 - (d.value / maxVal) * 110;
          return <circle key={d.label} cx={x} cy={y} r="3" className="fill-blue-500 dark:fill-blue-400" />;
        })}
      </svg>
      <div className="flex justify-between px-1">
        {data.map((d) => (
          <span key={d.label} className="text-[10px] text-gray-500 dark:text-gray-400">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

export function ChartPlaceholder({ title, type, data, isLoading = false }: ChartPlaceholderProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">{title}</h3>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 dark:border-gray-600 dark:border-t-blue-400" />
          </div>
        ) : (
          <>
            {type === "bar" && <BarChart data={data} />}
            {type === "donut" && <DonutChart data={data} />}
            {type === "line" && <LineChart data={data} />}
          </>
        )}
      </div>
    </div>
  );
}
