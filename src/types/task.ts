export type Priority = 'Low' | 'Medium' | 'High';

export type Status = 'Pending' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string; // ISO date string, e.g. "2026-06-30"
  createdAt: string; // ISO datetime string
  updatedAt?: string; // Optional: last edited time
}

export type TaskFormInput = Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export type FilterOption = 'all' | 'completed' | 'pending' | 'high';

export interface TaskFormErrors {
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string;
}