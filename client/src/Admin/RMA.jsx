import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TablePagination,
  Avatar
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast } from 'sonner';
import { format } from 'date-fns';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'

const RMA = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    orderId: '',
    status: ''
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/rma/admin/requests', {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      const data = Array.isArray(response?.data) ? response.data : [];
      setRequests(data);
    } catch (error) {
      console.error('Fetch Error:', error);
      toast.error('Failed to load requests');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const handleResponseSubmit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/rma/admin/respond/${selectedRequest?._id}`, {
        status: 'Resolved',
        response: responseText
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      toast.success('Response submitted successfully');
      setOpenDialog(false);
      fetchRequests();
    } catch (error) {
      toast.error('Failed to submit response');
    }
  };

  const statusColors = {
    Processing: 'bg-blue-100 text-blue-800',
    Resolved: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800'
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRequests = requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <div className='mt-3 mb-5'>
        <PageTitle value="RMA & Support" />
        <CustomBreadcrumbs
          paths={[
            { label: 'Feedback Manage', href: "/feedbackmanage/rma" },
            { label: 'RMA & Support' },
          ]}
        />
      </div>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 6, mt: 6, alignItems: 'center' }}>
        <TextField
          label="Order ID"
          value={filters.orderId}
          onChange={(e) => setFilters(prev => ({ ...prev, orderId: e.target.value }))}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 56,
              width: 350,
              borderRadius: '4px'
            }
          }}
        />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            label="Status"
            sx={{
              height: 56,
              width: 350,
              borderRadius: '4px',
              '& .MuiSelect-select': {
                paddingTop: '16px',
                paddingBottom: '16px'
              }
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={fetchRequests}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
          sx={{
            padding: "14px 18px",
            width: "200px",
            textTransform: "none",
            fontSize: "16px",
            borderRadius: "10px",
            fontWeight: "bold"
          }}
        >
          Search
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f4e6ff' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>User Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>Loading requests...</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No RMA requests found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRequests.map((request) => (
                <TableRow key={request._id} hover>
                  <TableCell>{request.orderId}</TableCell>
                  <TableCell>{request.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{request.userId?.email || 'N/A'}</TableCell>
                  <TableCell>{request.subject}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
  <Typography
    variant="caption"
    sx={{
      px: 1.5,
      py: 0.5,
      borderRadius: '8px',
      fontWeight: 600,
      display: 'inline-block',
      minWidth: 90,
      textAlign: 'center',
      color:
        request.status === 'Resolved'
          ? '#15803d'
          : request.status === 'Processing'
          ? '#92400e'
          : '#b91c1c',
      bgcolor:
        request.status === 'Resolved'
          ? '#dcfce7'
          : request.status === 'Processing'
          ? '#fef3c7'
          : '#fee2e2',
    }}
  >
    {request.status}
  </Typography>
</TableCell>

                  <TableCell>
                    {format(new Date(request.createdAt), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSelectedRequest(request);
                        setOpenDialog(true);
                      }}
                      sx={{ color: '#641A90' }}
                    >
                      <ReplyIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={requests.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* Response Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md"
  sx={{ '& .MuiDialog-paper': { padding: 4, borderRadius: '16px', boxShadow: 24, width: '900px' } }}>
  <DialogTitle sx={{
    bgcolor: '#f4e6ff', fontWeight: '600', fontSize: '22px', borderBottom: '2px solid #d0b4f2',
    color: '#4b0082', py: 2.5, px: 4, letterSpacing: '0.5px', borderRadius: '16px', marginBottom: '10px'
  }}>
    Manage RMA Request - {selectedRequest?.orderId}
  </DialogTitle>

  <DialogContent sx={{
    py: 2, px: 2, bgcolor: '#faf5ff', borderRadius: '12px', overflow: 'hidden'
  }}>
    {selectedRequest && (
      <Box sx={{
        display: 'flex', flexDirection: 'column', gap: 3, backgroundColor: '#ffffff',
        borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', p: 2, marginTop: '5px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={selectedRequest.userId?.profilePicture}
            sx={{
              width: 65, height: 65, bgcolor: '#c084fc', color: 'white',
              fontSize: 28, border: '3px solid #c084fc'
            }}
          >
            {selectedRequest.userId?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#6b21a8' }}>
              {selectedRequest.userId?.name || 'Unknown User'}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>
              {selectedRequest.userId?.email || 'No Email'}
            </Typography>
          </Box>
        </Box>

        <Typography><strong>Subject:</strong> {selectedRequest.subject}</Typography>
        <Typography><strong>Reason:</strong> {selectedRequest.reason}</Typography>
        <Typography><strong>Message:</strong><br />{selectedRequest.message}</Typography>

        <TextField
          multiline
          rows={4}
          fullWidth
          label="Admin Response"
          variant="outlined"
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              bgcolor: '#f3e8ff',
            },
            '& .MuiInputLabel-root': {
              color: '#7c3aed',
            },
          }}
        />
      </Box>
    )}
  </DialogContent>

  <DialogActions sx={{ px: 2, py: 1 , marginTop: '10px'}}>
    <Button onClick={() => setOpenDialog(false)}
      className="bg-gray-500 hover:bg-gray-200 text-white font-bold"
      sx={{
        textTransform: "none", padding: "14px 18px",
        width: "180px", fontSize: "16px", fontWeight: "bold", borderRadius: "10px"
      }}>
      Cancel
    </Button>
    <Button variant="contained" onClick={handleResponseSubmit}
      className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
      sx={{
        textTransform: "none", padding: "14px 18px",
        width: "180px", fontSize: "16px", fontWeight: "bold", borderRadius: "10px"
      }}>
      Submit Response
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default RMA;
