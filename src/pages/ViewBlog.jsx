import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlog, deleteBlog } from '../api/blogApi';

export default function ViewBlog() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetchBlog(id);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load blog:', error);
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await deleteBlog(id, token);
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!blog) {
    return <div className="container">Blog not found</div>;
  }

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <p>By {blog.author}</p>
      <div className="blog-content">{blog.content}</div>
      <div className="actions">
        <Link to={`/edit/${id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
} 