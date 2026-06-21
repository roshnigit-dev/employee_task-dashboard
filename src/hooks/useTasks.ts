import { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import type { Task, TaskFormInput } from '../types/task';

export function useTasks() {
  const {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    getTaskById,
  } = useTaskContext();

  // Stats calculate karo - Dashboard me use hoga
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = total - completed;
    const highPriority = tasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length;

    return {
      total,
      completed,
      pending,
      highPriority
    };
  }, [tasks]);

  // Helper: Overdue tasks check
  const getOverdueTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      if (task.status === 'Completed') return false;
      const dueDate = new Date(task.dueDate + 'T00:00:00');
      return dueDate < today;
    });
  }, [tasks]);

  // Helper: Tasks due today
  const getTodayTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    return tasks.filter((task) =>
      task.status === 'Pending' && task.dueDate === todayStr
    );
  }, [tasks]);

  return {
    tasks,
    isLoading,
    stats,
    overdueTasks: getOverdueTasks,
    todayTasks: getTodayTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    getTaskById,
  };
}