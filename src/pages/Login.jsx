import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';
import { Box, Paper } from '@mui/material';
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
      // Save the JWT token for authenticated requests
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
      }
      localStorage.setItem('username', response.username);
      localStorage.setItem('user_id', response.user_id);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden', bgcolor: 'transparent' }}>
      {/* Gradient Background */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: 'linear-gradient(120deg, #181a1b 60%, #1565c0 100%)',
        }}
      />
      <Navbar />
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', py: { xs: 2, sm: 6 }, px: 0 }}>
        <Paper elevation={8} sx={{
          p: { xs: 2, sm: 4, md: 6 },
          borderRadius: 4,
          bgcolor: '#fff',
          width: '100%',
          maxWidth: { xs: '95vw', sm: 420 },
          boxShadow: '0 8px 32px 0 rgba(21,101,192,0.25)',
          minHeight: 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mx: { xs: 1, sm: 0 },
        }}>
          <h1 style={{ color: '#23272f', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Welcome Back</h1>
          <p className="auth-subtitle" style={{ color: '#23272f', fontWeight: 500, textAlign: 'center' }}>Please login to your account</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form" style={{ width: '100%' }}>
            <div className="form-group">
              <label htmlFor="email" style={{ color: '#23272f', fontWeight: 600 }}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                style={{ color: '#23272f', background: '#f4f6fa', fontWeight: 500, fontSize: '1rem', padding: '0.75rem' }}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <span className="error-text" style={{ color: '#d32f2f' }}>{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ color: '#23272f', fontWeight: 600 }}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                style={{ color: '#23272f', background: '#f4f6fa', fontWeight: 500, fontSize: '1rem', padding: '0.75rem' }}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && <span className="error-text" style={{ color: '#d32f2f' }}>{errors.password.message}</span>}
            </div>
            <button type="submit" disabled={isLoading} style={{ color: '#fff', background: '#1565c0', fontWeight: 600, fontSize: '1rem', padding: '0.75rem', borderRadius: 6, width: '100%' }}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="auth-footer" style={{ color: '#23272f', marginTop: 16, textAlign: 'center' }}>
            <p>Don't have an account? <Link to="/signup" style={{ color: '#1565c0', fontWeight: 600 }}>Sign up</Link></p>
          </div>
        </Paper>
      </Box>
    </Box>
  );
} 