import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";
import { setAuthUser } from "../Store/authSlice.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AdminSettings() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFAForm, setTwoFAForm] = useState({ token: "" });
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

  // Dialog open state for Delete Account confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, password: {} });
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordForm.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwordForm.newPassword)
      newErrors.newPassword = "New password is required";
    else if (passwordForm.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors({ ...errors, password: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setLoading({ ...loading, password: true });

    try {
      await axios.post(
        `${backendUrl}/api/v1/users/change-password`,
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

      toast.success("Password changed successfully!");

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
      setLoading({ ...loading, password: false });
    }
  };

  // 2FA handlers (unchanged)...
  const generate2FASecret = async () => {
    setLoading({ ...loading, twoFAEnable: true });
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/users/2fa/generate`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const otpUrl = response.data?.otpauth_url || response.data?.qr;

      if (!otpUrl) {
        toast.error("QR code generation failed. Try again.");
        return;
      }

      setQrCode(otpUrl);
      toast.success("Scan the QR code with your authenticator app");
    } catch (error) {
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
        `${backendUrl}/api/v1/users/2fa/enable`,
        { token: twoFAForm.token },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("2FA enabled successfully");
      dispatch(setAuthUser({ ...user, is2FAEnabled: true }));

      setTwoFAForm({ token: "" });
      setQrCode("");
    } catch (error) {
      toast.error(error.response?.data?.message || "2FA enable failed");
    } finally {
      setLoading({ ...loading, twoFAEnable: false });
    }
  };

  const handle2FADisable = async () => {
    setLoading({ ...loading, twoFADisable: true });
    try {
      await axios.post(
        `${backendUrl}/api/v1/users/2fa/disable`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setAuthUser({ ...user, is2FAEnabled: false }));

      toast.success("2FA disabled successfully");
      setQrCode("");
    } catch (error) {
      toast.error(error.response?.data?.message || "2FA disable failed");
    } finally {
      setLoading({ ...loading, twoFADisable: false });
    }
  };

  // New: Handle Delete Account Confirm
  const handleDeleteAccount = async () => {
    setOpenDeleteDialog(false);
    try {
      await axios.delete(`${backendUrl}/api/v1/users/delete-account`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Your account has been permanently deleted.");
      localStorage.removeItem("token");
      dispatch(setAuthUser(null));
      window.location.href = "/";
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete account.";
      toast.error(errorMsg);
    }
  };

  return (
    <Box className="ml-7 mt-8">
      <div className="mt-3 mb-5">
        <PageTitle value="Admin Setting"></PageTitle>
        <CustomBreadcrumbs
          paths={[
            { label: "Admin", href: "/adminpanel/admin/profile" },
            { label: "Setting" },
          ]}
        />
      </div>

      {/* Password Change Section */}
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
      {/* <Paper elevation={3} className="p-8 mb-6 rounded-lg mr-8">
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
                            backgroundColor: "rgba(255,255,255,0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </div>
                      )}
                    </div>

                    <Typography variant="body2" className="mt-2 text-center">
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
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Set Up 2FA"
                )}
              </Button>
            )}
          </Box>
        )}
      </Paper> */}

      {/* Danger Zone - Delete Account */}
      <Paper elevation={3} className="p-8 mb-6 rounded-lg mr-8">
        <Typography variant="h5" className="mb-8 font-bold pb-5 text-black">
          Danger Zone
        </Typography>

        <Typography variant="body1" className="mb-4">
          Deleting your account is permanent and cannot be undone.
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
            style={{
              padding: "14px 18px",
              textTransform: "none",
              fontSize: "16px",
              borderRadius: "10px",
              fontWeight: "bold",
              width: "250px",
            }}
          >
            Delete My Account
          </Button>
        </Box>
      </Paper>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your account? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            autoFocus
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
