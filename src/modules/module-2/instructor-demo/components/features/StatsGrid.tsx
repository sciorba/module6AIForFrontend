import type { DashboardStats } from "../../types/dashboard";
import { StatCard } from "../ui/StatCard";

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section aria-label="Dashboard statistics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.totalTasks} icon="total" />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon="completed"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard label="In Progress" value={stats.inProgress} icon="in-progress" />
        <StatCard
          label="Overdue"
          value={stats.overdue}
          icon="overdue"
          trend={{ value: 2, isPositive: false }}
        />
      </div>
    </section>
  );
}
