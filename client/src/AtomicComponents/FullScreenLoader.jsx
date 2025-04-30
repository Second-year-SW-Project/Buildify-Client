
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const FullScreenLoader = ({ open, message = 'Loading...' }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2, color: '#fff' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default FullScreenLoader;
