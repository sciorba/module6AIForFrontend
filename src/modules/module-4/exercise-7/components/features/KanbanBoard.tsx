import { useState } from "react";
import type { ColumnId } from "../../types/kanban";
import { columns } from "../../lib/data";
import { useKanbanBoard } from "../../hooks/useKanbanBoard";
import { BoardColumn } from "../ui/BoardColumn";
import { AddTaskModal } from "../ui/AddTaskModal";

export function KanbanBoard() {
  const board = useKanbanBoard();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalColumn, setModalColumn] = useState<ColumnId>("todo");

  function handleOpenAdd(columnId: ColumnId) {
    setModalColumn(columnId);
    setModalOpen(true);
  }

  return (
    <div>
      {/* Header + filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Kanban Board</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors">Drag-and-drop placeholders with move buttons. {board.tasks.length} tasks visible.</p>
        </div>
        <button
          onClick={() => handleOpenAdd("todo")}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Search + filter */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="search"
            placeholder="Search tasks or assignees..."
            value={board.searchQuery}
            onChange={(e) => board.setSearchQuery(e.target.value)}
            aria-label="Search tasks"
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
          />
        </div>
        <select
          value={board.priorityFilter}
          onChange={(e) => board.setPriorityFilter(e.target.value as typeof board.priorityFilter)}
          aria-label="Filter by priority"
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Board columns */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <BoardColumn
            key={col.id}
            column={col}
            tasks={board.getColumnTasks(col.id)}
            totalCount={board.totalByColumn[col.id]}
            onMoveTask={board.moveTask}
            onDeleteTask={board.deleteTask}
            onAddTask={handleOpenAdd}
          />
        ))}
      </div>

      {/* Add task modal */}
      <AddTaskModal
        isOpen={modalOpen}
        defaultColumn={modalColumn}
        onClose={() => setModalOpen(false)}
        onAdd={board.addTask}
      />
    </div>
  );
}
