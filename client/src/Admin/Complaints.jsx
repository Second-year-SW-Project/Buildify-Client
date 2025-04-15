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
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
            style={{
              padding: "14px 18px",
              width: "180px",
              textTransform: "none",
              fontSize: "16px",
              borderRadius: "10px",
              fontWeight: "bold"
            }}
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
                <TableCell  style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}>
            User Details
            </TableCell>

                <TableCell  style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}>Date</TableCell>
                <TableCell  style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}>Complaint</TableCell>
                <TableCell  style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}>Complaint Type</TableCell>
                <TableCell  style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}>Status</TableCell>
                <TableCell  style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((complaint) => (
                  <TableRow key={complaint._id} className="hover:bg-gray-50">
                    <TableCell className="py-4">
                      <Box className="flex items-center space-x-3">
                      <Avatar 
    src={complaint.user?.profilePicture || ''} 
    sx={{ width: 40, height: 40, marginRight: 2 }}
  >
    {!complaint.user?.profilePicture && complaint.user?.name.charAt(0).toUpperCase()}
  </Avatar>
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
      <div>
        
      </div>

      {/* Response Dialog */}
      <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  maxWidth="md"
  fullWidth
  PaperProps={{
    className:
      "rounded-3xl border border-purple-200 shadow-2xl bg-white/90 backdrop-blur-md transition-all duration-300",
    sx: { overflow: 'hidden',
      borderRadius: '24px', // optional if you want to ensure MUI applies radius
     }, // ensures border radius applies
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
  <DialogContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 rounded-2xl ">
    {selectedComplaint && (
      <>
        {/* User Info Card */}
        <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-white p-5 rounded-2xl border border-purple-300 shadow-sm transition-transform hover:scale-[1.01] mt-6">
          <div className="flex items-start space-x-5">
           
            <Avatar 
                src={selectedComplaint.user?.profilePicture || ''} 
                 sx={{ width: 56, height: 56 }}
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
        <div className="h-[1px] bg-purple-100 my-3 rounded-full"></div>

        {/* Admin Response */}
        <div className="space-y-4">
          <Typography variant="subtitle1" className="font-semibold text-purple-800 text-lg flex items-center gap-1">
            ✍️ Your Response
          </Typography>

          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Reply to complaint"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            sx={{
              backgroundColor: '#F9F5FF',
              borderRadius: '16px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
              },
            }}
          />

          {selectedComplaint.response && (
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl shadow-inner">
              <Typography variant="subtitle2" className="font-semibold mb-1 text-purple-700">
                📌 Previous Response
              </Typography>
              <Typography className="text-gray-700 text-sm whitespace-pre-line font-medium">
                {selectedComplaint.response}
              </Typography>
            </div>
          )}
        </div>
      </>
    )}
  </DialogContent>

  {/* Dialog Footer */}
  <DialogActions
    sx={{
      backgroundColor: '#F3E8FF',
      px: 5,
      py: 3,
      borderTop: '1px solid #ddd',
      borderBottomLeftRadius: '24px',
      borderBottomRightRadius: '24px',
    }}
    className="flex justify-between"
  >
    <Button
      onClick={() => setOpenDialog(false)}
      className="bg-gray-500 hover:bg-gray-200 text-white font-bold"
            sx={{
              textTransform: "none",
              padding: "14px 18px",
              width: "180px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px"
            }} >
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleRespond}
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
