import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import SideNav from "./SideNav";
import { Divider, Paper, Button, IconButton, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { OutlinedButton } from "../AtomicComponents/Buttons/Buttons";
import Navbar from '../MoleculesComponents/User_component/Navbar';
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "../Store/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token =
    useSelector((state) => state.auth.accessToken) ||
    localStorage.getItem("accessToken");

  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    profilePicture: user?.profilePicture || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        profilePicture: user.profilePicture || "",
      });
      setIsEnabled(user.is2FAEnabled || false);
    }
  }, [user]);

  const handleChange = (field, value) => {
    if (!isEditable) return;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedFields = {};

    for (const key in formData) {
      if (formData[key] !== user[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (isEnabled !== user.is2FAEnabled) {
      updatedFields.is2FAEnabled = isEnabled;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes made");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/update-profile",
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setAuthUser(response.data));
      toast.success("Profile updated successfully");
      setIsEditable(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isEditable) return;
    setIsEnabled(!isEnabled);
  };

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
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
                <IconButton onClick={toggleEdit} title="Edit Profile">
                  <EditIcon />
                </IconButton>
              </div>
              <Divider />
              <Box sx={{ pt: 3 }}>
                <AccountCircleIcon sx={{ fontSize: 50 }} color="primary" />
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row mt-5">
                    <div className="flex-1 mb-5 mr-1">
                      <InputField
                        type="textarea"
                        variant="outlined"
                        label="User Name"
                        value={formData.name}
                        onChange={(val) => handleChange("name", val)}
                        width="70%"
                        outlinedActive
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="flex-1 mb-5">
                      <InputField
                        type="textarea"
                        variant="outlined"
                        label="First Name"
                        value={formData.firstName}
                        onChange={(val) => handleChange("firstName", val)}
                        width="70%"
                        outlinedActive
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 mb-5 mr-1">
                      <InputField
                        type="textarea"
                        variant="outlined"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(val) => handleChange("lastName", val)}
                        width="70%"
                        outlinedActive
                        disabled={!isEditable}
                      />
                    </div>
                    <div className="flex-1 mb-5">
                      <InputField
                        type="textarea"
                        variant="outlined"
                        label="Email Address"
                        value={formData.email}
                        onChange={(val) => handleChange("email", val)}
                        width="70%"
                        outlinedActive
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="flex-1 mb-5 mr-1">
                    <InputField
                      type="textarea"
                      variant="outlined"
                      label="Address"
                      value={formData.address}
                      onChange={(val) => handleChange("address", val)}
                      width="86%"
                      rows={3}
                      outlinedActive
                      disabled={!isEditable}
                    />
                  </div>

                  <Paper elevation={3} sx={{ padding: 3, width: "86%" }}>
                    <h2 className="text-2xl font-semibold text-gray-600">
                      Two Factor Authentication (2FA)
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Status: {isEnabled ? "Enabled" : "Disabled"}
                    </p>
                    <OutlinedButton
                      name={isEnabled ? "Disable" : "Enable"}
                      onClick={handleToggle}
                      disabled={!isEditable}
                    />
                  </Paper>

                  <InputField
                    type="checkbox"
                    label="Sign up for emails to get updates"
                    disabled={!isEditable}
                  />
                  <p className="text-purple-600 font-medium mt-4">
                    Change password
                  </p>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isEditable || loading}
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
