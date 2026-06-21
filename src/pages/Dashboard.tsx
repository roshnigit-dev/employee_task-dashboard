

import { useState } from 'react'
import { ClipboardList, CheckCircle2, Clock, Search } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import Layout from '../components/Layout'
import StatCard from '../components/ui/StatCard'
import TaskList from '../components/task/TaskList'

export default function Dashboard() {
  const { tasks, toggleComplete, deleteTask, reorderTasks, stats } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'high'>('all')

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'pending' ? task.status === 'Pending' :
      filter === 'completed' ? task.status === 'Completed' :
      task.priority === 'High'
    return matchesSearch && matchesFilter
  })

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          <StatCard
            title="TOTAL TASKS"
            value={stats.total.toString().padStart(2, '0')}
            subtitle="All assigned tasks"
            icon={ClipboardList}
            iconBg="bg-blue-500 dark:bg-blue-600"
            valueColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="COMPLETED"
            value={stats.completed.toString().padStart(2, '0')}
            subtitle="Tasks completed"
            icon={CheckCircle2}
            iconBg="bg-green-500 dark:bg-green-600"
            valueColor="text-green-600 dark:text-green-400"
          />
          <StatCard
            title="PENDING"
            value={stats.pending.toString().padStart(2, '0')}
            subtitle="Tasks pending"
            icon={Clock}
            iconBg="bg-orange-500 dark:bg-orange-600"
            valueColor="text-orange-600 dark:text-orange-400"
          />
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-3">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
            />
          </div>
          
          {/* Filter Buttons - Scrollable on Mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            {(['all', 'pending', 'completed', 'high'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  filter === f
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {f === 'all' ? 'All' : f === 'high' ? 'High Priority' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks} 
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onReorder={reorderTasks}
          hasAnyTasks={tasks.length > 0}
        />
      </div>
    </Layout>
  )
}