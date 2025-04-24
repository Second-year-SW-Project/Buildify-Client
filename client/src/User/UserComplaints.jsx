import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Skeleton,
  useTheme,
  Box
} from '@mui/material';
import {
  CheckCircle,
  Error,
  HourglassTop
} from '@mui/icons-material';

import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import SideNav from './SideNav';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';

const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token');
  const theme = useTheme();

  const statusConfig = {
    pending: {
      color: '#FFA000', // dark yellow
      bg: '#FFF8E1',
      icon: <HourglassTop />
    },
    resolved: {
      color: '#2E7D32', // dark green
      bg: '#E8F5E9',
      icon: <CheckCircle />
    },
    rejected: {
      color: '#C62828', // dark red
      bg: '#FFEBEE',
      icon: <Error />
    },
    'in progress': {
      color: '#1565C0', // dark blue
      bg: '#E3F2FD',
      icon: <HourglassTop />
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/complaints/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(response.data);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId, token]);

  const getStatusChip = (status) => {
    const config = statusConfig[status.toLowerCase()] || {};
    return (
      <Chip
        label={status}
        icon={config.icon}
        sx={{
          textTransform: 'capitalize',
          backgroundColor: config.bg || theme.palette.grey[100],
          color: config.color || theme.palette.text.primary,
          fontWeight: 'bold'
        }}
      />
    );
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#A133FD', // dark purple
    mr: 1
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={150}
            sx={{ mb: 2, borderRadius: 2 }}
          />
        ))}
      </Container>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <SideNav />

        <main className="flex-1 mt-36 p-6 pl-64">
          <div className="mt-3 mb-5">
            <Box
              sx={{
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <div className="mt-2 mb-5">
                <PageTitle value="Complaint History" />
                <CustomBreadcrumbs
                  paths={[
                    { label: 'User Complaints', href: '/user/complaintHistory' },
                    { label: 'History' }
                  ]}
                />
              </div>

              {complaints.length === 0 ? (
                <Stack alignItems="center" spacing={2} sx={{ py: 8 , mt:6}}>
                  <Error sx={{ fontSize: 60, color: 'text.secondary' }} />
                  <Typography variant="h6" color="text.secondary">
                    No complaints found
                  </Typography>
                </Stack>
              ) : (
                complaints.map((complaint) => (
                  <Card
                    key={complaint._id}
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      borderLeft: '6px solid #A133FD', // deep purple accent
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[6]
                      }
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ ...labelStyle, minWidth: '120px' }}>
                            Subject:
                          </Typography>
                          <Typography variant="body1">{complaint.title}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ ...labelStyle, minWidth: '120px' }}>
                            Type:
                          </Typography>
                          <Typography variant="body1">
                            {complaint.complaintType || 'General'}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ ...labelStyle, minWidth: '120px' }}>
                            Date:
                          </Typography>
                          <Typography variant="body1">
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ ...labelStyle, minWidth: '120px' }}>
                            Status:
                          </Typography>
                          {getStatusChip(complaint.status)}
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ ...labelStyle, minWidth: '120px' }}>
                            Description:
                          </Typography>
                          <Typography variant="body1">{complaint.description}</Typography>
                        </Box>

                        {complaint.response && (
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ ...labelStyle, minWidth: '120px' }}>
                              Admin Response:
                            </Typography>
                            <Typography variant="body1">{complaint.response}</Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserComplaints;
