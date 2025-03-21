import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Divider,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

export default function AdminSettings() {
  const user = useSelector((state) => state.auth.user);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [twoFAForm, setTwoFAForm] = useState({
    token: ""
  });
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState({
    password: false,
    twoFAEnable: false,
    twoFADisable: false
  });
  const [errors, setErrors] = useState({
    password: {},
    twoFA: {}
  });

  // Password Change Handlers
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, password: {} });
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors({ ...errors, password: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
  
    setLoading({ ...loading, password: true });
    try {
      const accessToken = localStorage.getItem("token");
console.log("Access Token:", accessToken);

    console.log("Current Password:", passwordForm.currentPassword);
    console.log("New Password:", passwordForm.newPassword);
    console.log("Confirm Password:", passwordForm.confirmPassword);
      await axios.post(
        `http://localhost:8000/api/v1/users/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true
        }
      );

      // Show success toast
    toast.success("Password changed successfully!");

    // Clear the form fields
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });


    } catch (error) {
      const errorMessage = error.response?.data?.message || "Password change failed";
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        setErrors({ password: validationErrors });
      } else {
        toast.error(errorMessage);
      }
    }
    finally {
      // Reset the loading state
      setLoading({ ...loading, password: false });
    }
    
  };

  // 2FA Handlers
  const generate2FASecret = async () => {
    setLoading({ ...loading, twoFAEnable: true });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/2fa/generate",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      setQrCode(response.data.qr);
      toast.success("2FA secret generated");
    } catch (error) {
      toast.error("Failed to generate 2FA secret");
    } finally {
      setLoading({ ...loading, twoFAEnable: false });
    }
  };

  const handle2FAChange = (e) => {
    setTwoFAForm({ ...twoFAForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, twoFA: {} });
  };

  const handle2FAEnable = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, twoFAEnable: true });
    
    try {
      await axios.post(
        "http://localhost:8000/api/v1/2fa/enable",
        { token: twoFAForm.token },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      toast.success("2FA enabled successfully");
      setTwoFAForm({ token: "" });
      setQrCode("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "2FA enable failed";
      toast.error(errorMessage);
    } finally {
      setLoading({ ...loading, twoFAEnable: false });
    }
  };

  const handle2FADisable = async () => {
    setLoading({ ...loading, twoFADisable: true });
    
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/2fa/disable",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      toast.success("2FA disabled successfully");
      setQrCode("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "2FA disable failed";
      toast.error(errorMessage);
    } finally {
      setLoading({ ...loading, twoFADisable: false });
    }
  };

  return (
    <Box className="max-w-3xl mx-auto mt-8">
      {/* Password Change Section */}
      <Paper elevation={3} className="p-8 mb-6 rounded-lg">
        <Typography variant="h5" className="mb-4 font-bold">
          Change Password
        </Typography>
        <Divider className="mb-6" />
        <form onSubmit={handlePasswordSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                error={!!errors.password.currentPassword}
                helperText={errors.password.currentPassword}
                className="h-14"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                error={!!errors.password.newPassword}
                helperText={errors.password.newPassword}
                className="h-14"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                error={!!errors.password.confirmPassword}
                helperText={errors.password.confirmPassword}
                className="h-14"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading.password}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2"
              >
                {loading.password ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* 2FA Section */}
      <Paper elevation={3} className="p-8 rounded-lg">
        <Typography variant="h5" className="mb-4 font-bold">
          Two-Factor Authentication
        </Typography>
        <Divider className="mb-6" />
        {user?.is2FAEnabled ? (
          <Box>
            <Typography className="text-green-600 mb-4">
              2FA is currently enabled for your account
            </Typography>
            <Button
              variant="contained"
              onClick={handle2FADisable}
              disabled={loading.twoFADisable}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
            >
              {loading.twoFADisable ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Disable 2FA"
              )}
            </Button>
          </Box>
        ) : (
          <Box>
            {qrCode ? (
              <form onSubmit={handle2FAEnable}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <QRCodeSVG value={qrCode} size={200} level="H" includeMargin={true} />
                    <Typography variant="body2" className="mt-2">
                      Scan this QR code with your authenticator app
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Enter 6-digit Code"
                      name="token"
                      value={twoFAForm.token}
                      onChange={handle2FAChange}
                      className="h-14"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading.twoFAEnable}
                      className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2"
                    >
                      {loading.twoFAEnable ? (
                        <CircularProgress size={24} className="text-white" />
                      ) : (
                        "Verify and Enable"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Button
                variant="contained"
                onClick={generate2FASecret}
                disabled={loading.twoFAEnable}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2"
              >
                {loading.twoFAEnable ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Set Up 2FA"
                )}
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
