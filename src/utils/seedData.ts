import type { Task } from '../types/task';
import { generateId } from './storage';

export function getSeedTasks(): Task[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return [
    {
      id: generateId(),
      title: 'Complete project proposal',
      description: 'Finish the Q1 project proposal and send to stakeholders',
      priority: 'High',
      status: 'Pending',
      dueDate: tomorrow.toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}