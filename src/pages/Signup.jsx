import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/authApi';
import { Box, Paper } from '@mui/material';
import Navbar from '../components/Navbar';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      await signup(data);
      navigate('/login');
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
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
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 6, px: 2 }}>
          <Paper elevation={8} sx={{ p: 6, borderRadius: 4, bgcolor: '#fff', width: '100%', maxWidth: 420, minHeight: 400, boxShadow: '0 8px 32px 0 rgba(21,101,192,0.25)' }}>
            <h1 style={{ color: '#23272f', fontWeight: 700, marginBottom: 24 }}>Sign Up</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <div className="form-group">
                <label htmlFor="username" style={{ color: '#23272f', fontWeight: 600 }}>Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  style={{ color: '#23272f', background: '#f4f6fa', fontWeight: 500 }}
                  {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <span className="error-text" style={{ color: '#d32f2f' }}>{errors.username.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{ color: '#23272f', fontWeight: 600 }}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  style={{ color: '#23272f', background: '#f4f6fa', fontWeight: 500 }}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <span className="error-text" style={{ color: '#d32f2f' }}>{errors.email.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password" style={{ color: '#23272f', fontWeight: 600 }}>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  style={{ color: '#23272f', background: '#f4f6fa', fontWeight: 500 }}
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                />
                {errors.password && <span className="error-text" style={{ color: '#d32f2f' }}>{errors.password.message}</span>}
              </div>
              <button type="submit" disabled={isLoading} style={{ color: '#fff', background: '#1565c0', fontWeight: 600 }}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <div className="auth-footer" style={{ color: '#23272f', marginTop: 24 }}>
              <p>Already have an account? <Link to="/login" style={{ color: '#1565c0', fontWeight: 600 }}>Login</Link></p>
            </div>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
} 