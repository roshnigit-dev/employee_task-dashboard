import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import Layout from '../components/ui/Layout';
import TaskForm from '../components/task/TaskForm';
import Button from '../components/ui/Button';
import { useTasks } from '../hooks/useTasks';
import type { TaskFormInput } from '../types/task';

export default function AddTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleSubmit = (input: TaskFormInput) => {
    addTask(input);
    navigate('/'); // Create ke baad dashboard pe bhej de
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Create New Task
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Add a new task to your dashboard and stay organized
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
          <TaskForm
            submitLabel="Create Task"
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Pro Tips
          </h3>
          <ul className="text-xs sm:text-sm text-blue-800 space-y-1.5">
            <li>• Be specific with task titles for better clarity</li>
            <li>• Set realistic due dates to manage your workload</li>
            <li>• Use priority levels to focus on what matters most</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}