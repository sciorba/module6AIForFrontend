import type { Task, TaskPriority, TaskStatus } from "../../types/dashboard";

const priorityClasses: Record<TaskPriority, { badge: string; border: string }> = {
  high: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    border: "border-l-red-500",
  },
  medium: {
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    border: "border-l-yellow-500",
  },
  low: {
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    border: "border-l-green-500",
  },
};

const statusClasses: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const priority = priorityClasses[task.priority];

  return (
    <article
      aria-label={`Task: ${task.title}`}
      className={`rounded-xl border border-gray-200 border-l-4 ${priority.border} bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${priority.border}`}
    >
      {/* Header: badges */}
      <div className="flex items-center gap-2">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${priority.badge} transition-colors`}>
          {task.priority}
        </span>
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClasses[task.status]} transition-colors`}>
          {statusLabels[task.status]}
        </span>
      </div>

      {/* Title + description */}
      <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
        {task.title}
      </h3>
      <p className="mt-1 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
        {task.description}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer: assignee + due date */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <span className="flex h-full w-full items-center justify-center text-[10px] font-semibold" aria-hidden="true">
              {getInitial(task.assignee)}
            </span>
            {task.assigneeAvatarUrl && (
              <img src={task.assigneeAvatarUrl} alt={task.assignee} className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">{task.assignee}</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>
    </article>
  );
}
