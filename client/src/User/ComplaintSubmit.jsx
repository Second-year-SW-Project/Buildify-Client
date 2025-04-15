import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Navbar from '../MoleculesComponents/User_component/Navbar';

const ComplaintSubmit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const userId = localStorage.getItem('userId');

  const history = () => {
    navigate('/user/complaintHistory');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('You need to be logged in!');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/complaints/submit', { 
        title, description, complaintType, userId 
      });
      toast.success('Complaint submitted successfully!');
      navigate('/user/complaintHistory');
    } catch (err) {
      toast.error('Failed to submit complaint');
    }
  };

  return (
    <Container 
  maxWidth={false} 
  disableGutters 
>
  <Navbar />

      <Box sx={{ 
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      }}>
        <Button 
          onClick={history} 
          variant="contained"
          className="ml-2 px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
        >
          View Complaint History
        </Button>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Complaint Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              marginTop: '2rem',
              marginBottom: '2rem', // Increased margin
             
            }}
            
          />
          
          <FormControl fullWidth sx={{ marginBottom: '2rem' }}>
            <InputLabel sx={{ color: '#64748b' }}>Complaint Type</InputLabel>
            <Select
              label="Complaint Type"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              sx={{
                 // Increased margin
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#6b21a8' }, // Purple color for outline (bg-purple-700 equivalent)
                  '&.Mui-focused fieldset': { borderColor: '#6b21a8' } // Purple color for focused state
                },
                '& .MuiInputLabel-root': { color: '#64748b' },
                '& .MuiOutlinedInput-input': { backgroundColor: 'white' }, // Remove inner background
              }}
              
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: '8px',
                    marginTop: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '& .MuiMenuItem-root': {
                      padding: '12px 16px',
                      '&:hover': { backgroundColor: '#f1f5f9' }
                    }
                  }
                }
              }}
            >
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Billing">Billing</MenuItem>
              <MenuItem value="Customer Service">Customer Service</MenuItem>
              <MenuItem value="Product Quality">Product Quality</MenuItem>
              <MenuItem value="Delivery Issue">Delivery Issue</MenuItem>
              <MenuItem value="Refund Issue">Refund Issue</MenuItem>
              <MenuItem value="Warranty Claim">Warranty Claim</MenuItem>
              <MenuItem value="Account Issue">Account Issue</MenuItem>
              <MenuItem value="Shipping Delay">Shipping Delay</MenuItem>
              <MenuItem value="Service Request">Service Request</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
              <MenuItem value="Policy Clarification">Policy Clarification</MenuItem>
              <MenuItem value="Security Concern">Security Concern</MenuItem>
              <MenuItem value="Privacy Issue">Privacy Issue</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Complaint Description"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              marginBottom: '2rem', // Increased margin
              
            }}
            
          />
          
          <Button 
            type="submit" 
            variant="contained"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
          >
            Submit Complaint
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ComplaintSubmit;
