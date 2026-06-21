

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext'; // Add kiya
import Toast from './components/ui/Toast'; // ToastContainer → Toast naam change kiya tha
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toast />
        </BrowserRouter>
      </TaskProvider>
    </ThemeProvider>
  );
}