import React, { useState, useEffect } from "react";
import { Box, Paper, Divider, Typography, TextField, Button, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../store/authSlice.js";  // Import the action to set user in Redux
import axios from "axios";
import { toast } from "sonner";  // Import sonner for notifications
import { useNavigate } from "react-router-dom";  // Import the navigate hook for routing

export default function AdminProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user data from Redux

  const [editable, setEditable] = useState(false); // Controls whether the fields are editable
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update form data when user data from Redux changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle editable state
  const toggleEditable = () => {
    setEditable(!editable);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send updated user data to the backend API
      const response = await axios.post("http://localhost:8000/api/v1/users/update-profile", formData, { withCredentials: true });
      
      // Get the updated user data from the response
      const updatedUser = response.data.data.user;

      // Dispatch the updated user data to Redux store
      dispatch(setAuthUser(updatedUser));

      // Show success notification
      toast.success("Profile updated successfully");

      // Optionally, navigate to another page after successful update (e.g., a dashboard)
      navigate("/admin/profile");
    } catch (error) {
      console.error("Error updating profile", error);
      setError("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", boxShadow: 3, borderRadius: 3, backgroundColor: "white" }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>Admin Profile</Typography>
        <Divider />
        
        <Box sx={{ pt: 3, textAlign: "center" }}>
          <AccountCircleIcon sx={{ fontSize: 60, color: "#6a1b9a" }} />
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={!editable}
                InputProps={{ sx: { height: "60px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={!editable}
                InputProps={{ sx: { height: "60px" } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={!editable}
                InputProps={{ sx: { height: "60px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={!editable}
                InputProps={{ sx: { height: "60px" } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 6 }}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              disabled={!editable}
              InputProps={{ sx: { height: "60px" } }}
            />
          </Box>

          <Box sx={{ mt: 5 }}>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#6a1b9a",padding: "6px 12px",
                margin: "6px 12px", color: "white", "&:hover": { backgroundColor: "#4a148c" } }}
              onClick={toggleEditable}
            >
              {editable ? "Cancel" : "Edit Profile"}
            </Button>

            {editable && (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#6a1b9a",
                  color: "white",
                  "&:hover": { backgroundColor: "#4a148c" },
                  width: "10%",
                  padding: "6px 12px",
                  margin: "6px 12px",
                  fontSize: "14px",
                  maxWidth: "100%",
                }}
              >
                Save
              </Button>
            )}
          </Box>
        </form>
        
        {loading && <Typography>Updating...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Paper>
    </Box>
  );
} 
