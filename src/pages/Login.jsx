import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';
import Navbar from '../components/Navbar';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await login(data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="auth-container">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Please login to your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
} 