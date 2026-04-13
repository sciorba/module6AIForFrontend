interface StatCardProps {
  label: string;
  value: number;
  icon: "total" | "completed" | "in-progress" | "overdue";
  trend?: { value: number; isPositive: boolean };
}

const iconConfig: Record<StatCardProps["icon"], { bg: string; color: string }> = {
  total: { bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-600 dark:text-blue-400" },
  completed: { bg: "bg-green-100 dark:bg-green-900/30", color: "text-green-600 dark:text-green-400" },
  "in-progress": { bg: "bg-yellow-100 dark:bg-yellow-900/30", color: "text-yellow-600 dark:text-yellow-400" },
  overdue: { bg: "bg-red-100 dark:bg-red-900/30", color: "text-red-600 dark:text-red-400" },
};

function StatIcon({ icon }: { icon: StatCardProps["icon"] }) {
  const props = { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, "aria-hidden": true as const };
  switch (icon) {
    case "total":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>;
    case "completed":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
    case "in-progress":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
    case "overdue":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>;
  }
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  const config = iconConfig[icon];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.bg} ${config.color} transition-colors`}>
          <StatIcon icon={icon} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <svg
            className={`h-4 w-4 ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={trend.isPositive ? "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" : "M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"}
            />
          </svg>
          <span className={`text-xs font-medium ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {trend.isPositive ? "+" : ""}{trend.value}% from last week
          </span>
        </div>
      )}
    </div>
  );
}
