export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  assigneeAvatarUrl?: string;
  dueDate: string;
  tags: string[];
}

export interface DashboardStats {
  totalTasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: "dashboard" | "tasks" | "calendar" | "team" | "reports" | "settings";
  isActive?: boolean;
}

export interface DashboardUser {
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}
