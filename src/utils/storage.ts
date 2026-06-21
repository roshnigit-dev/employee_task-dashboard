

import type { Task } from '../types/task';

const TASKS_KEY = 'tasks';
const THEME_KEY = 'flowboard-theme';

export type Theme = 'light' | 'dark';

// ========== Tasks ==========
export function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore localStorage errors
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ========== Theme ==========
export const loadTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return null;
  } catch {
    return null;
  }
};

export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore localStorage errors
  }
};