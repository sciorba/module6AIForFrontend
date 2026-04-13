import type { ActivityType } from "../../types/team";
import { useDashboardContext } from "../../context/DashboardContext";
import { Avatar } from "../ui/Avatar";

const iconMap: Record<ActivityType, { path: string; color: string }> = {
  "task-completed": { path: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "text-green-500" },
  "task-created": { path: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "text-blue-500" },
  "comment": { path: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z", color: "text-purple-500" },
  "member-added": { path: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z", color: "text-orange-500" },
  milestone: { path: "M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5", color: "text-yellow-500" },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function ActivityFeed() {
  const { activities } = useDashboardContext();

  return (
    <section aria-label="Activity feed" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">Recent Activity</h2>
      <div className="mt-4 space-y-4">
        {activities.slice(0, 8).map((a) => {
          const icon = iconMap[a.type];
          return (
            <div key={a.id} className="flex gap-3">
              <Avatar name={a.user} src={a.userAvatarUrl} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <svg className={`h-3.5 w-3.5 shrink-0 ${icon.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon.path} />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{a.user}</span>
                </div>
                <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{a.message}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  {a.projectName && <span className="text-[10px] text-blue-600 dark:text-blue-400">{a.projectName}</span>}
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{timeAgo(a.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
