import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="sidebar">
      <div className="logo-container">
        <h2>SLT Admin</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link href="/admin/jobcreation" passHref>
          <div className={`nav-item ${router.pathname === '/admin/jobcreation' ? 'active' : ''}`}>
            Job Creation
          </div>
        </Link>
        
        <Link href="/admin/jobmodification" passHref>
          <div className={`nav-item ${router.pathname === '/admin/jobmodification' ? 'active' : ''}`}>
            Job Modification
          </div>
        </Link>
        
        <Link href="/admin/receivedcvs" passHref>
          <div className={`nav-item ${router.pathname === '/admin/receivedcvs' ? 'active' : ''}`}>
            Received CVs
          </div>
        </Link>
        
        <Link href="/admin/acceptedcvs" passHref>
          <div className={`nav-item ${router.pathname === '/admin/acceptedcvs' ? 'active' : ''}`}>
            Accepted CVs
          </div>
        </Link>
      </nav>
      
      <style jsx>{`
        .sidebar {
          width: 250px;
          background-color: #0055A2;
          color: white;
          height: 100vh;
          position: fixed;
          padding: 1rem;
        }
        
        .logo-container {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .sidebar-nav {
          display: flex;
          flex-direction: column;
        }
        
        .nav-item {
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .nav-item:hover {
          background-color: rgba(255,255,255,0.1);
        }
        
        .active {
          background-color: rgba(255,255,255,0.2);
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;