import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlog, updateBlog } from '../api/blogApi';

export default function EditBlog() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetchBlog(id);
        const blog = response.data;
        setValue('title', blog.title);
        setValue('content', blog.content);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load blog:', error);
        navigate('/dashboard');
      }
    };
    loadBlog();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await updateBlog(id, data, token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Blog</h1>
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
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
} 