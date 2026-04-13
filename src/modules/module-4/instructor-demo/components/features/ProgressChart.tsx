import { weeklyProgress } from "../../lib/data";
import { useDashboardContext } from "../../context/DashboardContext";

export function ProgressChart() {
  const { stats } = useDashboardContext();
  const maxVal = Math.max(...weeklyProgress.map((d) => d.completed));

  return (
    <section aria-label="Progress chart" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Weekly Progress</h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">{stats.completionRate}% completion rate</span>
      </div>

      {/* Bar chart */}
      <div className="mt-4 flex h-40 items-end gap-2">
        {weeklyProgress.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{d.completed}</span>
            <div
              className="w-full rounded-t-md bg-blue-500 transition-all duration-500 dark:bg-blue-400"
              style={{ height: `${(d.completed / maxVal) * 100}%` }}
            />
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{d.day}</span>
          </div>
        ))}
      </div>

      {/* Summary row */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.completedTasks}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.activeTasks}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Active</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.completionRate}%</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Rate</p>
        </div>
      </div>
    </section>
  );
}
