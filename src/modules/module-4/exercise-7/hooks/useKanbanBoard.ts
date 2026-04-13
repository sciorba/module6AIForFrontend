import { useState, useCallback, useMemo } from "react";
import type { KanbanTask, ColumnId, NewTaskData } from "../types/kanban";
import { initialTasks } from "../lib/data";

export function useKanbanBoard() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"all" | KanbanTask["priority"]>("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = searchQuery === "" ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  const getColumnTasks = useCallback(
    (columnId: ColumnId) => filteredTasks.filter((t) => t.columnId === columnId),
    [filteredTasks],
  );

  const moveTask = useCallback((taskId: string, targetColumn: ColumnId) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, columnId: targetColumn } : t)));
  }, []);

  const addTask = useCallback((data: NewTaskData) => {
    const newTask: KanbanTask = {
      id: `t-${Date.now()}`,
      title: data.title,
      description: data.description,
      priority: data.priority,
      assignee: data.assignee,
      dueDate: data.dueDate,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      columnId: data.columnId,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const totalByColumn = useMemo(() => ({
    todo: tasks.filter((t) => t.columnId === "todo").length,
    "in-progress": tasks.filter((t) => t.columnId === "in-progress").length,
    done: tasks.filter((t) => t.columnId === "done").length,
  }), [tasks]);

  return {
    tasks: filteredTasks,
    searchQuery, setSearchQuery,
    priorityFilter, setPriorityFilter,
    getColumnTasks, moveTask, addTask, deleteTask, totalByColumn,
  };
}
