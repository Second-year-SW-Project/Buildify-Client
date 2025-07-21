import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ComplaintSubmit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const userId = localStorage.getItem('userId'); // Assuming user is logged in and userId is stored

  const history = () => {
    navigate('/auth/usercomplaint');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('You need to be logged in!');
      return;
    }
    toast.success("UserId found");

    try {
      await axios.post('https://buildify-server-d5yu.vercel.app/api/complaints/submit', { 
        title, description, userId 
      });
      toast.success('Complaint submitted successfully!');
      navigate('/auth/usercomplaint');
    
    } catch (err) {
      toast.error('Failed to submit complaint');
    }
  };

  // Create a custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#641A90', // Purple
      },
      secondary: {
        main: '#b19cd9', // Light Purple
      },
      background: {
        default: '#fff', // White background
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px' }}>
          <Button onClick={history} variant="outlined" sx={{ marginBottom: '1rem' }}>
            Complaint History
          </Button>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Complaint Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              label="Complaint Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit Complaint
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ComplaintSubmit;
