import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Activity, DashboardStats } from "../types/team";
import { initialActivities, initialStats } from "../lib/data";

interface DashboardState {
  stats: DashboardStats;
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
  completeTask: (projectName: string, userName: string, taskTitle: string) => void;
  incrementStat: (key: keyof Pick<DashboardStats, "activeTasks" | "completedTasks">, delta: number) => void;
}

const DashboardContext = createContext<DashboardState | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addActivity = useCallback((activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: `a-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev]);
  }, []);

  const completeTask = useCallback((projectName: string, userName: string, taskTitle: string) => {
    setStats((prev) => ({
      ...prev,
      activeTasks: Math.max(0, prev.activeTasks - 1),
      completedTasks: prev.completedTasks + 1,
      completionRate: Math.min(100, Math.round(((prev.completedTasks + 1) / (prev.completedTasks + 1 + Math.max(0, prev.activeTasks - 1))) * 100)),
    }));
    addActivity({
      type: "task-completed",
      user: userName,
      message: `Completed "${taskTitle}"`,
      projectName,
    });
  }, [addActivity]);

  const incrementStat = useCallback((key: keyof Pick<DashboardStats, "activeTasks" | "completedTasks">, delta: number) => {
    setStats((prev) => ({ ...prev, [key]: prev[key] + delta }));
  }, []);

  return (
    <DashboardContext.Provider value={{ stats, activities, addActivity, completeTask, incrementStat }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardContext must be used within DashboardProvider");
  return ctx;
}
