import type { KpiMetric } from "../../types/analytics";

function KpiIcon({ icon }: { icon: KpiMetric["icon"] }) {
  const props = { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, "aria-hidden": true as const };
  switch (icon) {
    case "revenue":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
    case "users":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>;
    case "orders":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>;
    case "conversion":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>;
  }
}

const iconColors: Record<KpiMetric["icon"], string> = {
  revenue: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  users: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  orders: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  conversion: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

interface KpiCardProps {
  metric: KpiMetric;
  isLoading?: boolean;
}

export function KpiCard({ metric, isLoading = false }: KpiCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-colors animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-7 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-3 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${iconColors[metric.icon]}`}>
          <KpiIcon icon={metric.icon} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <svg
          className={`h-4 w-4 ${metric.change >= 0 ? "text-green-500" : "text-red-500"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={metric.change >= 0 ? "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" : "M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"} />
        </svg>
        <span className={`text-xs font-medium ${metric.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {metric.change >= 0 ? "+" : ""}{metric.change}%
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{metric.changeLabel}</span>
      </div>
    </div>
  );
}
