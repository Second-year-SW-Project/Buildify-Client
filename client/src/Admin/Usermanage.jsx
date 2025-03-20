import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TextField, Select, MenuItem, Button, IconButton, 
  Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider, 
  createTheme, Box, Typography 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: { main: "#641A90" },
    secondary: { main: "#F4E6FF" }
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: { backgroundColor: "#F4E6FF" }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#641A90",
          "&:hover": { backgroundColor: "#4A136B" }
        },
        outlined: {
          borderColor: "#641A90",
          color: "#641A90",
          "&:hover": { borderColor: "#4A136B" }
        }
      }
    }
  }
});

const Usermanage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    Role: "user", 
    password: "" 
  });
  const [filters, setFilters] = useState({
    name: "", 
    email: "", 
    Role: "" 
  });
  const [openModal, setOpenModal] = useState(false);

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
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/api/v1/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
        setFilteredUsers(filteredUsers.filter(user => user._id !== id));
        toast.success("User deleted");
      })
      .catch(() => toast.error("Error deleting user"));
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

  // Add this missing function
  const handleAddNewUser = () => {
    setIsEditing(false);
    setFormData({ name: "", email: "", Role: "user", password: "" });
    setOpenModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, color: "#641A90" }}>
          User Management
        </Typography>

        {/* Search/Filters Section */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4,
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiSelect-select": { py: 0.8 }
        }}>
          <TextField
            label="Search by Name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
          />
          <TextField
            label="Search by Email"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            fullWidth
          />
          <Select
            name="Role"
            value={filters.Role}
            onChange={handleFilterChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <Button 
            onClick={handleSearch} 
            variant="contained" 
            sx={{ minWidth: 120 }}
          >
            Search
          </Button>
        </Box>

        <Button
          onClick={handleAddNewUser}
          variant="contained"
          sx={{ mb: 3 }}
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
              {filteredUsers.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        bgcolor: user.Role === 'admin' ? '#E8F5E9' : '#E3F2FD',
                        color: user.Role === 'admin' ? '#1B5E20' : '#0D47A1',
                        fontSize: 14,
                        fontWeight: 500
                      }}
                    >
                      {user.Role}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => startEditing(user)}
                      sx={{ color: "primary.main", mr: 1 }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      onClick={() => deleteUser(user._id)}
                      sx={{ color: "error.main" }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit User Dialog */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: "#F4E6FF" }}>
            {isEditing ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogContent sx={{ py: 3, "& .MuiTextField-root": { my: 2 } }}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {!isEditing && (
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            )}
            <Select
              value={formData.Role}
              onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions sx={{ p: 3, bgcolor: "#F4E6FF" }}>
            <Button 
              onClick={() => setOpenModal(false)} 
              variant="outlined" 
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={saveUser} 
              variant="contained"
            >
              {isEditing ? "Update User" : "Create User"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Usermanage;