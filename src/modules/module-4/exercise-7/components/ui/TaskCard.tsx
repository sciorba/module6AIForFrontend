import type { KanbanTask, TaskPriority, ColumnId } from "../../types/kanban";
import { columns } from "../../lib/data";

const priorityClasses: Record<TaskPriority, { badge: string; dot: string }> = {
  high: { badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", dot: "bg-red-500" },
  medium: { badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", dot: "bg-yellow-500" },
  low: { badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", dot: "bg-green-500" },
};

interface TaskCardProps {
  task: KanbanTask;
  onMove: (taskId: string, targetColumn: ColumnId) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onMove, onDelete }: TaskCardProps) {
  const p = priorityClasses[task.priority];
  const otherColumns = columns.filter((c) => c.id !== task.columnId);

  return (
    <article
      aria-label={`Task: ${task.title}`}
      className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Priority + actions */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${p.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
          {task.priority}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          className="rounded p-0.5 text-gray-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 dark:text-gray-600 dark:hover:text-red-400"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Title + description */}
      <h4 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{task.title}</h4>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{task.description}</p>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1">
        {task.tags.map((tag) => (
          <span key={tag} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">{tag}</span>
        ))}
      </div>

      {/* Move buttons (drag-and-drop placeholder) */}
      <div className="mt-2 flex gap-1">
        {otherColumns.map((col) => (
          <button
            key={col.id}
            onClick={() => onMove(task.id, col.id)}
            className="rounded bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            aria-label={`Move to ${col.title}`}
          >
            → {col.title}
          </button>
        ))}
      </div>

      {/* Footer: assignee + date */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-700">
        <div className="flex items-center gap-1.5">
          <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <span className="flex h-full w-full items-center justify-center text-[8px] font-semibold" aria-hidden="true">
              {task.assignee.charAt(0)}
            </span>
            {task.assigneeAvatarUrl && <img src={task.assigneeAvatarUrl} alt={task.assignee} className="absolute inset-0 h-full w-full object-cover" />}
          </div>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">{task.assignee}</span>
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>
    </article>
  );
}
