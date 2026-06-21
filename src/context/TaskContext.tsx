

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { Task, TaskFormInput } from '../types/task';
import { loadTasks, saveTasks, generateId } from '../utils/storage';
import { getSeedTasks } from '../utils/seedData';

export interface Toast {
  id: string;
  message: string;
  tone: 'success' | 'error' | 'info';
}

interface TaskContextValue {
  tasks: Task[];
  isLoading: boolean;
  addTask: (input: TaskFormInput) => void;
  updateTask: (id: string, input: TaskFormInput) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  reorderTasks: (sourceId: string, targetId: string) => void;
  getTaskById: (id: string) => Task | undefined;
  toasts: Toast[];
  pushToast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load tasks from localStorage on mount (or seed if empty/first run).
  useEffect(() => {
    const stored = loadTasks();
    if (stored.length > 0) {
      setTasks(stored);
    } else {
      const seeded = getSeedTasks();
      setTasks(seeded);
      saveTasks(seeded);
    }
    setIsLoading(false);
  }, []);

  // Persist tasks to localStorage whenever they change (after initial load).
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const pushToast = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id!== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id!== id));
  }, []);

  const addTask = useCallback((input: TaskFormInput) => {
    const newTask: Task = {
     ...input,
      id: generateId(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask,...prev]);
    pushToast('Task created successfully');
  }, [pushToast]);

  const updateTask = useCallback((id: string, input: TaskFormInput) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id? {...t,...input, updatedAt: new Date().toISOString() } : t))
    );
    pushToast('Task updated successfully');
  }, [pushToast]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id!== id));
    pushToast('Task deleted', 'info');
  }, [pushToast]);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
         ? {
             ...t,
              status: t.status === 'Completed'? 'Pending' : 'Completed',
              updatedAt: new Date().toISOString()
            }
          : t
      )
    );
  }, []);

  const reorderTasks = useCallback((sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    setTasks((prev) => {
      const next = [...prev];
      const sourceIndex = next.findIndex((t) => t.id === sourceId);
      const targetIndex = next.findIndex((t) => t.id === targetId);
      if (sourceIndex === -1 || targetIndex === -1) return prev;
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  }, []);

  const getTaskById = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks]
  );

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      isLoading,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      reorderTasks,
      getTaskById,
      toasts,
      pushToast,
      dismissToast,
    }),
    [tasks, isLoading, addTask, updateTask, deleteTask, toggleComplete, reorderTasks, getTaskById, toasts, pushToast, dismissToast]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return ctx;
}