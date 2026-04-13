export type ColumnId = "todo" | "in-progress" | "done";
export type TaskPriority = "high" | "medium" | "low";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  assigneeAvatarUrl?: string;
  dueDate: string;
  tags: string[];
  columnId: ColumnId;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
}

export interface NewTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  tags: string;
  columnId: ColumnId;
}
