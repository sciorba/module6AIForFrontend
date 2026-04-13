import { useDarkMode } from "../../hooks/useDarkMode";
import { useDashboardContext } from "../../context/DashboardContext";
import { DashboardHeader } from "./DashboardHeader";
import { ProjectOverview } from "./ProjectOverview";
import { TeamMembers } from "./TeamMembers";
import { ProgressChart } from "./ProgressChart";
import { ActivityFeed } from "./ActivityFeed";
import { QuickActions } from "./QuickActions";

function StatsBar() {
  const { stats } = useDashboardContext();
  const items = [
    { label: "Projects", value: stats.totalProjects, color: "text-blue-600 dark:text-blue-400" },
    { label: "Active Tasks", value: stats.activeTasks, color: "text-orange-600 dark:text-orange-400" },
    { label: "Completed", value: stats.completedTasks, color: "text-green-600 dark:text-green-400" },
    { label: "Team", value: stats.teamMembers, color: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <section aria-label="Dashboard statistics" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
          <p className={`mt-1 text-2xl font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </section>
  );
}

export function TeamDashboard() {
  const { isDark, toggle: toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
      <DashboardHeader isDark={isDark} onToggleDarkMode={toggleDarkMode} />

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Stats row */}
        <StatsBar />

        {/* Main grid: left (projects + charts) + right sidebar (team + actions + feed) */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: 2/3 */}
          <div className="space-y-6 lg:col-span-2">
            <ProjectOverview />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ProgressChart />
              <ActivityFeed />
            </div>
          </div>

          {/* Right sidebar: 1/3 */}
          <div className="space-y-6">
            <QuickActions />
            <TeamMembers />
          </div>
        </div>
      </main>
    </div>
  );
}
