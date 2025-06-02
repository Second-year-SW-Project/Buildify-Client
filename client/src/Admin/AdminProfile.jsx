import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../Store/authSlice.js";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;



export default function AdminProfile() {


  const dispatch = useDispatch();

  //get the user the details from redux state store
  const user = useSelector((state) => state.auth.user);


  //difining states
  const [editable, setEditable] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    city: user?.city || "",
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
        city: user.city,
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

  //image uploading to cloudinary

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");

    try {
      setUploading(true);

      //get the response as link to store in database
      const response = await axios.post(
        CLOUDINARY_UPLOAD_URL,
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
      setFormData({
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        profilePicture: user.profilePicture,
      });
    }
    setEditable(!editable);
  };

  //submitting updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Invalid email format');
      }

      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        profilePicture: formData.profilePicture || user.profilePicture
      };
      const response = await axios.post(
        `${backendUrl}/api/v1/users/update-profile`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          withCredentials: true
        }
      );

      dispatch(setAuthUser(response.data.data.user));
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
        <div className='mt-3 mb-5'>
          <PageTitle value="Admin Profile"></PageTitle>
          <CustomBreadcrumbs
            paths={[
              { label: 'Admin', href: "/adminpanel/admin/profile" },
              { label: 'Profile' },
            ]} />
        </div>

        <Box sx={{ pt: 3, textAlign: "center" }}>
          {formData.profilePicture ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={formData.profilePicture}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid rgb(152, 56, 212)"
                }}
              />
            </div>

          ) : (
            <AccountCircleIcon sx={{ fontSize: 80, color: "#9333ea" }} />
          )}

          {editable && (


            <Button
              variant="contained"
              component="label"
              disabled={uploading}
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

          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                disabled={!editable}
                InputProps={{ sx: { height: "60px" } }}
              />
            </Grid>

          </Grid>

          <Box sx={{ mt: 5, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              disabled={loading.profile}
              onClick={toggleEditable}
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
              {editable ? "Cancel" : "Edit Profile"}

            </Button>


            {editable && (
              <Button
                variant="contained"
                type="submit"
                className={`text-white font-bold 
              ${loading || uploading ? 'bg-gray-500 hover:bg-gray-600' : 'bg-purple-700 hover:bg-purple-800'}`}
                disabled={loading || uploading}
                style={{
                  padding: "14px 18px",
                  width: "180px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold"
                }}
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