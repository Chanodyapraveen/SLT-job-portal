import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/JobStatus.module.css';

interface JobApplication {
  field: string;
  position: string;
  recommendation: string;
  status: string;
}

const JobStatusPage: React.FC = () => {
  const jobApplications: JobApplication[] = [
    { 
      field: "Software", 
      position: "QA Trainee", 
      recommendation: "Approved yesterday", 
      status: "Approved" 
    },
    { 
      field: "Telecommunication", 
      position: "Trainee", 
      recommendation: "Rejected yesterday", 
      status: "Rejected" 
    }
  ];

  return (
    <div className={styles.container}>
      {/* TopBar */}
      <div className={styles.topbar}>
        <div className={styles.logoContainer}>
          <Image 
            src="/logo.png" 
            alt="SLT Mobitel Logo" 
            width={234} 
            height={81}
            priority
          />
        </div>
        <span className={styles.title}>Training Program</span>
        <nav className={styles.nav}>
          <Link href="/jobstatus" className={styles.navLink}>Job status</Link>
          <span className={styles.divider}>|</span>
          <Link href="/apply" className={styles.navLink}>Apply for job</Link>
          <span className={styles.divider}>|</span>
          <Link href="/vacancies" className={styles.navLink}>Jobs for you</Link>
          <span className={styles.divider}>|</span>
          <Link href="/" className={styles.navLink}>Home</Link>
          <span className={styles.divider}>|</span>
          <Link href="/login" className={styles.navLink}>Login</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.statusCard}>
          <h1 className={styles.statusHeading}>Applied Job Status:</h1>
          
          {/* Status Table */}
          <div className={styles.statusTable}>
            {/* Table Header */}
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Job Field</div>
              <div className={styles.headerCell}>Job Position</div>
              <div className={styles.headerCell}>Recommendation</div>
              <div className={styles.headerCell}>Statsu</div> {/* Note: keeping the typo as in the original design */}
            </div>
            
            {/* Table Rows */}
            {jobApplications.map((application, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.tableCell}>{application.field}</div>
                <div className={styles.tableCell}>{application.position}</div>
                <div className={styles.tableCell}>{application.recommendation}</div>
                <div className={styles.tableCell}>{application.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStatusPage;