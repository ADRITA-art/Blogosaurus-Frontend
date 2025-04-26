import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <Link to="/create">Create New Blog</Link>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/view/${blog.id}`}>{blog.title}</Link>
            <span> by {blog.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 