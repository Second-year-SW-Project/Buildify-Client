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
import { CheckCircle, Error, HourglassTop } from '@mui/icons-material';

import Navbar from '../MoleculesComponents/User_component/Navbar';
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
    pending: { color: theme.palette.warning.main, icon: <HourglassTop /> },
    resolved: { color: theme.palette.success.main, icon: <CheckCircle /> },
    rejected: { color: theme.palette.error.main, icon: <Error /> },
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/complaints/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const getStatusChip = (status) => (
    <Chip
      label={status}
      variant="outlined"
      sx={{
        textTransform: 'capitalize',
        borderColor: statusConfig[status]?.color || theme.palette.grey[400],
        color: statusConfig[status]?.color || theme.palette.grey[600],
      }}
      icon={statusConfig[status]?.icon}
    />
  );

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
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            >
              <div className="mt-3 mb-5">
                <PageTitle value="Complaint History" />
                <CustomBreadcrumbs
                  paths={[
                    { label: 'User Complaints', href: '/user/complaintHistory' },
                    { label: 'History' },
                  ]}
                />
              </div>

              {complaints.length === 0 ? (
                <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
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
                      mb: 2,
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={1}
                        sx={{ mb: 1.5 }}
                      >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                          {complaint.title}
                        </Typography>
                        {getStatusChip(complaint.status)}
                      </Stack>

                      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                      <Chip
  label={complaint.complaintType || 'No Type'}
  size="small"
  color="secondary"
  variant="outlined"
/>

                        <Typography variant="body2" color="text.secondary">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </Typography>
                      </Stack>

                      <Typography variant="body1" color="text.primary" paragraph>
                        {complaint.description}
                      </Typography>

                      {complaint.response && (
                        <Stack
                          spacing={1}
                          sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: 1,
                            backgroundColor: theme.palette.grey[100],
                          }}
                        >
                          <Typography variant="subtitle2" color="primary.main">
                            Admin Response:
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {complaint.response}
                          </Typography>
                        </Stack>
                      )}
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
