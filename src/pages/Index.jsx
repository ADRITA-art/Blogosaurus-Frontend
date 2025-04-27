import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Grid,
  Fade,
  Paper,
} from '@mui/material';
import { AddCircleOutline, Person } from '@mui/icons-material';

const fallbackImg = "/assets/undraw_blogging_t042.svg";

export default function Index() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch('https://blogosaurus-1.onrender.com/');
        const data = await response.json();
        setBlogs(data.blogs || []);
        setLoading(false);
      } catch (error) {
        setBlogs([]);
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Hero Section */}
        <Box
          sx={{
            width: '100%',
            minHeight: 320,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: 'linear-gradient(120deg, #23272f 60%, #1565c0 100%)',
            py: 6,
            mb: 4,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              color: '#fff',
              mb: 2,
              letterSpacing: 2,
              textShadow: '0 4px 24px rgba(21,101,192,0.25)',
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              textAlign: 'center',
              width: '100%',
            }}
          >
            Welcome to Blogosaurus
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#bdbdbd',
              mb: 4,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              textAlign: 'center',
              width: '100%',
            }}
          >
            Your personal blogging platform
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleOutline />}
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(21,101,192,0.15)',
            }}
            onClick={() => navigate('/create')}
          >
            Create Your First Blog
          </Button>
        </Box>

        {/* Blog List Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: 'primary.main', mb: 3, letterSpacing: 1 }}
          >
            Recent Blog Posts
          </Typography>
          {loading ? (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h5" color="text.secondary">
                Loading...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please wait while we fetch the latest blog posts.
              </Typography>
            </Box>
          ) : blogs.length === 0 ? (
            <Fade in>
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <img
                  src={fallbackImg}
                  alt="No blogs"
                  style={{ width: 260, marginBottom: 24, opacity: 0.8 }}
                />
                <Typography variant="h6" color="text.secondary" mb={2}>
                  No blog posts available yet.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/create')}
                  startIcon={<AddCircleOutline />}
                  sx={{ fontWeight: 600 }}
                >
                  Be the first to create one!
                </Button>
                {/* Static template blog card for demonstration */}
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ maxWidth: 400, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 6 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} sx={{ color: 'primary.main', mb: 1 }}>
                        Example Blog Title
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        by Example Author
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48 }}>
                        This is a static example blog post. When you create a blog, it will appear here!
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Fade>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {blogs.map(blog => (
                <li
                  key={blog.id}
                  style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', background: '#fff' }}
                  onClick={() => setSelectedBlog(blog)}
                >
                  <h3 style={{ color: '#23272f', marginBottom: 8 }}>{blog.title}</h3>
                  <p style={{ color: '#23272f', marginBottom: 8 }}>
                    {blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content}
                  </p>
                  <p style={{ color: '#1565c0', marginBottom: 0 }}>By User #{blog.author_id}</p>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
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
            <p style={{ color: '#1565c0', fontWeight: 600 }}>By User #{selectedBlog.author_id}</p>
          </div>
        </div>
      )}
    </>
  );
} 