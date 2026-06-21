

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import TaskForm from '../components/task/TaskForm';
import { useTasks } from '../hooks/useTasks';
import type { TaskFormInput } from '../types/task';

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTasks();
  
  const task = id? getTaskById(id) : undefined;

  // Task not found - Already dark mode ready
  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
        <div className="text-center max-w-md">
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Task Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The task you're looking for doesn't exist or may have been deleted.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (input: TaskFormInput) => {
    updateTask(task.id, input);
    navigate('/', { 
      state: { message: 'Task updated successfully!' } 
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors">
          <TaskForm
            initialValues={{
              title: task.title,
              description: task.description,
              priority: task.priority,
              dueDate: task.dueDate,
            }}
            heading="Edit Task"
            subheading="Update your task details below"
            submitLabel="Update Task"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}