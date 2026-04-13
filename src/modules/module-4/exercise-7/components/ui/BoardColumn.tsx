import type { KanbanTask, Column, ColumnId } from "../../types/kanban";
import { TaskCard } from "./TaskCard";

interface BoardColumnProps {
  column: Column;
  tasks: KanbanTask[];
  totalCount: number;
  onMoveTask: (taskId: string, targetColumn: ColumnId) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (columnId: ColumnId) => void;
}

export function BoardColumn({ column, tasks, totalCount, onMoveTask, onDeleteTask, onAddTask }: BoardColumnProps) {
  return (
    <div className={`flex flex-col rounded-xl border-t-4 ${column.color} border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 transition-colors`}>
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{column.title}</h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {totalCount}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
          className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Task list */}
      <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-3" role="list" aria-label={`${column.title} tasks`}>
        {tasks.map((task) => (
          <div key={task.id} role="listitem">
            <TaskCard task={task} onMove={onMoveTask} onDelete={onDeleteTask} />
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-200 py-8 text-center dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
