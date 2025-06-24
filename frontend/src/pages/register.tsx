import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { name, email, password, confirmPassword } = formData;

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
    
    // Form validation
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      
      // Define data variable here so it's in scope for the entire try block
      let data;
      
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
      } else {
        // Not JSON - get text and log it
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error('Server returned an invalid response. Check if the server is running.');
      }
      
      setSuccess(true);
      
      // Now data is properly defined in this scope
      if (data && data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
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
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">Registration successful! Redirecting to login...</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formInput}
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formInput}
                  value={email}
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
                  value={password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.formInput}
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.submitContainer}>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
            
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;