

import { useTaskContext } from '../../context/TaskContext';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, dismissToast } = useTaskContext();

  if (toasts.length === 0) return null;

  const getIcon = (tone: string) => {
    switch (tone) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getBgColor = (tone: string) => {
    switch (tone) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${getBgColor(
            toast.tone
          )} min-w-[280px] max-w-[400px] animate-slide-in transition-colors`}
        >
          {getIcon(toast.tone)}
          <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}