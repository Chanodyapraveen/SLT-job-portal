import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AdminProtectedProps {
  children: ReactNode;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('authToken');

        if (!token || !user || user.role !== 'admin') {
          // Redirect to login if not authenticated or not admin
          router.push('/login');
          return;
        }

        // Optional: Verify token is valid with backend
        // const response = await fetch('http://localhost:5000/api/auth/check', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        
        // if (!response.ok) {
        //   router.push('/login');
        //   return;
        // }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children only if authorized
  return isAuthorized ? <>{children}</> : null;
};

export default AdminProtected;