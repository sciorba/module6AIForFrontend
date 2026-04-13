export type OnlineStatus = "online" | "away" | "offline";
export type MemberRole = "lead" | "developer" | "designer" | "pm";

export interface TeamMember {
  id: string;
  name: string;
  role: MemberRole;
  avatarUrl?: string;
  status: OnlineStatus;
  tasksCompleted: number;
  tasksAssigned: number;
}

export type ProjectStatus = "on-track" | "at-risk" | "behind";
export type TaskPriority = "high" | "medium" | "low";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  tasksTotal: number;
  tasksCompleted: number;
  dueDate: string;
  members: string[];
}

export type ActivityType = "task-completed" | "task-created" | "comment" | "member-added" | "milestone";

export interface Activity {
  id: string;
  type: ActivityType;
  user: string;
  userAvatarUrl?: string;
  message: string;
  timestamp: string;
  projectName?: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeTasks: number;
  completedTasks: number;
  teamMembers: number;
  completionRate: number;
}
