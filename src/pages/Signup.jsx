import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
        />
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
} 