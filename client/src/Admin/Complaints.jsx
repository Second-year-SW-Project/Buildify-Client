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

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [responseText, setResponseText] = useState('');
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
      const response = await axios.get('http://localhost:8000/api/complaints/admin', {
        params: { search: searchTerm, status: statusFilter }
      });
      setComplaints(response.data);
    } catch (err) {
      alert('Failed to fetch complaints');
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleRespond = async () => {
    try {
      await axios.put(`http://localhost:8000/api/complaints/admin/respond/${selectedComplaint._id}`, {
        status: 'Resolved',
        response: responseText
      });
      toast.success('Response submitted!');
      setOpenDialog(false);
      setResponseText('');
      fetchComplaints();
    } catch (err) {
      toast.error('Failed to submit response');
    }
  };

  return (
    <div className="p-6 h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className='mt-3 mb-5'>
                                  <PageTitle value="Complaint Management"></PageTitle>
                                  <CustomBreadcrumbs
                                      paths={[
                                          { label: 'Feedback Manage', href: "/feedbackmanage/complaints" },
                                          { label: 'Complaint Management' },
                                      ]} />
                              </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="flex gap-4 mb-6 items-center">
          <TextField
            placeholder="Search complaints..."
            variant="outlined"
            size="small"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 56,
                borderRadius: '8px',
                '&:hover fieldset': { borderColor: '#641A90' },
                '&.Mui-focused fieldset': { borderColor: '#641A90' }
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

          <Button
            variant="contained"
            className="bg-purple-600 hover:bg-purple-700 text-white h-[56px]"
            onClick={fetchComplaints}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Complaints Table */}
      <Paper className="rounded-lg shadow">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F4E6FF' }}>
                <TableCell className="font-bold text-black py-3">User Details</TableCell>
                <TableCell className="font-bold text-black py-3">Date</TableCell>
                <TableCell className="font-bold text-black py-3">Complaint</TableCell>
                <TableCell className="font-bold text-black py-3">Complaint Type</TableCell>
                <TableCell className="font-bold text-black py-3">Status</TableCell>
                <TableCell className="font-bold text-black py-3">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((complaint) => (
                  <TableRow key={complaint._id} className="hover:bg-gray-50">
                    <TableCell className="py-4">
                      <Box className="flex items-center space-x-3">
                        <Avatar src={complaint.user?.avatar} sx={{ width: 40, height: 40 }} />
                        <Box>
                          <Typography className="font-semibold text-gray-900">
                            {complaint.user?.name}
                          </Typography>
                          <Typography className="text-sm text-gray-500">
                            {complaint.user?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-black">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(complaint.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 text-gray-600">
                      {complaint.description}
                    </TableCell>

                    <TableCell className="py-4 text-gray-600">
                      {complaint.complaintType}
                    </TableCell>

                    <TableCell className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <IconButton 
                        className="text-purple-600 hover:bg-purple-50"
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setOpenDialog(true);
                        }}
                      >
                        <ReplyIcon fontSize="small" />
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
      <div>
        
      </div>

      {/* Response Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ className: "rounded-lg" }}
      >
        <DialogTitle sx={{ backgroundColor: '#F4E6FF', color: 'black' }}>
          <div className="flex justify-between items-center">
            <Typography variant="h6">Respond to Complaint</Typography>
            <Typography variant="caption">
              {selectedComplaint && new Date(selectedComplaint.createdAt).toLocaleString()}
            </Typography>
          </div>
        </DialogTitle>

        <DialogContent className="p-6 space-y-6">
          {selectedComplaint && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar src={selectedComplaint.user?.avatar} sx={{ width: 40, height: 40 }} />
                  <div>
                    <Typography className="font-semibold">{selectedComplaint.user?.name}</Typography>
                    <Typography className="text-sm text-gray-500">
                      {selectedComplaint.user?.email}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border rounded-lg">
                <Typography className="text-gray-600">
                  {selectedComplaint.description}
                </Typography>
              </div>

              <div className="space-y-4">
                <Typography variant="subtitle1" className="font-bold">Admin Response</Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  label="Type your response"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="rounded-lg"
                />

                {selectedComplaint.response && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Typography variant="subtitle2" className="font-bold mb-2">
                      Previous Response
                    </Typography>
                    <Typography className="text-gray-600">
                      {selectedComplaint.response}
                    </Typography>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#F4E6FF', padding: '16px' }}>
          <Button
            onClick={() => setOpenDialog(false)}
            className="text-gray-700 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#641A90',
              '&:hover': { backgroundColor: '#4A136B' }
            }}
            onClick={handleRespond}
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Complaints;
