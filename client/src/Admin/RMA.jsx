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
  CircularProgress
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast } from 'sonner';
import { format } from 'date-fns';

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

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/rma/admin/requests', {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      // Ensure response is always an array
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        RMA Management
      </Typography>

      {/* Search Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Order ID"
          value={filters.orderId}
          onChange={(e) => setFilters(prev => ({ ...prev, orderId: e.target.value }))}
          size="small"
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            label="Status"
            size="small"
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
          sx={{ height: 40 }}
        >
          Search
        </Button>
      </Box>

      {/* Requests Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f4e6ff' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>Loading requests...</Typography>
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No RMA requests found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request._id} hover>
                  <TableCell>{request.orderId}</TableCell>
                  <TableCell>{request.subject}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        ...statusColors[request.status]
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
      </TableContainer>

      {/* Response Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: '#f4e6ff' }}>
          Manage RMA Request - {selectedRequest?.orderId}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedRequest && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2">Subject:</Typography>
                <Typography>{selectedRequest.subject}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Reason:</Typography>
                <Typography>{selectedRequest.reason}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Message:</Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedRequest.message}
                </Typography>
              </Box>
              <TextField
                multiline
                rows={4}
                fullWidth
                label="Admin Response"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#f4e6ff', px: 3, py: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleResponseSubmit}
            sx={{ bgcolor: '#641A90', '&:hover': { bgcolor: '#4A136B' } }}
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RMA;