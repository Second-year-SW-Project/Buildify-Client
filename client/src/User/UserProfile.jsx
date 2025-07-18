import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import SideNav from "./SideNav";
import {
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { OutlinedButton } from "../AtomicComponents/Buttons/Buttons";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "../Store/authSlice";
import { getProvinces, getDistrictsByProvince } from "../utils/locationData";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [errors, setErrors] = useState({});

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate("/adminpanel/auth/signup", { replace: true });
    }
  }, [user, navigate]);

  // State management
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Location data
  const provinces = getProvinces();
  const [availableDistricts, setAvailableDistricts] = useState([]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    province: user?.province || "",
    district: user?.district || "",
    profilePicture: user?.profilePicture || "",
  });

  // Form data updated when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        province: user.province,
        district: user.district,
        profilePicture: user.profilePicture,
      });
      // Set available districts based on user's province
      if (user.province) {
        setAvailableDistricts(getDistrictsByProvince(user.province));
      }
    }
  }, [user]);

  // Update available districts when province changes
  useEffect(() => {
    if (formData.province) {
      const districts = getDistrictsByProvince(formData.province);
      setAvailableDistricts(districts);
      // Reset district if it's not valid for the selected province
      if (formData.district && !districts.includes(formData.district)) {
        setFormData((prev) => ({ ...prev, district: "" }));
      }
    } else {
      setAvailableDistricts([]);
      setFormData((prev) => ({ ...prev, district: "" }));
    }
  }, [formData.province]);

  const wrappedHandle = (field) => (val) =>
    handleChange({ target: { name: field, value: val } });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");

    try {
      setUploading(true);
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);

      setFormData((prev) => ({
        ...prev,
        profilePicture: response.data.secure_url,
      }));
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Cloudinary upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  // Conditional rendering of edit mode
  const toggleEditable = () => {
    if (editable) {
      setFormData({
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        province: user.province,
        district: user.district,
        profilePicture: user.profilePicture,
      });
    }
    setEditable(!editable);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting");
      setLoading(false);
      return;
    }
    try {
      const updateData = {
        name: formData.name?.trim() || "",
        email: formData.email?.trim() || "",
        firstName: formData.firstName?.trim() || "",
        lastName: formData.lastName?.trim() || "",
        address: formData.address?.trim() || "",
        province: formData.province?.trim() || "",
        district: formData.district?.trim(),
        profilePicture: formData.profilePicture || user.profilePicture || "",
      };

      const response = await axios.post(
        `${backendUrl}/api/v1/users/update-profile`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(response.data.data.user));
      toast.success("Profile updated successfully");
      setEditable(false);
    } catch (error) {
      const serverError = error.response?.data?.error;
      const validationErrors = error.response?.data?.fields?.join(", ") || [];

      setError(
        validationErrors
          ? `Invalid fields: ${validationErrors}`
          : serverError || "An error occurred. Please try again."
      );

      toast.error(`Update failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <SideNav />

        <main className="flex-1 mt-36 p-6 pl-64">
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <Box
              component="main"
              sx={{
                p: 3,
                pl: 7,
                width: "90%",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mt-5 mb-6">Profile</h1>
                <Button
                  variant="outlined"
                  disabled={loading.profile}
                  onClick={toggleEditable}
                  className="bg-purple-600 hover:bg-purple-600 hover:text-white font-bold"
                  sx={{ borderRadius: 850, textTransform: "none", px: 2 }}
                  style={{
                    padding: "14px 18px",
                    width: "180px",
                    textTransform: "none",
                    fontSize: "16px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {editable ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
              <Divider />
              <Box sx={{ pt: 3 }}>
                <Box sx={{ pt: 2, textAlign: "left", pb: 2 }}>
                  {formData.profilePicture ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "left",
                        marginBottom: "5px",
                      }}
                    >
                      <img
                        src={formData.profilePicture}
                        alt="Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1px solid rgb(152, 56, 212)",
                        }}
                      />
                    </div>
                  ) : (
                    <AccountCircleIcon
                      sx={{ fontSize: 80, color: "#9333ea" }}
                    />
                  )}

                  {editable && (
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={uploading}
                      className="bg-purple-600 hover:bg-purple-600 hover:text-white font-bold mt-2"
                      sx={{
                        textTransform: "none",
                        padding: "12px 14px",
                        width: "180px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "12px",
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
                  <div className="flex flex-col md:flex-row mt-5">
                    <div className="flex-1 mb-5 mr-1">
                      <InputField
                        type="text"
                        variant="outlined"
                        label="User Name"
                        value={formData.name}
                        onChange={wrappedHandle("name")}
                        width="70%"
                        outlinedActive
                        disabled={!editable}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </div>
                    <div className="flex-1 mb-5">
                      <InputField
                        type="text"
                        variant="outlined"
                        label="First Name"
                        value={formData.firstName}
                        onChange={wrappedHandle("firstName")}
                        width="70%"
                        outlinedActive
                        disabled={!editable}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 mb-5 mr-1">
                      <InputField
                        type="text"
                        variant="outlined"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={wrappedHandle("lastName")}
                        width="70%"
                        outlinedActive
                        disabled={!editable}
                      />
                    </div>
                    <div className="flex-1 mb-5">
                      <InputField
                        type="text"
                        variant="outlined"
                        label="Email Address"
                        value={formData.email}
                        onChange={wrappedHandle("email")}
                        width="70%"
                        outlinedActive
                        disabled={!editable}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </div>
                  </div>

                  <div className="flex-1 mb-5 mr-1">
                    <InputField
                      type="text"
                      variant="outlined"
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={wrappedHandle("address")}
                      width="86%"
                      rows={3}
                      outlinedActive
                      disabled={!editable}
                    />
                  </div>

                  <div className="flex-1 mb-5 mr-1" style={{ width: "86%" }}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      disabled={!editable}
                    >
                      <InputLabel>Province</InputLabel>
                      <Select
                        value={formData.province}
                        onChange={(e) =>
                          setFormData({ ...formData, province: e.target.value })
                        }
                        label="Province"
                      >
                        <MenuItem value="">
                          <em>Select Province</em>
                        </MenuItem>
                        {provinces.map((province) => (
                          <MenuItem key={province} value={province}>
                            {province}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="flex-1 mb-5 mr-1" style={{ width: "86%" }}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      disabled={!editable || !formData.province}
                    >
                      <InputLabel>District</InputLabel>
                      <Select
                        value={formData.district}
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                        label="District"
                      >
                        <MenuItem value="">
                          <em>Select District</em>
                        </MenuItem>
                        {availableDistricts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!editable || loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </main>
      </div>
    </div>
  );
}
