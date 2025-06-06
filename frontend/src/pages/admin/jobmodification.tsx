import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/JobModification.module.css';

interface Job {
  id: string;
  jobId: string;
  field: string;
  title: string;
  createdAt: string;
  status: 'Accepted' | 'Rejected';
}

const JobModificationPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with API call
  useEffect(() => {
    const sampleJobs = [
      { id: '1', jobId: 'IT', field: 'QA Trainee', title: 'QA Trainee', createdAt: '2023/10/14', status: 'Rejected' as const },
      { id: '2', jobId: 'HR', field: 'HR Trainee', title: 'HR Trainee', createdAt: '2023/09/11', status: 'Accepted' as const },
      { id: '3', jobId: 'Finance', field: 'Accountant', title: 'Accountant', createdAt: '2023/08/16', status: 'Rejected' as const },
      { id: '4', jobId: 'IT', field: 'Web Developer', title: 'Web Developer', createdAt: '2023/08/02', status: 'Accepted' as const },
    ];
    setJobs(sampleJobs);
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      // API call to delete job would go here
      setJobs(jobs.filter(job => job.id !== id));
    }
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
        <Link href="/admin/jobmodification" className={`${styles.sidebarItem} ${styles.active}`}>
          <div className={styles.polygon}></div>
          <span>Job Modification</span>
        </Link>
        <Link href="/admin/receivedcvs" className={styles.sidebarItem}>
          <div className={styles.polygon}></div>
          <span>Received CVs</span>
        </Link>
        <Link href="/admin/acceptedcvs" className={styles.sidebarItem}>
          <div className={styles.polygon}></div>
          <span>Accepted CVs</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="|Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={styles.searchIcon}>
          <Image 
            src="/search.png" 
            alt="Search" 
            width={30} 
            height={30}
          />
        </div>
      </div>

      {/* Job Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerItem}>Job ID</div>
          <div className={styles.headerItem}>Job Field</div>
          <div className={styles.headerItem}>Created Date</div>
          <div className={styles.headerItem}>Status</div>
          <div className={styles.headerItem}>Modification</div>
        </div>
        
        {filteredJobs.map((job) => (
          <div key={job.id} className={styles.tableRow}>
            <div className={styles.rowItem}>{job.jobId}</div>
            <div className={styles.rowItem}>{job.field}</div>
            <div className={styles.rowItem}>{job.createdAt}</div>
            <div className={styles.rowItem}>{job.status}</div>
            <div className={styles.rowItem}>
              <Link href={`/admin/editjob/${job.id}`} className={styles.editIcon}>
                <Image 
                  src="/edit.png" 
                  alt="Edit" 
                  width={35} 
                  height={35}
                />
              </Link>
              <button onClick={() => handleDeleteJob(job.id)} className={styles.deleteButton}>
                <Image 
                  src="/trash.png" 
                  alt="Delete" 
                  width={35} 
                  height={35}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobModificationPage;