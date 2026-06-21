import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Check, Clock, GripVertical } from 'lucide-react';
import type { Task } from '../../types/task';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  draggable?: boolean;
  onDragStart?: (id: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (id: string) => void;
  onDragEnd?: () => void;
  isDragOver?: boolean;
}

const priorityBorder: Record<string, string> = {
  High: 'border-l-red-500',
  Medium: 'border-l-orange-500',
  Low: 'border-l-purple-500',
};

function formatDueDate(dueDate: string): { label: string; isOverdue: boolean; isToday: boolean } {
  if (!dueDate) {
    return { label: 'No date', isOverdue: false, isToday: false };
  }
  
  try {
    const due = new Date(dueDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const label = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return {
      label,
      isOverdue: diffDays < 0,
      isToday: diffDays === 0,
    };
  } catch {
    return { label: 'Invalid date', isOverdue: false, isToday: false };
  }
}

export default function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragOver = false,
}: TaskCardProps) {
  const navigate = useNavigate();

  if (!task) return null;

  const priority = task.priority || 'Medium';
  const status = task.status || 'Pending';
  const isCompleted = status === 'Completed';
  const { label: dueLabel, isOverdue, isToday } = formatDueDate(task.dueDate);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const getPriorityVariant = (): 'high' | 'medium' | 'low' => {
    const p = priority.toLowerCase();
    if (p === 'high') return 'high';
    if (p === 'medium') return 'medium';
    if (p === 'low') return 'low';
    return 'medium';
  };

  return (
    <article
      draggable={draggable && !isMobile}
      onDragStart={() => onDragStart?.(task.id)}
      onDragOver={onDragOver}
      onDrop={() => onDrop?.(task.id)}
      onDragEnd={onDragEnd}
      className={`
        relative flex bg-white border border-gray-200 rounded-xl shadow-sm
        hover:shadow-md transition-all duration-200
        border-l-4 ${priorityBorder[priority] || 'border-l-gray-400'}
        ${isDragOver ? 'ring-2 ring-blue-500 scale-[1.02]' : ''}
        ${isCompleted ? 'opacity-75' : ''}
      `}
    >
      {/* Drag Handle - Desktop Only */}
      {draggable && !isMobile && (
        <div className="flex items-center px-2 sm:px-3 cursor-move text-gray-400 hover:text-gray-600">
          <GripVertical className="h-5 w-5" />
        </div>
      )}

      <div className="flex-1 p-3 sm:p-5">
        {/* Header: Title + Status */}
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
          <h3 className={`text-base sm:text-lg font-semibold text-gray-900 leading-tight ${isCompleted ? 'line-through' : ''}`}>
            {task.title || 'Untitled Task'}
          </h3>
          <Badge variant={isCompleted ? 'completed' : 'pending'}>
            {status.toUpperCase()}
            {isCompleted && <Check className="h-3 w-3" />}
            {!isCompleted && <Clock className="h-3 w-3" />}
          </Badge>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Meta: Priority + Due Date */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 mb-3 sm:mb-4 text-sm">
          <Badge variant={getPriorityVariant()}>
            {priority} Priority
          </Badge>
          {task.dueDate && (
            <span className={`flex items-center gap-1 text-gray-500 ${
              isOverdue && !isCompleted ? 'text-red-600 font-medium' : 
              isToday && !isCompleted ? 'text-orange-600 font-medium' : ''
            }`}>
              <Clock className="h-3.5 w-3.5" />
              {isToday ? 'Due Today' : `Due ${dueLabel}`}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => onToggleComplete(task.id)}
            variant={isCompleted ? 'secondary' : 'primary'}
            size="sm"
          >
            {isCompleted ? 'Mark pending' : 'Mark complete'}
          </Button>
          
          <Button
            onClick={() => navigate(`/edit/${task.id}`)}
            variant="secondary"
            size="sm"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Edit</span>
          </Button>
          
          <Button
            onClick={() => onDelete(task.id)}
            variant="danger"
            size="sm"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Delete</span>
          </Button>
        </div>
      </div>
    </article>
  );
}