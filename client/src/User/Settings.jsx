import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "../Store/authSlice.js";

export default function Settings() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [twoFAForm, setTwoFAForm] = useState({
    token: "",
  });
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState({
    password: false,
    twoFAEnable: false,
    twoFADisable: false,
  });
  const [errors, setErrors] = useState({
    password: {},
    twoFA: {},
  });

  // Password Change Handlers
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
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
      await axios.post(
        `http://localhost:8000/api/v1/users/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      // Show success toast
      toast.success("Password changed successfully!");

      // Clear the form fields
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Password change failed";
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        setErrors({ password: validationErrors });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      // Reset the loading state
      setLoading({ ...loading, password: false });
    }
  };

  // 2FA Handlers
  const generate2FASecret = async () => {
    setLoading({ ...loading, twoFAEnable: true });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/2fa/generate",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Verify the response structure
      console.log("2FA Generation Response:", response.data);

      const otpUrl = response.data?.otpauth_url || response.data?.qr;
      if (!otpUrl) {
        toast.error("QR code generation failed. Try again.");
        return;
      }

      setQrCode(otpUrl);
      toast.success("Scan the QR code with your authenticator app");
    } catch (error) {
      console.error("2FA Generation Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate QR code"
      );
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
        "http://localhost:8000/api/v1/users/2fa/enable",
        { token: twoFAForm.token },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("2FA enabled successfully");
      dispatch(setAuthUser({ ...user, is2FAEnabled: true }));

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setAuthUser({ ...user, is2FAEnabled: false }));

      toast.success("2FA disabled successfully");
      setQrCode("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "2FA disable failed";
      toast.error(errorMessage);
    } finally {
      setLoading({ ...loading, twoFADisable: false });
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="flex flex-1">
          <SideNav />

          <main className="flex-1 mt-36 p-6 pl-64">
            <Box>
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <Box
                  component={"main"}
                  sx={{
                    p: 3,
                    pl: 7,
                    width: "90%",
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <Paper elevation={3} className="p-8 mb-6 rounded-lg mr-8">
                    <Typography variant="h5" className="mb-8 font-bold pb-5">
                      Change Password
                    </Typography>

                    <form onSubmit={handlePasswordSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={10}>
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

                        <Grid item xs={10} sm={5}>
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

                        <Grid item xs={10} sm={5}>
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

                        <Grid item xs={10}>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={loading.password}
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
                            style={{
                              padding: "14px 18px",
                              width: "200px",
                              textTransform: "none",
                              fontSize: "16px",
                              borderRadius: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {loading.password ? (
                              <CircularProgress
                                size={24}
                                className="text-white"
                              />
                            ) : (
                              "Change Password"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>

                  {/* 2FA Section */}
                  <Paper elevation={3} className="p-8 mb-6 rounded-lg mr-8">
                    <Typography variant="h5" className="mb-8 font-bold pb-5">
                      Two-Factor Authentication
                    </Typography>

                    {user?.is2FAEnabled ? (
                      <Box>
                        <Typography className="text-purple-600 mb-4 mt-4">
                          2FA is currently enabled for your account
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={handle2FADisable}
                          disabled={loading.twoFADisable}
                          className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
                          style={{
                            padding: "14px 18px",
                            width: "180px",
                            textTransform: "none",
                            fontSize: "16px",
                            borderRadius: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {loading.twoFADisable ? (
                            <CircularProgress
                              size={24}
                              className="text-white"
                            />
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
                              <Grid item xs={10} md={5}>
                                <div
                                  className="qr-container"
                                  style={{ position: "relative" }}
                                >
                                  <img
                                    src={qrCode}
                                    alt="QR Code"
                                    style={{
                                      display: "block",
                                      margin: "0 auto",
                                      border: "1px solid #eee",
                                      padding: 8,
                                    }}
                                    width="256"
                                    height="256"
                                  />
                                  {loading.twoFAEnable && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor:
                                          "rgba(255,255,255,0.8)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <CircularProgress />
                                    </div>
                                  )}
                                </div>
                                <Typography
                                  variant="body2"
                                  className="mt-2 text-center"
                                >
                                  Scan with authenticator app
                                </Typography>
                              </Grid>

                              <Grid item xs={10} md={5}>
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
                                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
                                  style={{
                                    mt: 2,
                                    padding: "14px 18px",
                                    width: "180px",
                                    textTransform: "none",
                                    fontSize: "16px",
                                    borderRadius: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {loading.twoFAEnable ? (
                                    <CircularProgress
                                      size={24}
                                      className="text-white"
                                    />
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
                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
                            style={{
                              padding: "14px 18px",
                              width: "180px",
                              textTransform: "none",
                              fontSize: "16px",
                              borderRadius: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {loading.twoFAEnable ? (
                              <CircularProgress
                                size={24}
                                className="text-white"
                              />
                            ) : (
                              "Set Up 2FA"
                            )}
                          </Button>
                        )}
                      </Box>
                    )}
                  </Paper>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
