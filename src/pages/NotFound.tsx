import { useNavigate } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import Button from '../components/ui/Button';
import Layout from '../components/ui/Layout';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
        <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </div>
    </Layout>
  );
}