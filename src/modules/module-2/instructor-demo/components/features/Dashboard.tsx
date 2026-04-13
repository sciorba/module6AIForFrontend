import { useDarkMode } from "../../hooks/useDarkMode";
import { useSidebar } from "../../hooks/useSidebar";
import { sampleTasks, sidebarNavItems, dashboardStats, currentUser } from "../../lib/data";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { TaskBoard } from "./TaskBoard";

export function Dashboard() {
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const sidebar = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
      <Sidebar
        items={sidebarNavItems}
        isOpen={sidebar.isOpen}
        isCollapsed={sidebar.isCollapsed}
        onClose={sidebar.close}
        onToggleCollapse={() => sidebar.setCollapsed(!sidebar.isCollapsed)}
      />

      {/* Main content area, offset by sidebar width */}
      <div
        className={`transition-all duration-300 ${
          sidebar.isCollapsed ? "sm:ml-16" : "sm:ml-64"
        }`}
      >
        <DashboardHeader
          user={currentUser}
          isDark={isDark}
          onToggleDarkMode={toggleDarkMode}
          onToggleSidebar={sidebar.toggle}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <StatsGrid stats={dashboardStats} />
          <div className="mt-6">
            <TaskBoard tasks={sampleTasks} />
          </div>
        </main>
      </div>
    </div>
  );
}
