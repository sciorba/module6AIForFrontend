import { useState } from "react";
import type { Task, TaskStatus } from "../../types/dashboard";
import { TaskCard } from "../ui/TaskCard";

interface TaskBoardProps {
  tasks: Task[];
}

type FilterValue = TaskStatus | "all";

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

export function TaskBoard({ tasks }: TaskBoardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filteredTasks =
    activeFilter === "all"
      ? tasks
      : tasks.filter((t) => t.status === activeFilter);

  return (
    <section aria-label="Task board">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
          Tasks
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter tasks by status" className="mt-4 flex gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={activeFilter === f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f.value
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task grid */}
      <div
        role="tabpanel"
        className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No tasks match this filter.
          </p>
        </div>
      )}
    </section>
  );
}
