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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply'; // Import the Reply icon
import { toast } from 'sonner';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [status, setStatus] = useState('');
  const [responseText, setResponseText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints based on the current search parameters
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/complaints/admin', {
        params: { name: searchName, email: searchEmail, status }
      });
      setComplaints(response.data);
    } catch (err) {
      alert('Failed to fetch complaints');
    }
  };

  useEffect(() => {
    fetchComplaints(); // Initially fetch complaints when the component loads
  }, []); // Empty dependency array so it runs once on component mount

  const handleRespond = async () => {
    const status = 'Resolved';
    try {
      await axios.put(`http://localhost:8000/api/complaints/admin/respond/${selectedComplaint._id}`, {
        status,
        response: responseText
      });
      toast.success('Complaint updated!');
      setResponseText(''); // Clear the response input field
      setOpenDialog(false); // Close the dialog
      fetchComplaints(); // Fetch updated complaints list after response
    } catch (err) {
      toast.alert('Failed to update complaint');
    }
  };

  const handleOpenDialog = (complaint) => {
    setSelectedComplaint(complaint); // Set the selected complaint data
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setResponseText(''); // Clear response field
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <div style={{ padding: "30px" }}>
      <h2>Admin: View All Complaints</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <TextField
          label="Search by Email"
          variant="outlined"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value=""><em>All Status</em></MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
  variant="contained"
  sx={{ backgroundColor: '#641A90' }} // Custom purple background color
  onClick={fetchComplaints} // Fetch complaints based on the current search parameters
>
  Search
</Button>

      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User Details</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <TableCell>{complaint.title}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.status}</TableCell>
                <TableCell>
                  <div><strong>User:</strong> {complaint.user?.name}</div>
                  <div><strong>Email:</strong> {complaint.user?.email}</div>
                </TableCell>
                <TableCell>
                  <Tooltip title="Reply to Complaint">
                  <IconButton
  sx={{ color: '#641A90' }} // Custom color for the icon button
  onClick={() => handleOpenDialog(complaint)} // Open dialog with specific complaint
>
  <ReplyIcon />
</IconButton>

                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for admin response */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md" // Set the dialog to a medium size
        fullWidth // Makes the dialog take full width of the screen
      >
        <DialogTitle sx={{ backgroundColor: '#641A90', color: 'white' }}>
          Respond to Complaint
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f3e5f5' }}>
          {selectedComplaint && (
            <div>
              <strong>Title:</strong> {selectedComplaint.title}
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              <div>
                <strong>User:</strong> {selectedComplaint.user?.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedComplaint.user?.email}
              </div>
              <TextField
                label="Response"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your response"
                sx={{ marginTop: '20px' }}
              />
              <div>
                <strong>Latest Response:</strong>
                {selectedComplaint.response ? (
                  <div>
                    <p><strong>Admin:</strong> {selectedComplaint.response}</p>
                  </div>
                ) : (
                  <p>No response yet.</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#641A90' }}>
        <Button
  onClick={handleCloseDialog}
  color="secondary"
  sx={{
    backgroundColor: '#B0BEC5', // Grey color for the button
    '&:hover': { 
      backgroundColor: '#CFD8DC', // Light grey color when hovered
      color: '#263238' // Text color when hovered (dark grey for contrast)
    }
  }}
>
  Cancel
</Button>

          <Button
            onClick={handleRespond}
            color="primary"
            variant="contained"
            sx={{ backgroundColor: '#641A90', '&:hover': { backgroundColor: '#f3e5f5', color: '#641A90' } }}
          >
            Respond
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </Paper>
  );
};

export default Complaints;
