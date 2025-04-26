import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDashboard } from '../api/blogApi';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const loadDashboard = async () => {
      try {
        const response = await fetchDashboard(token);
        if (Array.isArray(response.blogs)) {
          setBlogs(response.blogs);
        } else {
          setBlogs([]);
        }
        if (response.username) {
          setUsername(response.username);
        }
      } catch (err) {
        setBlogs([]);
        // If unauthorized, redirect to login
        if (err && err.message && err.message.toLowerCase().includes('unauthorized')) {
          navigate('/login');
        }
      }
    };
    loadDashboard();
  }, [navigate]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {/* Gradient Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: 'linear-gradient(120deg, #181a1b 60%, #1565c0 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', maxWidth: 1000, margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Dashboard</h1>
        {username && <h2 style={{ color: '#bdbdbd', marginBottom: 32 }}>Welcome, {username}!</h2>}
        <Link to="/create" style={{ color: '#1565c0', fontWeight: 600, marginBottom: 32, display: 'inline-block' }}>Create New Blog</Link>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: 32 }}>
          {blogs.length === 0 ? (
            <div style={{ color: '#fff', fontSize: 18 }}>No blogs found.</div>
          ) : (
            blogs.map(blog => (
              <div
                key={blog.id}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 8px 32px 0 rgba(21,101,192,0.15)',
                  padding: '1.5rem',
                  minWidth: 280,
                  maxWidth: 350,
                  flex: '1 1 300px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  color: '#23272f',
                  marginBottom: 16,
                }}
                onClick={() => setSelectedBlog(blog)}
              >
                <h3 style={{ color: '#1565c0', marginBottom: 12 }}>{blog.title}</h3>
                <p style={{ color: '#23272f', marginBottom: 12 }}>{blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content}</p>
                <span style={{ color: '#888', fontSize: 14 }}>Blog ID: {blog.id}</span>
              </div>
            ))
          )}
        </div>
        {/* Blog Modal */}
        {selectedBlog && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={() => setSelectedBlog(null)}
          >
            <div
              style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: 12,
                maxWidth: 600,
                width: '90vw',
                boxShadow: '0 8px 32px 0 rgba(21,101,192,0.25)',
                position: 'relative',
                color: '#23272f',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBlog(null)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 16,
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#1565c0',
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 style={{ color: '#1565c0', marginBottom: 12 }}>{selectedBlog.title}</h2>
              <p style={{ color: '#23272f', marginBottom: 16 }}>{selectedBlog.content}</p>
              <span style={{ color: '#888', fontSize: 14 }}>Blog ID: {selectedBlog.id}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 