import { useState } from "react";
import type { NewTaskData, ColumnId } from "../../types/kanban";

interface AddTaskModalProps {
  isOpen: boolean;
  defaultColumn: ColumnId;
  onClose: () => void;
  onAdd: (data: NewTaskData) => void;
}

const initialForm: NewTaskData = {
  title: "",
  description: "",
  priority: "medium",
  assignee: "",
  dueDate: "",
  tags: "",
  columnId: "todo",
};

export function AddTaskModal({ isOpen, defaultColumn, onClose, onAdd }: AddTaskModalProps) {
  const [form, setForm] = useState<NewTaskData>({ ...initialForm, columnId: defaultColumn });

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.assignee.trim()) return;
    onAdd(form);
    setForm({ ...initialForm, columnId: defaultColumn });
    onClose();
  }

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-label="Add new task"
          className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-colors dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Task</h2>
            <button onClick={onClose} aria-label="Close" className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label htmlFor="task-title" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Title *</label>
              <input id="task-title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Task title" className={inputClass} />
            </div>
            <div>
              <label htmlFor="task-desc" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea id="task-desc" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} placeholder="Brief description" className={`resize-none ${inputClass}`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="task-priority" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Priority</label>
                <select id="task-priority" value={form.priority} onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value as NewTaskData["priority"] }))} className={inputClass}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="task-column" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Column</label>
                <select id="task-column" value={form.columnId} onChange={(e) => setForm((p) => ({ ...p, columnId: e.target.value as ColumnId }))} className={inputClass}>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="task-assignee" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Assignee *</label>
              <input id="task-assignee" value={form.assignee} onChange={(e) => setForm((p) => ({ ...p, assignee: e.target.value }))} placeholder="Name" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="task-due" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                <input id="task-due" type="date" value={form.dueDate} onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label htmlFor="task-tags" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Tags</label>
                <input id="task-tags" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="bug, frontend" className={inputClass} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</button>
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
