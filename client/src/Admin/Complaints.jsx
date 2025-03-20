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
          <Typography variant="h4" className="font-bold text-black">
            Complaints Management
          </Typography>
          <div className="flex gap-4">
            <Button variant="text" className="text-black">Reviews</Button>
            <Button variant="text" className="text-black font-bold border-b-2 border-purple-600">
              Complaints
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 mb-6">
          <TextField
            placeholder="Search complaints..."
            variant="outlined"
            size="small"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl className="w-48">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            className="bg-purple-600 hover:bg-purple-700 text-white"
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
            <TableHead className="bg-#F4E6FF-100">
              <TableRow>
                <TableCell className="font-bold text-black py-3">User Details</TableCell>
                <TableCell className="font-bold text-black py-3">Date</TableCell>
                <TableCell className="font-bold text-black py-3">Complaint</TableCell>
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

      {/* Response Dialog (Keep existing dialog implementation) */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ className: "rounded-lg" }}
      >
        {/* Dialog content remains the same as previous implementation */}
      </Dialog>
    </div>
  );
};

export default Complaints;