
import { useState } from 'react';
import type { Task } from '../../types/task';
import TaskCard from './TaskCard';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (sourceId: string, targetId: string) => void;
  hasAnyTasks: boolean;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onReorder,
  hasAnyTasks,
}: TaskListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4 sm:px-6 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 transition-colors">
        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4">
          <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {hasAnyTasks? 'No tasks match this view' : 'No tasks yet'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {hasAnyTasks
            ? 'Try a different search term or filter.'
            : 'Add your first task to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          draggable
          isDragOver={dragOverId === task.id && draggedId !== task.id}
          onDragStart={(id) => setDraggedId(id)}
          onDragOver={(e) => {
            e.preventDefault();
            if (task.id !== dragOverId) setDragOverId(task.id);
          }}
          onDrop={(targetId) => {
            if (draggedId) onReorder(draggedId, targetId);
            setDraggedId(null);
            setDragOverId(null);
          }}
          onDragEnd={() => {
            setDraggedId(null);
            setDragOverId(null);
          }}
        />
      ))}
    </div>
  );
}