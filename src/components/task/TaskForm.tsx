

import React, { useState, FormEvent } from 'react';
import type { TaskFormInput, TaskFormErrors } from '../../types/task';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateTaskForm, hasErrors } from '../../utils/validateTaskForm';

interface TaskFormProps {
  initialData?: Partial<TaskFormInput>;
  submitLabel: string;
  onSubmit: (input: TaskFormInput) => void;
  onCancel?: () => void;
}

const defaultInput: TaskFormInput = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: new Date().toISOString().split('T')[0],
};

export default function TaskForm({
  initialData,
  submitLabel,
  onSubmit,
  onCancel
}: TaskFormProps) {
  const [input, setInput] = useState<TaskFormInput>({...defaultInput,...initialData });
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof TaskFormInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInput(prev => ({...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(input);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(input);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      <Input
        label="Task Title"
        required
        placeholder="e.g., Complete project proposal"
        value={input.title}
        onChange={handleChange('title')}
        error={errors.title}
        hint="Keep it short and descriptive"
      />

      <Input
        as="textarea"
        label="Description"
        required
        placeholder="Add more details about this task..."
        value={input.description}
        onChange={handleChange('description')}
        error={errors.description}
        hint="What needs to be done?"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <Input
          as="select"
          label="Priority Level"
          value={input.priority}
          onChange={handleChange('priority')}
          options={[
            { label: '🔴 High Priority', value: 'High' },
            { label: '🟠 Medium Priority', value: 'Medium' },
            { label: '🟣 Low Priority', value: 'Low' },
          ]}
          error={errors.priority}
        />

        <Input
          label="Due Date"
          type="date"
          required
          value={input.dueDate}
          onChange={handleChange('dueDate')}
          error={errors.dueDate}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:flex-1"
        >
          {isSubmitting? 'Creating...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}