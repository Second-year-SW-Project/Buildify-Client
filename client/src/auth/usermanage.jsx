import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider, createTheme } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Define the purple theme with custom header and button colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#641A90", // Purple color
    },
    secondary: {
      main: "#7b1fa2", // A darker shade of purple for secondary elements
    },
  },
  overrides: {
    MuiTableHead: {
      root: {
        backgroundColor: "#F4E6FF", // Custom color for header
      },
    },
    MuiIconButton: {
      root: {
        color: "#641A90", // Custom icon color
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#641A90", // Custom color for search and add button
        "&:hover": {
          backgroundColor: "#7b1fa2", // Darker shade for hover effect
        },
      },
    },
  },
});

const Usermanage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", Role: "user", password: "" });
  const [filters, setFilters] = useState({ name: "", email: "", Role: "" });
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/api/v1/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(() => toast.error("Error fetching users"));
  };

  const handleSearch = () => {
    let updatedUsers = users.filter((user) => {
      return (
        (!filters.name || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.Role || user.Role.toLowerCase() === filters.Role.toLowerCase())
      );
    });
    setFilteredUsers(updatedUsers);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
        toast.success("User deleted");
      })
      .catch(() => toast.error("Error deleting user"));
  };

  const startEditing = (user) => {
    setEditingUser(user._id);
    setIsEditing(true);
    setFormData({ name: user.name, email: user.email, Role: user.Role });
    setOpenModal(true); // Open modal when editing
  };

  const saveUser = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:8000/api/v1/users/${editingUser}`, formData)
        .then(() => {
          toast.success("User updated successfully");
          setIsEditing(false);
          setEditingUser(null);
          setFormData({ name: "", email: "", Role: "user", password: "" });
          setOpenModal(false); // Close modal after saving
          fetchUsers();
        })
        .catch(() => toast.error("Error updating user"));
    } else {
      axios
        .post("http://localhost:8000/api/v1/users", formData)
        .then(() => {
          fetchUsers();
          setFormData({ name: "", email: "", Role: "user", password: "" });
          toast.success("User added successfully");
          setOpenModal(false); // Close modal after adding
        })
        .catch(() => toast.error("Error adding user"));
    }
  };

  const handleAddNewUser = () => {
    setIsEditing(false);
    setFormData({ name: "", email: "", Role: "user", password: "" });
    setOpenModal(true); // Open modal when adding new user
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <h2 style={{paddingLeft: "20px"}}>User Management</h2>
        <div style={{ padding: "10px", height: "25%", display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
  <TextField
    label="Search by Name"
    name="name"
    value={filters.name}
    onChange={handleFilterChange}
    style={{
      flex: 1, // To make it stretch
      height: "40px", // Match the height of the button
    }}
    InputProps={{
      style: {
        height: "40px", // Match the height of the button
        padding: "0 14px", // Adjust padding to align text
        textAlign: "center", // Center the text inside the input field
      }
    }}
    InputLabelProps={{
      style: {
        fontSize: "12px", // Smaller font size for label
      }
    }}
  />
  <TextField
    label="Search by Email"
    name="email"
    value={filters.email}
    onChange={handleFilterChange}
    style={{
      flex: 1, // To make it stretch
      height: "40px", // Match the height of the button
    }}
    InputProps={{
      style: {
        height: "40px", // Match the height of the button
        padding: "0 14px", // Adjust padding to align text
        textAlign: "center", // Center the text inside the input field
      }
    }}
    InputLabelProps={{
      style: {
        fontSize: "12px", // Smaller font size for label
      }
    }}
  />
  <Select
    name="Role"
    value={filters.Role || ""} // Default to empty string to show "All Roles"
    onChange={handleFilterChange}
    style={{
      flex: 1, // To make it stretch
      height: "40px", // Match the height of the button
    }}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 300,
        },
      },
    }}
  >
    <MenuItem value="">All Roles</MenuItem> {/* Default option */}
    <MenuItem value="admin">Admin</MenuItem>
    <MenuItem value="user">User</MenuItem>
  </Select>
  <Button
  onClick={handleSearch}
  variant="contained"
  sx={{
    margin: "20px 0",
    backgroundColor: "#641A90", // Dark purple background
    color: "white", // White font color
    border: "none", // Remove border
    "&:hover": {
      backgroundColor: "#F4E6FF", // Light purple background on hover
      color: "#641A90", // Dark purple font color on hover
      border: "none", // Ensure no border on hover
    },
  }}
>
  Search
</Button>
</div>


<Button
  onClick={handleAddNewUser}
  variant="contained"
  color="primary"
  sx={{
    margin: "20px 0",
    backgroundColor: "#641A90", // Dark purple background
    color: "white", // White font color
    border: "none",
    marginLeft: "10px", // Remove border
    "&:hover": {
      backgroundColor: "#F4E6FF", // Light purple background on hover
      color: "#641A90", // Dark purple font color on hover
      border: "none", // Ensure no border on hover
    },
  }}
>
  Add New User
</Button>



<TableContainer component={Paper}>
  <Table sx={{ marginLeft: "15px" }}>
    <TableHead>
      <TableRow style={{ backgroundColor: "#F4E6FF" }}>
        <TableCell style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>Name</TableCell>
        <TableCell style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>Email</TableCell>
        <TableCell style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>Role</TableCell>
        <TableCell style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell style={{ padding: "8px", verticalAlign: "middle" }}>{user.name}</TableCell>
            <TableCell style={{ padding: "8px",  verticalAlign: "middle" }}>{user.email}</TableCell>
            <TableCell style={{ padding: "8px", verticalAlign: "middle" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: user.Role === "admin" ? "#E8F5E9" : "#E3F2FD", // Very light green for admin, very light blue for user
                  color: user.Role === "admin" ? "#1B5E20" : "#0D47A1", // Dark green for admin, dark blue for user
                  fontWeight: "bold",
                  fontSize: "12px", // Small font size
                  padding: "2px 8px", // Compact button size
                  minWidth: "auto", // Prevents unnecessary expansion
                  borderRadius: "8px", // Smooth rounded corners
                  textTransform: "none", // Keeps text normal (not uppercase)
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: user.Role === "admin" ? "#D0F8CE" : "#D6EAF8", // Slightly darker shade on hover
                  },
                }}
              >
                {user.Role}
              </Button>
            </TableCell>
            <TableCell style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>
              <IconButton
                onClick={() => startEditing(user)}
                style={{
                  color: "#641A90", // Purple color
                  padding: "8px", // Slightly reduced padding
                }}
              >
                <Edit style={{ fontSize: "18px" }} /> {/* Adjust icon size */}
              </IconButton>
              <IconButton
                onClick={() => deleteUser(user._id)}
                style={{
                  color: "#641A90",
                  padding: "8px",
                }}
              >
                <Delete style={{ fontSize: "18px" }} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="4" style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>
            No matching users found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>



        {/* Modal for adding or editing a user */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogContent>
            <TextField label="Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth required />
            <TextField label="Email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth required style={{ marginTop: "16px" }} />
            {!isEditing && (
              <TextField label="Password" type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} fullWidth required style={{ marginTop: "16px" }} />
            )}
            <Select name="Role" value={formData.Role} onChange={(e) => setFormData({ ...formData, Role: e.target.value })} fullWidth style={{ marginTop: "16px" }}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={saveUser} variant="contained">{isEditing ? "Update" : "Add User"}</Button>
            {isEditing && <Button onClick={() => setIsEditing(false)} variant="outlined">Cancel</Button>}
            <Button onClick={() => setOpenModal(false)} variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};



export default Usermanage;
