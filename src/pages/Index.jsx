import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import Navbar from '../components/Navbar';

export default function Index() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load blogs:', error);
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="loading">
            <h2>Loading...</h2>
            <p>Please wait while we fetch the latest blog posts.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <header className="hero-section">
          <h1>Welcome to Blogosaurus</h1>
          <p className="subtitle">Your personal blogging platform</p>
        </header>

        <section className="blog-section">
          <h2>Recent Blog Posts</h2>
          {blogs.length === 0 ? (
            <p className="no-blogs">No blog posts available yet. Be the first to create one!</p>
          ) : (
            <div className="blog-list">
              {blogs.map(blog => (
                <article key={blog.id} className="blog-preview">
                  <h3>{blog.title}</h3>
                  <p className="author">By {blog.author}</p>
                  <p className="excerpt">{blog.content?.substring(0, 150)}...</p>
                  <Link to={`/view/${blog.id}`} className="read-more">Read More</Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
} 