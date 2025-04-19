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
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";
import debounce from 'lodash.debounce';

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

  useEffect(() => {
    const debounced = debounce(() => {
      handleSearch();
    }, 300);
    debounced();
    return () => debounced.cancel();
  }, [filters]);

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
    setFormData({ name: user.name, email: user.email, Role: user.Role, password: "", profilePicture: user.profilePicture });
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
        <div className='mt-3 mb-5'>
          <PageTitle value="User Manage" />
          <CustomBreadcrumbs paths={[{ label: 'User Manage' }]} />
        </div>
        <Box className="flex justify-end mb-4 mr-4">
        <Button
          onClick={handleAddNewUser}
          variant="contained"
          color="primary"
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
          style={{
            padding: "14px 18px",
            width: "180px",
            textTransform: "none",
            fontSize: "16px",
            borderRadius: "10px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          Add New User
        </Button>

        </Box>


<Box className="mb-10 mr-4 pt-5 border-2 border-black-200 rounded-md">
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', paddingRight: '15px' , paddingLeft: '15px'}}>
          <TextField label="Search by Name" name="name" value={filters.name} onChange={handleFilterChange} fullWidth />
          <TextField label="Search by Email" name="email" value={filters.email} onChange={handleFilterChange} fullWidth />
          <Select name="Role" value={filters.Role} onChange={handleFilterChange} fullWidth displayEmpty>
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#F4E6FF" }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar src={user.profilePicture || ''} sx={{ width: 40, height: 40, mr: 2 }}>
                          {!user.profilePicture && user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography fontWeight="bold">{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell fontWeight="bold">{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: user.Role === "admin" ? "#E8F5E9" : "#E3F2FD",
                          color: user.Role === "admin" ? "#1B5E20" : "#0D47A1",
                          fontWeight: "bold",
                          fontSize: "12px",
                          padding: "2px 8px",
                          borderRadius: "8px",
                          textTransform: "none"
                        }}
                      >
                        {user.Role}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => startEditing(user)}>
                        <Edit style={{ color: "grey" }} />
                      </IconButton>
                      <IconButton onClick={() => openDeleteConfirmationDialog(user)}>
                        <Delete style={{ color: "red" }} />
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
          />
          {!isEditing && (
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
            />
          )}
          <Select
            value={formData.Role}
            onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={saveUser} variant="contained" color="primary">
            {isEditing ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DialogAlert
        open={openDeleteDialog}
        onClose={closeDeleteConfirmationDialog}
        onConfirm={deleteUser}
        title="Confirm Delete"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};

export default Usermanage;
