import type { TeamMember, Project, Activity, DashboardStats } from "../types/team";

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Sarah Chen", role: "lead", avatarUrl: "https://i.pravatar.cc/150?u=sarah", status: "online", tasksCompleted: 24, tasksAssigned: 28 },
  { id: "2", name: "Marcus Rivera", role: "developer", avatarUrl: "https://i.pravatar.cc/150?u=marcus2", status: "online", tasksCompleted: 18, tasksAssigned: 22 },
  { id: "3", name: "Alex Kim", role: "designer", avatarUrl: "https://i.pravatar.cc/150?u=alexk", status: "away", tasksCompleted: 15, tasksAssigned: 16 },
  { id: "4", name: "Jordan Park", role: "developer", avatarUrl: "https://i.pravatar.cc/150?u=jordan2", status: "online", tasksCompleted: 21, tasksAssigned: 25 },
  { id: "5", name: "Priya Sharma", role: "pm", avatarUrl: "https://i.pravatar.cc/150?u=priya2", status: "offline", tasksCompleted: 12, tasksAssigned: 14 },
  { id: "6", name: "Tom Wilson", role: "developer", avatarUrl: "https://i.pravatar.cc/150?u=tomw", status: "online", tasksCompleted: 9, tasksAssigned: 12 },
];

export const projects: Project[] = [
  { id: "p1", name: "Website Redesign", description: "Complete overhaul of the marketing website with new design system.", status: "on-track", progress: 72, tasksTotal: 36, tasksCompleted: 26, dueDate: "2026-05-15", members: ["1", "3", "4"] },
  { id: "p2", name: "Mobile App v2", description: "Native mobile app rebuild with React Native and new features.", status: "at-risk", progress: 45, tasksTotal: 48, tasksCompleted: 22, dueDate: "2026-06-01", members: ["2", "4", "6"] },
  { id: "p3", name: "API Migration", description: "Migrate REST API to GraphQL with improved performance.", status: "on-track", progress: 88, tasksTotal: 24, tasksCompleted: 21, dueDate: "2026-04-30", members: ["2", "6"] },
  { id: "p4", name: "Design System", description: "Build a shared component library and design token system.", status: "behind", progress: 30, tasksTotal: 40, tasksCompleted: 12, dueDate: "2026-04-20", members: ["1", "3", "5"] },
];

export const initialActivities: Activity[] = [
  { id: "a1", type: "task-completed", user: "Sarah Chen", userAvatarUrl: "https://i.pravatar.cc/150?u=sarah", message: "Completed \"Hero section redesign\"", timestamp: "2026-04-13T14:30:00Z", projectName: "Website Redesign" },
  { id: "a2", type: "comment", user: "Marcus Rivera", userAvatarUrl: "https://i.pravatar.cc/150?u=marcus2", message: "Reviewed PR #142 for API endpoints", timestamp: "2026-04-13T13:15:00Z", projectName: "API Migration" },
  { id: "a3", type: "milestone", user: "Alex Kim", userAvatarUrl: "https://i.pravatar.cc/150?u=alexk", message: "Reached milestone: Component Library v1", timestamp: "2026-04-13T11:00:00Z", projectName: "Design System" },
  { id: "a4", type: "task-created", user: "Jordan Park", userAvatarUrl: "https://i.pravatar.cc/150?u=jordan2", message: "Created \"Implement push notifications\"", timestamp: "2026-04-13T10:45:00Z", projectName: "Mobile App v2" },
  { id: "a5", type: "member-added", user: "Priya Sharma", userAvatarUrl: "https://i.pravatar.cc/150?u=priya2", message: "Added Tom Wilson to Mobile App v2", timestamp: "2026-04-13T09:30:00Z" },
  { id: "a6", type: "task-completed", user: "Tom Wilson", userAvatarUrl: "https://i.pravatar.cc/150?u=tomw", message: "Completed \"Setup CI/CD pipeline\"", timestamp: "2026-04-12T16:00:00Z", projectName: "API Migration" },
  { id: "a7", type: "comment", user: "Sarah Chen", userAvatarUrl: "https://i.pravatar.cc/150?u=sarah", message: "Left feedback on navigation prototype", timestamp: "2026-04-12T14:20:00Z", projectName: "Website Redesign" },
  { id: "a8", type: "task-completed", user: "Alex Kim", userAvatarUrl: "https://i.pravatar.cc/150?u=alexk", message: "Completed \"Icon set for mobile\"", timestamp: "2026-04-12T11:00:00Z", projectName: "Design System" },
];

export const initialStats: DashboardStats = {
  totalProjects: 4,
  activeTasks: 31,
  completedTasks: 81,
  teamMembers: 6,
  completionRate: 72,
};

export const weeklyProgress = [
  { day: "Mon", completed: 8 },
  { day: "Tue", completed: 12 },
  { day: "Wed", completed: 6 },
  { day: "Thu", completed: 14 },
  { day: "Fri", completed: 10 },
  { day: "Sat", completed: 3 },
  { day: "Sun", completed: 1 },
];
