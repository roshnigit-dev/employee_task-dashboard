import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">FlowBoard</h1>
              <span className="hidden sm:inline text-sm text-gray-500">Employee Dashboard</span>
            </div>
            
            <button
              onClick={() => navigate('/add')}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline">Add task</span>
              <span className="xs:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {children}
      </main>
    </div>
  )
}