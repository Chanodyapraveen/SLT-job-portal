import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/JobCreation.module.css';
import AdminProtected from '../../components/AdminProtected';

const JobCreationPage: React.FC = () => {
  const [jobData, setJobData] = useState({
    jobId: '',
    jobField: '',
    jobPosition: '',
    contactNumber: '',
    background: '',
    salary: '',
    dueDate: '',
    companyEmail: '',
    companyLocation: '',
    workType: '',
    jobDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Job vacancy created successfully!');
        // Reset form or redirect
      } else {
        alert('Failed to create job vacancy.');
      }
    } catch (error) {
      console.error('Error creating job vacancy:', error);
      alert('An error occurred while creating the job vacancy.');
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
        <Link href="/admin/jobcreation" className={`${styles.sidebarItem} ${styles.active}`}>
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
        <Link href="/admin/acceptedcvs" className={styles.sidebarItem}>
          <div className={styles.polygon}></div>
          <span>Accepted CVs</span>
        </Link>
      </div>

      {/* Main Content - Job Creation Form */}
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Company Job Vacancy : Web Development Trainee</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label htmlFor="jobId">Job ID :</label>
              <input
                type="text"
                id="jobId"
                name="jobId"
                value={jobData.jobId}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="jobField">Job Field :</label>
              <input
                type="text"
                id="jobField"
                name="jobField"
                value={jobData.jobField}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="jobPosition">Job Position :</label>
              <input
                type="text"
                id="jobPosition"
                name="jobPosition"
                value={jobData.jobPosition}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="contactNumber">Contact Number :</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={jobData.contactNumber}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="background">Background :</label>
              <input
                type="text"
                id="background"
                name="background"
                value={jobData.background}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="salary">Salary :</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="dueDate">Due Date:</label>
              <div className={styles.dateContainer}>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={jobData.dueDate}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <div className={styles.calendarIcon}></div>
              </div>
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="companyEmail">Company Email:</label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={jobData.companyEmail}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="companyLocation">Company Location:</label>
              <input
                type="text"
                id="companyLocation"
                name="companyLocation"
                value={jobData.companyLocation}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="workType">Work Type:</label>
              <input
                type="text"
                id="workType"
                name="workType"
                value={jobData.workType}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.descriptionField}>
              <label htmlFor="jobDescription">Job Description :</label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleChange}
                className={styles.textareaField}
              ></textarea>
            </div>
          </div>
          
          <button type="submit" className={styles.createButton}>Create</button>
        </form>
      </div>
    </div>
  );
};

const ProtectedJobCreationPage: React.FC = () => (
  <AdminProtected>
    <JobCreationPage />
  </AdminProtected>
);

export default ProtectedJobCreationPage;