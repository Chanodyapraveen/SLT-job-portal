import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface AdminProtectedProps {
  children: React.ReactNode;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!token || user?.role !== 'admin') {
          throw new Error('Not authenticated as admin');
        }
        
        // Verify token is valid by making a request to API
        const response = await fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Invalid authentication');
        }
        
        // User is authenticated as admin
        setLoading(false);
      } catch (error) {
        // Redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.replace('/login?redirect=' + encodeURIComponent(router.asPath));
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtected;