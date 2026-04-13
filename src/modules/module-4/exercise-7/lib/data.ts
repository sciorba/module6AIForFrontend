import type { KanbanTask, Column } from "../types/kanban";

export const columns: Column[] = [
  { id: "todo", title: "To Do", color: "border-t-gray-400" },
  { id: "in-progress", title: "In Progress", color: "border-t-blue-500" },
  { id: "done", title: "Done", color: "border-t-green-500" },
];

export const initialTasks: KanbanTask[] = [
  { id: "t1", title: "Design landing page mockups", description: "Create hi-fi mockups for the new landing page hero section.", priority: "high", assignee: "Sarah Chen", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=sarah", dueDate: "2026-04-18", tags: ["design"], columnId: "todo" },
  { id: "t2", title: "Set up authentication flow", description: "Implement OAuth 2.0 login with Google and GitHub providers.", priority: "high", assignee: "Marcus Rivera", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=marcus2", dueDate: "2026-04-16", tags: ["backend", "auth"], columnId: "todo" },
  { id: "t3", title: "Write API documentation", description: "Document all REST endpoints with request/response examples.", priority: "low", assignee: "Jordan Park", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=jordan2", dueDate: "2026-04-25", tags: ["docs"], columnId: "todo" },
  { id: "t4", title: "Implement search feature", description: "Add full-text search with filters and pagination.", priority: "medium", assignee: "Alex Kim", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=alexk", dueDate: "2026-04-20", tags: ["frontend", "feature"], columnId: "in-progress" },
  { id: "t5", title: "Fix mobile nav bug", description: "Hamburger menu doesn't close after selecting a link on iOS Safari.", priority: "high", assignee: "Tom Wilson", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=tomw", dueDate: "2026-04-14", tags: ["bug", "mobile"], columnId: "in-progress" },
  { id: "t6", title: "Add dark mode support", description: "Implement dark mode toggle with localStorage persistence.", priority: "medium", assignee: "Sarah Chen", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=sarah", dueDate: "2026-04-22", tags: ["frontend", "ux"], columnId: "in-progress" },
  { id: "t7", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions with automated testing and deployment.", priority: "medium", assignee: "Jordan Park", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=jordan2", dueDate: "2026-04-10", tags: ["devops"], columnId: "done" },
  { id: "t8", title: "Create user onboarding flow", description: "3-step wizard for new user registration and profile setup.", priority: "low", assignee: "Alex Kim", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=alexk", dueDate: "2026-04-08", tags: ["ux", "frontend"], columnId: "done" },
  { id: "t9", title: "Database schema migration", description: "Migrate from MySQL to PostgreSQL with data integrity checks.", priority: "high", assignee: "Marcus Rivera", assigneeAvatarUrl: "https://i.pravatar.cc/150?u=marcus2", dueDate: "2026-04-05", tags: ["backend", "database"], columnId: "done" },
];
