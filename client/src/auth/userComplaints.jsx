import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token'); // Retrieve token for auth

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userId) return; // Prevent API call if no userId exists

      try {
        const response = await axios.get(`https://buildify-server-d5yu.vercel.app/api/complaints/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        });
        setComplaints(response.data);
      } catch (err) {
        alert('Failed to fetch complaints');
      }
    };

    fetchComplaints();
  }, [userId, token]);

  // Create a custom theme with the purple color #641A90
  const theme = createTheme({
    palette: {
      primary: {
        main: '#641A90', // Custom purple color
      },
      secondary: {
        main: '#9b4d96', // Lighter purple (optional)
      },
      background: {
        default: '#fff', // White background
      },
    },
    typography: {
      h4: {
        fontWeight: 'bold',
        color: '#641A90', // Purple color for headers
      },
      h6: {
        fontWeight: 'bold',
        color: '#641A90', // Purple color for titles
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ marginTop: '2rem' }}>
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px' }}>
          <Typography variant="h4" gutterBottom>
            Your Complaints
          </Typography>

          {complaints.length === 0 ? (
            <Typography>No complaints found</Typography>
          ) : (
            complaints.map((complaint) => (
              <Paper
                key={complaint._id}
                sx={{
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
                  '&:hover': {
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', // Hover effect for cards
                  },
                }}
              >
                <Typography variant="h6">{complaint.title}</Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                  {complaint.description}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                  <strong>Status:</strong> {complaint.status}
                </Typography>
                {complaint.response && (
                  <Typography variant="body2" sx={{ marginTop: '1rem', color: '#641A90' }}>
                    <strong>Admin Response:</strong> {complaint.response}
                  </Typography>
                )}
              </Paper>
            ))
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserComplaints;
