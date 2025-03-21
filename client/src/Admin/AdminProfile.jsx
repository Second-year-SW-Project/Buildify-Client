import React, { useState, useEffect } from "react";
import { Box, Paper, Divider, Typography, TextField, Button, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../Store/authSlice.js";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [editable, setEditable] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    profilePicture: user?.profilePicture || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        profilePicture: user.profilePicture,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dfdjzbfjn/image/upload`,
        formData
      );
      
      setFormData(prev => ({
        ...prev,
        profilePicture: response.data.secure_url
      }));
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Cloudinary upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleEditable = () => {
    if (editable) {
      // Reset form data if canceling edits
      setFormData({
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        profilePicture: user.profilePicture,
      });
    }
    setEditable(!editable);
  };

  // Updated handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Validate required fields
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }

    // Send only allowed fields
    const updateData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      address: formData.address.trim(),
      profilePicture: formData.profilePicture || user.profilePicture
    };
    const response = await axios.post(
      `http://localhost:8000/api/v1/users/update-profile`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        withCredentials: true
      }
    );

    dispatch(setAuthUser(response.data.user));
    toast.success('Profile updated successfully');
    setEditable(false);

  } catch (error) {
    const serverError = error.response?.data?.error;
    const validationErrors = error.response?.data?.fields?.join(', ') || [];
    
    setError(validationErrors 
      ? `Invalid fields: ${validationErrors}`
      : serverError || 'An error occurred. Please try again.'
    );
    
    toast.error(`Update failed: ${error.message}`);
    
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
          {formData.profilePicture ? (
            <img 
              src={formData.profilePicture}
              alt="Profile"
              style={{ 
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #6a1b9a"
              }}
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 60, color: "#6a1b9a" }} />
          )}
          
          {editable && (
            <Button
              variant="contained"
              component="label"
              sx={{ 
                mt: 2,
                backgroundColor: "#6a1b9a",
                "&:hover": { backgroundColor: "#4a148c" },
                textTransform: "none"
              }}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Change Photo"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          )}
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

          <Box sx={{ mt: 5, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: "#6a1b9a",
                "&:hover": { backgroundColor: "#4a148c" },
                px: 4,
                py: 1
              }}
              onClick={toggleEditable}
            >
              {editable ? "Cancel" : "Edit Profile"}
            </Button>

            {editable && (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#6a1b9a",
                  "&:hover": { backgroundColor: "#4a148c" },
                  px: 4,
                  py: 1,
                  "&:disabled": {
                    backgroundColor: "#9c27b0",
                    opacity: 0.7
                  }
                }}
                disabled={loading || uploading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </Box>
        </form>
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}