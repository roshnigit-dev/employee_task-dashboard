import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/task/TaskForm';
import { useTasks } from '../hooks/useTasks';
import type { TaskFormInput } from '../types/task';

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTasks();
  
  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Task not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:text-blue-700">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = (input: TaskFormInput) => {
    updateTask(task.id, input);
  };

  return (
    <TaskForm
      initialValues={{
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      }}
      heading="Edit Task"
      subheading="Update your task details"
      submitLabel="Update Task"
      onSubmit={handleSubmit}
    />
  );
}