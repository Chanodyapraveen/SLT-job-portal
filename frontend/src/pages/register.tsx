import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Register.module.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation and form submission logic here
    console.log('Form submitted:', formData);
  };
  
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={styles.contentWrapper}>
          {/* Left side - Image */}
          <div className={styles.imageContainer}>
            <Image
              src="/register image.png" // Make sure to add this image to your public folder
              alt="Registration illustration"
              width={467}
              height={611}
              priority
            />
          </div>
          
          {/* Right side - Form */}
          <div className={styles.formContainer}>
            <h1 className={styles.registerTitle}>Register</h1>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="userId">User ID</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  className={styles.formInput}
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.formInput}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.formInput}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.submitContainer}>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;