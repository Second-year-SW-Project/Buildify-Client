import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Navbar from '../MoleculesComponents/User_component/Navbar';
import SideNav from './SideNav';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'

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
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <SideNav />

        <main className="flex-1 mt-36 p-6 pl-64">
          <div className='mt-3 mb-5'>
            <Box sx={{ 
              backgroundColor: 'white',
              padding : '2.5rem',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}>
              <div className='mt-3 mb-5'>
                <PageTitle value="User Complaints" />
                <CustomBreadcrumbs
                  paths={[
                    { label: 'User', href: "/user/complaints" },
                    { label: 'Complaints' },
                  ]} 
                />
              </div>

              <Button 
                onClick={history} 
                variant="contained"
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
                sx={{
                  textTransform: "none",
                  padding: "14px 18px",
                  width: "250px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  marginBottom: "2rem"
                }}
              >
                View Complaint History
              </Button>

              <form onSubmit={handleSubmit}>
                {/* Title and Type Side by Side */}
                <Box sx={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
                  <TextField
                    label="Complaint Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#64748b' }}>Complaint Type</InputLabel>
                    <Select
                      label="Complaint Type"
                      value={complaintType}
                      onChange={(e) => setComplaintType(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '& fieldset': { borderColor: '#6b21a8' },
                          '&.Mui-focused fieldset': { borderColor: '#6b21a8' }
                        },
                        '& .MuiInputLabel-root': { color: '#64748b' },
                        '& .MuiOutlinedInput-input': { backgroundColor: 'white' },
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
                </Box>

                {/* Description */}
                <TextField
                  label="Complaint Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={7}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    marginBottom: '3rem',
                  }}
                />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  variant="contained"
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
                  sx={{
                    textTransform: "none",
                    padding: "14px 18px",
                    width: "180px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "10px"
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplaintSubmit;
