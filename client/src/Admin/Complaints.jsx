import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Avatar,
  Typography,
  Box,
  TablePagination
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast } from 'sonner';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import debounce from 'lodash.debounce';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [responseText, setResponseText] = useState('');
  const [status, setStatus] = useState('Pending');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/complaints/admin`, {
        params: { search: searchTerm, status: statusFilter }
      });
      setComplaints(response.data);
    } catch (err) {
      alert('Failed to fetch complaints');
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchComplaints();
    }, 400); // adjust delay to your liking
  
    debouncedFetch();
  
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm, statusFilter]);
  

  const handleRespond = async () => {
    try {
      await axios.put(`${backendUrl}/api/complaints/admin/respond/${selectedComplaint._id}`, {
        status,
        response: responseText
      });
      toast.success('Response submitted!');
      setOpenDialog(false);
      setResponseText('');
      setStatus('Pending');
      fetchComplaints();
    } catch (err) {
      toast.error('Failed to submit response');
    }
  };

  return (
    <div className="p-6 h-screen bg-white">
      {/* Header Section */}
      <div className="mt-3 mb-5">
        <div>
      
            <PageTitle value="Complaint Management"></PageTitle>
            <CustomBreadcrumbs
              paths={[
                { label: 'Feedback Manage', href: "/feedbackmanage/complaints" },
                { label: 'Complaint Management' },
              ]}
            />
          </div>
        </div>

<Box className="mb-10 border-2 border-black-200 rounded-md mt-6">
        {/* Search and Filter Section */}
        <div className="flex gap-4 mb-2 items-center p-5">
          <TextField
            placeholder="Search"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 56,
                borderRadius: '8px',
              }
            }}
          />

          <FormControl className="w-48">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              sx={{
                height: 56,
                borderRadius: '8px',
                '& .MuiSelect-select': {
                  paddingTop: '16px',
                  paddingBottom: '16px'
                }
              }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>

         
        
      </div>

      

      <Paper className="rounded-lg shadow">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F4E6FF' }}>
                {['User Details', 'Date', 'Complaint', 'Complaint Type', 'Status', 'Action'].map(header => (
                  <TableCell key={header} style={{
                    padding: "8px 16px",
                    textAlign: "left",
                    verticalAlign: "middle",
                    color: "grey",
                    fontWeight: "bold",
                    borderBottom: "1px solid #e0e0e0"
                  }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((complaint) => (
                  <TableRow key={complaint._id} className="hover:bg-gray-50">
                    <TableCell>
                      <Box className="flex items-center space-x-3">
                        <Avatar
                          src={complaint.user?.profilePicture || ''}
                          sx={{ width: 40, height: 40, marginRight: 2 }}
                        >
                          {!complaint.user?.profilePicture && complaint.user?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography className="font-bold text-black">{complaint.user?.name}</Typography>
                          <Typography className="text-sm text-black font-semibold">{complaint.user?.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm text-black font-bold">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-black">
                          {new Date(complaint.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-black font-bold">{complaint.description}</TableCell>
                    <TableCell className="text-black font-bold">{complaint.complaintType}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm whitespace-nowrap ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className="text-purple-600 hover:bg-purple-50"
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setOpenDialog(true);
                          setResponseText('');
                          setStatus(complaint.status || 'Pending');
                        }}
                      >
                        <ReplyIcon fontSize="30px" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={complaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Box>

      
      {/* Response Dialog */}
       {/* Response Dialog */}
       <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: "rounded-3xl border border-purple-200 shadow-2xl bg-white/90 backdrop-blur-md transition-all duration-300",
          sx: { overflow: 'hidden', borderRadius: '24px' },
        }}
      >
        {/* Dialog Header */}
        <DialogTitle
          sx={{
            backgroundColor: '#F3E8FF',
            color: '#3A0C6F',
            px: 5,
            py: 3.5,
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <div className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold tracking-wide flex items-center gap-2">
              📝 Respond to Complaint
            </Typography>
            <Typography variant="caption" className="text-sm text-gray-600 italic">
              {selectedComplaint && new Date(selectedComplaint.createdAt).toLocaleString()}
            </Typography>
          </div>
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 rounded-2xl">
          {selectedComplaint && (
            <>
              {/* User Info Card */}
              <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-white p-5 rounded-2xl border border-purple-300 shadow-sm transition-transform hover:scale-[1.01] mt-6">
                <div className="flex items-start space-x-5">
                  <Avatar 
                    src={selectedComplaint.user?.profilePicture || ''} 
                    sx={{ width: 56, height: 56, bgcolor: '#c084fc' }}
                    className="ring-2 ring-purple-500"
                  >
                    {!selectedComplaint.user?.profilePicture && selectedComplaint.user?.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div className="mt-1">
                    <Typography className="font-bold text-purple-900 text-lg">
                      {selectedComplaint.user?.name}
                    </Typography>
                    <Typography className="text-sm text-gray-600 mt-1">
                      {selectedComplaint.user?.email}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Complaint Description */}
              <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md">
                <Typography className="text-gray-700 leading-relaxed text-base whitespace-pre-line font-medium">
                  {selectedComplaint.description}
                </Typography>
              </div>

              {/* Divider */}
              <div className="my-4 h-1 w-full bg-gradient-to-r from-purple-100 via-purple-300 to-purple-100 rounded-xl mx-auto"></div>

              {/* Previous Response */}
              {selectedComplaint.response && (
                <div className="p-5 bg-gray-100 border border-gray-200 rounded-2xl shadow-sm">
                  <Typography className="text-gray-800 leading-relaxed text-base font-medium">
                    <span className="font-bold">Previous Response:</span>
                    <div className="mt-2">{selectedComplaint.response}</div>
                  </Typography>
                </div>
              )}

              {/* Response Section */}
              <div className="flex flex-col space-y-5">
                {/* Select Complaint Status */}
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    sx={{ height: 56, borderRadius: '8px' }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                  </Select>
                </FormControl>

                {/* Response Text */}
                <TextField
                  label="Response"
                  variant="outlined"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ borderRadius: '8px' }}
                />
              </div>
            </>
          )}
        </DialogContent>

        {/* Dialog Footer */}
        <DialogActions sx={{ px: 5, py: 3, backgroundColor: '#F9F7FF' }}>
          <Button onClick={() => setOpenDialog(false)} variant="text"  className="bg-gray-500 hover:bg-gray-200 text-white font-bold"
            sx={{
              textTransform: "none", padding: "14px 18px",
              width: "180px", fontSize: "16px", fontWeight: "bold", borderRadius: "10px"
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleRespond}
            variant="contained"
            color="primary"
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
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Complaints;
