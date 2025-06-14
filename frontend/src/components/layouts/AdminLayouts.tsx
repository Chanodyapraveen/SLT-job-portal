// src/components/layouts/AdminLayout.tsx
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../Sidebar';
import Header from '../Header';
import styles from '../../styles/AdminLayout.module.css';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('authToken');

        if (!token || !user || user.role !== 'admin') {
          router.push('/login');
          return;
        }

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className={styles.adminLayout}>
        <Sidebar />
        <main className={styles.adminContent}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;