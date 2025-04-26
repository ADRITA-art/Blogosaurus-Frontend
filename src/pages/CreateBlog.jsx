import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../api/blogApi';

export default function CreateBlog() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await createBlog(data, token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <textarea
          placeholder="Content"
          rows="10"
          {...register('content', { required: true })}
        />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
} 