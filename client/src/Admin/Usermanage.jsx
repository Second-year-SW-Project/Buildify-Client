import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Select, MenuItem, Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Avatar, TablePagination
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';

const Usermanage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", Role: "user", password: "" });
  const [filters, setFilters] = useState({ name: "", email: "", Role: "" });
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8000/api/v1/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(() => toast.error("Error fetching users"));
  };

  const handleSearch = () => {
    const filtered = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(filters.email.toLowerCase());
      const roleMatch = filters.Role ? user.Role === filters.Role : true;
      return nameMatch && emailMatch && roleMatch;
    });
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const deleteUser = () => {
    if (userToDelete) {
      axios.delete(`http://localhost:8000/api/v1/users/${userToDelete._id}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userToDelete._id));
          setFilteredUsers(filteredUsers.filter(user => user._id !== userToDelete._id));
          toast.success("User deleted");
          setOpenDeleteDialog(false);
        })
        .catch(() => {
          toast.error("Error deleting user");
          setOpenDeleteDialog(false);
        });
    }
  };

  const startEditing = (user) => {
    setEditingUser(user._id);
    setIsEditing(true);
    setFormData({ name: user.name, email: user.email, Role: user.Role, password: "" });
    setOpenModal(true);
  };

  const saveUser = () => {
    if (isEditing) {
      axios.put(`http://localhost:8000/api/v1/users/${editingUser}`, formData)
        .then(() => {
          toast.success("User updated successfully");
          fetchUsers();
          setOpenModal(false);
        })
        .catch(() => toast.error("Error updating user"));
    } else {
      axios.post("http://localhost:8000/api/v1/users", formData)
        .then(() => {
          toast.success("User added successfully");
          fetchUsers();
          setOpenModal(false);
        })
        .catch(() => toast.error("Error adding user"));
    }
  };

  const handleAddNewUser = () => {
    setIsEditing(false);
    setFormData({ name: "", email: "", Role: "user", password: "" });
    setOpenModal(true);
  };

  const openDeleteConfirmationDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#641A90" }}>
        User Management
      </Typography>

      {/* Search/Filters Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
        <TextField
          label="Search by Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          fullWidth
          sx={{ height: 56, borderRadius: '8px'}}
        />
        <TextField
          label="Search by Email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          fullWidth
          sx={{ height: 56, borderRadius: '8px' }}
        />
        <Select
          name="Role"
          value={filters.Role}
          onChange={handleFilterChange}
          fullWidth
          displayEmpty
          sx={{ height: 56, borderRadius: '8px' }}
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
        <Button 
          onClick={handleSearch} 
          variant="contained" 
          className="bg-purple-600 hover:bg-purple-700 text-white h-[56px]"
          sx={{width: '400px'}}
        >
          Search
        </Button>
      </Box>

      <Button
        onClick={handleAddNewUser}
        variant="contained"
        className="bg-purple-600 hover:bg-purple-700 text-white h-[56px]"
      >
        Add New User
      </Button>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '16px',
                      backgroundColor: user.Role === 'admin' ? '#E8F5E9' : '#E3F2FD',
                      color: user.Role === 'admin' ? '#1B5E20' : '#0D47A1',
                      fontSize: '0.8rem',
                    }}
                  >
                    {user.Role}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => startEditing(user)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => openDeleteConfirmationDialog(user)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>

    {/* Edit/Add User Dialog */}
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Select
          label="Role"
          fullWidth
          value={formData.Role}
          onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
          sx={{ mb: 2 }}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        <Button onClick={saveUser} variant="contained">{isEditing ? "Save Changes" : "Add User"}</Button>
      </DialogActions>
    </Dialog>

    {/* Delete Confirmation Dialog */}
    <Dialog open={openDeleteDialog} onClose={closeDeleteConfirmationDialog}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteConfirmationDialog}>Cancel</Button>
        <Button onClick={deleteUser} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};


export default Usermanage;
