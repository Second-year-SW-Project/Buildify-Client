import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ComplaintSubmit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const userId = localStorage.getItem('userId'); // Assuming user is logged in and userId is stored

  const history = () => {
    navigate('/user/complaintHistory');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('You need to be logged in!');
      return;
    }
    toast.success("UserId found");

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
          <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
            <InputLabel>Complaint Type</InputLabel>
            <Select
              label="Complaint Type"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              fullWidth
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
          <Button type="submit" variant="contained" fullWidth>
            Submit Complaint
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ComplaintSubmit;
