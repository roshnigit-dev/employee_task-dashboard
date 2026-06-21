import type { TaskFormInput, TaskFormErrors } from '../types/task';

export function validateTaskForm(input: TaskFormInput): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!input.title.trim()) {
    errors.title = 'Title is required';
  } else if (input.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!input.description.trim()) {
    errors.description = 'Description is required';
  } else if (input.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!input.dueDate) {
    errors.dueDate = 'Due date is required';
  }

  return errors;
}

export function hasErrors(errors: TaskFormErrors): boolean {
  return Object.keys(errors).length > 0;
}