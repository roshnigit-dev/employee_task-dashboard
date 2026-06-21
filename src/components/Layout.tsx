

import { Moon, Sun, ClipboardList } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">FlowBoard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Employee Dashboard</p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={toggleTheme}
                className="p-2"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              <Link to="/add">
                <Button>+ Add</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}