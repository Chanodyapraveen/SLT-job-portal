import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save auth token to local storage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on user role
        if (data.user.role === 'admin') {
          router.push('/admin/jobcreation');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Left Side - Login Form */}
        <div className={styles.formSection}>
          <h1 className={styles.loginTitle}>Login</h1>
          
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>Email address :</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.inputField}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.inputField}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.signInButton}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className={styles.accountOptions}>
            <p className={styles.signupText}>
              Don&apos;t you have account? <Link href="/register" className={styles.signupLink}>SignUp</Link>
            </p>
            
            <div className={styles.dividerContainer}>
              <div className={styles.divider}></div>
              <span className={styles.orText}>OR</span>
              <div className={styles.divider}></div>
            </div>
            
            <button className={styles.googleButton}>
              <Image 
                src="/google.png" 
                alt="Sign in with Google" 
                width={30} 
                height={30} 
              />
            </button>
          </div>
        </div>
        
        {/* Right Side - Illustration */}
        <div className={styles.illustrationSection}>
          <Image
            src="/login image.png"
            alt="Login illustration"
            width={628}
            height={603}
            className={styles.illustration}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Login;