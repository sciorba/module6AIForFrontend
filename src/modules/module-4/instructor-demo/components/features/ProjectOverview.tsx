import type { Project, ProjectStatus } from "../../types/team";
import { projects } from "../../lib/data";
import { Badge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";
import { Avatar } from "../ui/Avatar";
import { teamMembers } from "../../lib/data";

const statusVariant: Record<ProjectStatus, "success" | "warning" | "danger"> = {
  "on-track": "success",
  "at-risk": "warning",
  "behind": "danger",
};
const statusLabel: Record<ProjectStatus, string> = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  "behind": "Behind",
};
const progressColor: Record<ProjectStatus, "green" | "yellow" | "red"> = {
  "on-track": "green",
  "at-risk": "yellow",
  "behind": "red",
};

function ProjectCard({ project }: { project: Project }) {
  const memberData = project.members.map((id) => teamMembers.find((m) => m.id === id)).filter(Boolean);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{project.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{project.description}</p>
        </div>
        <Badge label={statusLabel[project.status]} variant={statusVariant[project.status]} />
      </div>
      <div className="mt-3">
        <ProgressBar value={project.progress} color={progressColor[project.status]} showLabel />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {memberData.map((m) => m && <Avatar key={m.id} name={m.name} src={m.avatarUrl} size="sm" />)}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {project.tasksCompleted}/{project.tasksTotal} tasks
        </span>
      </div>
    </div>
  );
}

export function ProjectOverview() {
  return (
    <section aria-label="Project overview">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">Projects</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}
