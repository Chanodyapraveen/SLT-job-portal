import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Header.module.css'; // Adjust the path as necessary

const Header: React.FC = () => {
  const router = useRouter();
  
  const handleLogout = () => {
    // Remove auth data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Redirect to login page
    router.push('/login');
  };
  
  return (
    <header className="header">
      <div className="header-title">
        SLT Job Portal - Admin Dashboard
      </div>
      
      <div className="header-actions">
        <button onClick={() => router.push('/')} className="btn-link">
          Home
        </button>
        <button onClick={handleLogout} className="btn-link">
          Logout
        </button>
      </div>
      
      <style jsx>{`
        .header {
          background-color: white;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 100;
        }
        
        .header-title {
          font-weight: bold;
          font-size: 18px;
          color: #0055A2;
        }
        
        .header-actions {
          display: flex;
          gap: 1.5rem;
        }
        
        .btn-link {
          background: none;
          border: none;
          color: #333;
          cursor: pointer;
          font-size: 16px;
        }
        
        .btn-link:hover {
          color: #0055A2;
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
};

export default Header;