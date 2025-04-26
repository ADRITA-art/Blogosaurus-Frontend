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
  const navigate = useNavigate();

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
              </Box>
            </Fade>
          ) : (
            <Grid container spacing={4}>
              {blogs.map(blog => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <Fade in timeout={600}>
                    <Card
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 6,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-6px) scale(1.03)',
                          boxShadow: 12,
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                            <Person />
                          </Avatar>
                          <Typography variant="subtitle2" color="text.secondary">
                            {blog.author || 'Anonymous'}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ color: 'primary.main', mb: 1 }}
                        >
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, minHeight: 48 }}
                        >
                          {blog.content?.substring(0, 120)}...
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          component={Link}
                          to={`/view/${blog.id}`}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        >
                          Read More
                        </Button>
                      </CardActions>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
} 