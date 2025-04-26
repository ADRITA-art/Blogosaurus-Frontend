import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../api/blogApi';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Modal,
  Fade,
  Backdrop,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const accentBlue = '#1565c0'; // Darker blue

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: accentBlue },
    background: { default: '#181a1b', paper: '#23272f' },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

export default function CreateBlog() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Watch form fields for preview
  const title = watch('title', '');
  const content = watch('content', '');

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      await createBlog(data, token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create blog:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            py: 6,
            px: 2,
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 6,
              borderRadius: 4,
              bgcolor: 'background.paper',
              width: '100%',
              maxWidth: 900, // Bigger box
              minHeight: 600,
            }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              mb={4}
              sx={{ color: 'primary.main', fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              Create New Blog
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
                InputLabelProps={{ style: { color: '#bdbdbd' } }}
              />
              <TextField
                label="Content"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                minRows={16}
                {...register('content', { required: 'Content is required' })}
                error={!!errors.content}
                helperText={errors.content?.message}
                InputLabelProps={{ style: { color: '#bdbdbd' } }}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => setPreviewOpen(true)}
                  sx={{
                    flex: 1,
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    transition: 'background 0.2s, color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(21,101,192,0.15)', // semi-transparent dark blue
                      color: '#fff', // white text on hover for contrast
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  Preview
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ flex: 2, fontWeight: 600 }}
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Blog'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Preview Modal */}
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 400,
              sx: { backgroundColor: 'rgba(24,26,27,0.95)' },
            },
          }}
        >
          <Fade in={previewOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90vw', sm: 700 },
                bgcolor: 'rgba(35,39,47,0.92)', // Transparent modal
                borderRadius: 4,
                boxShadow: 24,
                p: 5,
                outline: 'none',
                backdropFilter: 'blur(4px)',
                maxHeight: '80vh', // Limit modal height
                overflowY: 'auto', // Enable vertical scroll
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                mb={2}
                fontWeight={700}
                sx={{ letterSpacing: 1 }}
              >
                Blog Preview
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                mb={1}
                fontWeight={600}
              >
                {title || 'Blog Title'}
              </Typography>
              <Box
                sx={{
                  color: 'text.secondary',
                  whiteSpace: 'pre-wrap',
                  minHeight: 120,
                  borderTop: '1px solid #333',
                  pt: 2,
                  fontSize: '1.08rem',
                }}
              >
                {content || (
                  <span style={{ color: '#555' }}>
                    Start typing your blog content to see a preview...
                  </span>
                )}
              </Box>
              <Button
                onClick={() => setPreviewOpen(false)}
                variant="contained"
                color="primary"
                sx={{ mt: 3, float: 'right' }}
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </ThemeProvider>
  );
} 