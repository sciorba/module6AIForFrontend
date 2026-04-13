import type { MemberRole } from "../../types/team";
import { teamMembers } from "../../lib/data";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";

const roleLabel: Record<MemberRole, string> = { lead: "Lead", developer: "Developer", designer: "Designer", pm: "PM" };
const roleVariant: Record<MemberRole, "info" | "success" | "warning" | "neutral"> = { lead: "info", developer: "success", designer: "warning", pm: "neutral" };

export function TeamMembers() {
  return (
    <section aria-label="Team members">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">Team</h2>
      <div className="mt-3 space-y-2">
        {teamMembers.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
            <Avatar name={m.name} src={m.avatarUrl} size="md" status={m.status} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</span>
                <Badge label={roleLabel[m.role]} variant={roleVariant[m.role]} />
              </div>
              <div className="mt-1">
                <ProgressBar value={m.tasksCompleted} max={m.tasksAssigned} color="blue" />
              </div>
              <p className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">{m.tasksCompleted}/{m.tasksAssigned} tasks</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
