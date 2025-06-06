import React, { useState, useRef, useEffect } from 'react'; // Add useEffect
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Add this import
import styles from '../styles/Apply.module.css';

const ApplyPage: React.FC = () => {
  const router = useRouter(); // Initialize router
  
  const [formData, setFormData] = useState({
    jobTitle: '',  // Start with empty string instead of hardcoded value
    nameWithInitials: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    contactNumber: '',
    field: '',
  });

  // Effect to update job title when URL parameter changes
  useEffect(() => {
    // Only run this when router is ready and has query parameters
    if (router.isReady && router.query.jobTitle) {
      setFormData(prev => ({
        ...prev,
        jobTitle: router.query.jobTitle as string
      }));
    }
  }, [router.isReady, router.query.jobTitle]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const browseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First upload the resume file
    const formData = new FormData();
    formData.append('file', selectedFile as File);
    
    try {
      // Step 1: Upload file
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadData.success) {
        alert('Failed to upload resume file');
        return;
      }
      
      // Step 2: Submit application with resume URL
      const applicationData = {
        ...formData,
        resumeUrl: uploadData.file.url
      };
      
      const submitResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });
      
      const submitData = await submitResponse.json();
      
      if (submitData.success) {
        alert(`Application submitted successfully! Your application ID is: ${submitData.applicationId}`);
        // Reset form or redirect
      } else {
        alert('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred during submission');
    }
  };

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
          <Link href="/vacancies" className={styles.navLink}>jobs for you</Link>
          <span className={styles.divider}>|</span>
          <Link href="/" className={styles.navLink}>Home</Link>
          <span className={styles.divider}>|</span>
          <Link href="/login" className={styles.navLink}>Login</Link>
        </nav>
      </div>

      {/* Application Form */}
      <form className={styles.applicationForm} onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className={styles.formGroup}>
          <label htmlFor="jobTitle" className={styles.formLabel}>Job Title :</label>
          <div className={styles.jobTitleValue}>{formData.jobTitle}</div>
        </div>

        {/* Name with Initials */}
        <div className={styles.formGroup}>
          <label htmlFor="nameWithInitials" className={styles.formLabel}>Name with Initials:</label>
          <input
            type="text"
            id="nameWithInitials"
            name="nameWithInitials"
            className={styles.formInput}
            value={formData.nameWithInitials}
            onChange={handleChange}
            required
          />
        </div>

        {/* Full Name */}
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.formLabel}>Full Name :</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={styles.formInput}
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label htmlFor="gender" className={styles.formLabel}>Gender :</label>
          <div className={styles.selectWrapper}>
            <select
              id="gender"
              name="gender"
              className={styles.formSelect}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Date of Birth */}
        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth" className={styles.formLabel}>Date of Birth :</label>
          <div className={styles.dateInputWrapper}>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className={styles.formInput}
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <div className={styles.calendarIcon}>
              <Image 
                src="/calendar.png" 
                alt="Calendar" 
                width={45} 
                height={45}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.formInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Number */}
        <div className={styles.formGroup}>
          <label htmlFor="contactNumber" className={styles.formLabel}>Contact Number :</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className={styles.formInput}
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Field */}
        <div className={styles.formGroup}>
          <label htmlFor="field" className={styles.formLabel}>Field :</label>
          <div className={styles.selectWrapper}>
            <select
              id="field"
              name="field"
              className={styles.formSelect}
              value={formData.field}
              onChange={handleChange}
              required
            >
              <option value="">Select Field</option>
              <option value="software-development">Software Development</option>
              <option value="network-engineering">Network Engineering</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="data-science">Data Science</option>
              <option value="ui-ux">UI/UX Design</option>
            </select>
          </div>
        </div>

        {/* CV Upload */}
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>Upload your CV here</label>
          <div
            className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Image
              src="/upload-icon.png"
              alt="Upload"
              width={60}
              height={60}
            />
            <p className={styles.dragDropText}>Drag&Drop files here</p>
            <p className={styles.orText}>or</p>
            <button 
              type="button" 
              className={styles.browseButton}
              onClick={browseFiles}
            >
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              id="cvUpload"
              name="cvUpload"
              className={styles.fileInput}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
              hidden
            />
          </div>
          {selectedFile && (
            <div className={styles.selectedFile}>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyPage;