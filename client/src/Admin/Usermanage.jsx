import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper, TextField, Select, MenuItem, Button, IconButton,
        Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Avatar, TablePagination
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";
import debounce from 'lodash.debounce';


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Usermanage = () => {


  //states
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", Role: "user", password: "", status: "pending" });
  const [filters, setFilters] = useState({ name: "", email: "", Role: "" , status:""});
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);



 

  useEffect(() => {
    const debounced = debounce(() => {
      const { name, email, Role, status } = filters;
      const isFiltering =
        name?.trim() !== '' || email?.trim() !== '' || Role?.trim() !== ''|| status?.trim() !== '' ;

      if (isFiltering) {
        handleSearch();
      } else {
        fetchUsers();
      }
    }, 300); 

    debounced();

    return () => debounced.cancel();
  }, [filters]);
  
  
 //fetching user details
  const fetchUsers = () => {
    axios.get(`${backendUrl}/api/v1/users`)
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(() => toast.error("Error fetching users"));
  };

  //filtering part
  const handleSearch = () => {

    const filtered = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(filters.email.toLowerCase());
      const roleMatch = filters.Role ? user.Role === filters.Role : true;
      const statusMatch= filters.status ? user.status === filters.status : true;
      return nameMatch && emailMatch && roleMatch && statusMatch;
    });

    setFilteredUsers(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  //deleting the user
  const deleteUser = () => {

    if (userToDelete) {

      axios.delete(`${backendUrl}/api/v1/users/${userToDelete._id}`)
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

  //edit user details
  const startEditing = (user) => {
    setEditingUser(user._id);
    setIsEditing(true);
    setFormData({ 
        name: user.name,
        email: user.email,
        Role: user.Role,
        password: "",
        profilePicture: user.profilePicture,
        status: user.status, });

    setOpenModal(true);
  };

  const saveUser = () => {

    if (isEditing) {

      //send the edited details
      axios.put(`${backendUrl}/api/v1/users/${editingUser}`, formData)
        .then(() => {
          toast.success("User updated successfully");
          fetchUsers();
          setOpenModal(false);
        })
        .catch(() => toast.error("Error updating user"));

    } else {

      //send new user details
      axios.post(`${backendUrl}/api/v1/users/new`, formData)
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
    setFormData({ name: "", email: "", Role: "user", password: "" , status: ""});
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

      <div style={{ padding: "5px" }}>

        <div>
          <Box sx={{ p: 3 }}>

          <div className=' mb-2'>
            <PageTitle value="User Management"></PageTitle>
            <CustomBreadcrumbs
              paths={[
                { label: 'User Management' },
              ]} />
          </div>

          <Box className="flex justify-end mb-3">

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
              fontWeight: "bold"
            }}
          >
            Add New User
          </Button>


          </Box>


<Box className="mb-10 border-2 border-black-200 rounded-md mt-6">

          {/* Search/Filters Section */}

          <Box sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center', padding: '15px' }}>

            <TextField
              label="Search by Name"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              fullWidth
              sx={{ height: 56, borderRadius: '8px' }}
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


            <Select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          fullWidth
          displayEmpty
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="blocked">Blocked</MenuItem>
          <MenuItem value="banned">Banned</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="suspended">Suspended</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>

           
          </Box>


          <TableContainer 
            component={Paper} 
            sx={{ 
              width: "100%"
            }}
          >

          <Table sx={{ 
            width: "100%", 
            tableLayout: "auto", 
            borderCollapse: "collapse" 
          }}>

    <TableHead>

      <TableRow style={{ backgroundColor: "#F4E6FF" }}>

        <TableCell 
          style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" 
          }}
        >
          Name
        </TableCell>

        <TableCell 
          style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" 
          }}
        >
          Email
        </TableCell>

        <TableCell 
          style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" // Light grey inner border
          }}
        >
          Status
        </TableCell>

        <TableCell 
          style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" 
          }}
        >
          Role
        </TableCell>

        <TableCell 
          style={{ 
            padding: "8px 16px", 
            textAlign: "left", 
            verticalAlign: "middle", 
            color: "grey", 
            fontWeight: "bold", 
            borderBottom: "1px solid #e0e0e0" 
          }}
        >
          Actions
        </TableCell>

      </TableRow>

    </TableHead>

    <TableBody>

  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((user) => (
      <TableRow key={user._id}>

        <TableCell style={{ padding: "8px", verticalAlign: "middle", borderBottom: "1px solid #e0e0e0" }}>

          <Box display="flex" alignItems="center">

            <Avatar 
              alt={user.name} 
              src={user.profilePicture || ''} 
              sx={{ width: 40, height: 40, marginRight: 2, background: "#c084fc" }}
            >
              {!user.profilePicture && user.name.charAt(0).toUpperCase()}
            </Avatar>

            <Typography style={{fontWeight:"bold"}}>
    {user.name}
  </Typography>

          </Box>

        </TableCell>

        <TableCell style={{ padding: "8px", verticalAlign: "middle", borderBottom: "1px solid #e0e0e0" ,fontWeight: "bold"}}>
          {user.email}
        </TableCell>

        <TableCell style={{ padding: "8px", verticalAlign: "middle", borderBottom: "1px solid #e0e0e0",fontWeight: "bold" }}>

        <Button
          variant="contained"

          sx={{
            backgroundColor:
              user.status === "active"
                ? "#E8F5E9" 
                : user.status === "blocked"
                ? "#FFFAE3" 
                : user.status === "banned"
                ? "#FFCDD2" 
                : user.status === "inactive"
                ? "#F5F5F5" 
                : user.status === "suspended"
                ? "#FFECB3" 
                : user.status === "pending"
                ? "#E3F2FD" 
                : "", 

            color:

              user.status === "active"
                ? "#1B5E20" 
                : user.status === "blocked"
                ? "#F57F17" 
                : user.status === "banned"
                ? "#C62828" 
                : user.status === "inactive"
                ? "#757575" 
                : user.status === "suspended"
                ? "#D32F2F" 
                : user.status === "pending"
                ? "#0D47A1" 
                : "", 

            fontWeight: "bold",
            fontSize: "12px",
            padding: "4px 20px",
            minWidth: "100px",
            borderRadius: '9999px',
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "&:hover": {

              backgroundColor:

                user.status === "active"
                  ? "#D0F8CE" 
                  : user.status === "blocked"
                  ? "#FFF176" 
                  : user.status === "banned"
                  ? "#FFEBEE"
                  : user.status === "inactive"
                  ? "#EEEEEE" 
                  : user.status === "suspended"
                  ? "#FFD54F"
                  : user.status === "pending"
                  ? "#D6EAF8" 
                  : "", 
            },
          }}
        >
          {user.status}
        </Button>

      </TableCell>

        <TableCell style={{ padding: "8px", verticalAlign: "middle", borderBottom: "1px solid #e0e0e0",fontWeight: "bold" }}>

          <Button
            variant="contained"
            sx={{
              backgroundColor: user.Role === "admin" ? "#E8F5E9" : "#E3F2FD",
              color: user.Role === "admin" ? "#1B5E20" : "#0D47A1",
              fontWeight: "bold",
              fontSize: "12px",
              padding: "2px 20px",
              minWidth: "100px",
              borderRadius: '9999px',
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: user.Role === "admin" ? "#D0F8CE" : "#D6EAF8",
              },
            }}
          >
            {user.Role}
          </Button>

        </TableCell>

        <TableCell style={{ padding: "8px", textAlign: "center", verticalAlign: "middle", borderBottom: "1px solid #e0e0e0" }}>

          <IconButton onClick={() => startEditing(user)} style={{ color: "#641A90", padding: "8px" }}>
            <Edit style={{ fontSize: "30px", color: "grey" }} />
          </IconButton>

          <IconButton onClick={() => openDeleteConfirmationDialog(user)} style={{ color: "#641A90", padding: "8px" }}>
            <Delete style={{ fontSize: "30px", color: "red" }} />
          </IconButton>

        </TableCell>

      </TableRow>

    ))
  }
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
        

        {/* Edit/Add User Dialog */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} 
        sx={{ '& .MuiDialog-paper': { padding: 4, borderRadius: '16px', boxShadow: 24, width: '500px' } }}>

  <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: '500', textAlign: 'center', color: '#4B4B4B' }}>

    {isEditing ? "Edit User" : "Add New User"}

  </DialogTitle>

  <DialogContent>

    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      

      {formData.profilePicture ? (
        <Avatar src={formData.profilePicture} sx={{ width: 56, height: 56, mr: 2 }} />

      ) : (

        <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: '#c084fc'}}>
          
          {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
        </Avatar>

      )}

      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4B4B4B' }}>
        {formData.name || 'No Name'}
      </Typography>

    </Box>

    <TextField
      label="Name"
      fullWidth
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      sx={{
        mb: 3,
        '& .MuiInputBase-root': {
          borderRadius: '10px',
          backgroundColor: '#F4E6FF',
        },
        '& .MuiFormLabel-root': {
          fontWeight: 'bold',
        }
      }}
      variant="outlined"
    />

    <TextField
      label="Email"
      fullWidth
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      sx={{
        mb: 3,
        '& .MuiInputBase-root': {
          borderRadius: '10px',
          backgroundColor: '#F4E6FF',
        },
        '& .MuiFormLabel-root': {
          fontWeight: 'bold',
        }
      }}
      variant="outlined"
    />

    <Select
      label="Role"
      fullWidth
      value={formData.Role}
      onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
      sx={{
        mb: 3,
        '& .MuiInputBase-root': {
          borderRadius: '10px',
          backgroundColor: '#F4E6FF',
        },
        '& .MuiFormLabel-root': {
          fontWeight: 'bold',
        }
      }}
      variant="outlined"
    >
      <MenuItem value="user">User</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
    </Select>

    <Select
            label="Status"
            value={formData.status}
              variant="outlined"
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            fullWidth
            sx={{ mt: 2 , mb:2,'& .MuiInputBase-root': {
          borderRadius: '10px',
          backgroundColor: '#F4E6FF',
        },
        '& .MuiFormLabel-root': {
          fontWeight: 'bold',
        }}}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
            <MenuItem value="banned">Banned</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>

    {!isEditing && (

      <TextField
        label="Password"
        type="password"
        fullWidth
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        sx={{
          mb: 3,
          '& .MuiInputBase-root': {
            borderRadius: '10px',
            backgroundColor: '#F4E6FF',
          },
          '& .MuiFormLabel-root': {
            fontWeight: 'bold',
          }
        }}
        variant="outlined"
      />
    )}

  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center' }}>

         <Button onClick={() => setOpenModal(false)} className="bg-gray-500 hover:bg-gray-200 text-white font-bold"
            sx={{
              textTransform: "none",
              padding: "14px 18px",
              width: "180px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px"
            }}>
           Cancel
          </Button>

        <Button
            onClick={saveUser}
            variant="contained"
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
            {isEditing ? "Save Changes" : "Add User"}
      </Button>

  </DialogActions>

</Dialog>

      {/* Delete Confirmation Dialog */}
     
       <DialogAlert
                      name="Delete User"
                      Title="Confirm Deletion"
                      message="Are you sure you want to delete this user? This action cannot be undone."
                      Disagree="Cancel"
                      Agree="Delete"
                      open={openDeleteDialog}
                      handleClose={closeDeleteConfirmationDialog}
                      handleAgree={deleteUser}
                  />

    </div>
    
    </div>

    </div>
  );
};

export default Usermanage;
