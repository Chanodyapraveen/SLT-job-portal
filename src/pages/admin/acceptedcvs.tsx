import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/AcceptedCVs.module.css';

interface Application {
  id: string;
  jobTitle: string;
  nameWithInitials: string;
  gender: string;
  field: string;
  contactNumber: string;
  resumeUrl: string;
}

const AcceptedCVsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAcceptedApplications = async () => {
      try {
        const response = await fetch('/api/admin/applications?status=accepted');
        const data = await response.json();
        
        if (data.success) {
          setApplications(data.data);
        } else {
          setError('Failed to load accepted applications');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedApplications();
  }, []);

  const getFileNameFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className={styles.container}>
      {/* TopBar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="SLTMobitel Logo" 
            width={234} 
            height={81} 
            priority
          />
        </div>
        <span className={styles.title}>Training Program</span>
        <div className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Home</Link>
          <Link href="/logout" className={styles.navLink}>Logout</Link>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={styles.sidebar}>
        <Link href="/admin/jobcreation" className={styles.sidebarItem}>
          <div className={styles.polygon}></div>
          <span>Job Creation</span>
        </Link>
        <Link href="/admin/jobmodification" className={styles.sidebarItem}>
          <div className={styles.polygon}></div>
          <span>Job Modification</span>
        </Link>
        <Link href="/admin/receivedcvs" className={styles.sidebarItem}>
          <div className={styles.polygon}></div>
          <span>Received CVs</span>
        </Link>
        <Link href="/admin/acceptedcvs" className={`${styles.sidebarItem} ${styles.active}`}>
          <div className={styles.polygon}></div>
          <span>Accepted CVs</span>
        </Link>
      </div>

      {/* Main Content - Accepted Applications Table */}
      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Accepted CVs</h1>
        
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.headerItem}>Job Title</div>
            <div className={styles.headerItem}>Name</div>
            <div className={styles.headerItem}>Gender</div>
            <div className={styles.headerItem}>Field</div>
            <div className={styles.headerItem}>Contact Number</div>
            <div className={styles.headerItem}>CV</div>
          </div>
          
          {loading ? (
            <div className={styles.loadingMessage}>Loading accepted applications...</div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : applications.length === 0 ? (
            <div className={styles.emptyMessage}>No accepted applications found.</div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className={styles.tableRow}>
                <div className={styles.rowItem}>{app.jobTitle}</div>
                <div className={styles.rowItem}>{app.nameWithInitials}</div>
                <div className={styles.rowItem}>{app.gender}</div>
                <div className={styles.rowItem}>{app.field}</div>
                <div className={styles.rowItem}>{app.contactNumber}</div>
                <div className={styles.rowItem}>
                  <a 
                    href={app.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.cvLink}
                  >
                    {getFileNameFromUrl(app.resumeUrl)}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptedCVsPage;