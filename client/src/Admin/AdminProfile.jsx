import React, { useState, useEffect } from "react";
import { Box, Paper, Divider, Typography, TextField, Button, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../Store/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const updatedUser = await axios.put("http://localhost:8000/api/v1/users/update-profile", formData,{ withCredentials: true }); // Send updated data to backend
      dispatch(setAuthUser(updatedUser.data)); // Update user in Redux store
      alert("Profile updated successfully!");
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
              sx={{ mt: 2, backgroundColor: "#6a1b9a", color: "white", "&:hover": { backgroundColor: "#4a148c" } }}
              onClick={toggleEditable}
            >
              {editable ? "Cancel" : "Edit Profile"}
            </Button>

            {editable && (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  backgroundColor: "#6a1b9a",
                  color: "white",
                  "&:hover": { backgroundColor: "#4a148c" },
                  width: "10%",
                  padding: "6px 12px",
                  fontSize: "14px",
                  maxWidth: "100%",
                }}
              >
                Save Changes
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
