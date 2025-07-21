import { Button, TextField, CircularProgress, Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../store/authSlice";
import sideImage from "../assets/PC.webp"; // Ensure you have an appropriate image file
import logo from '../assets/logo.png';
const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async () => {
    if (!otp || !email || !password || !passwordConfirm) return;
    setLoading(true);

    try {
      const data = { email, otp, password, passwordConfirm };
      const response = await axios.post("https://buildify-server-d5yu.vercel.app/api/v1/users/reset-password", data, {
        withCredentials: true
      });

      dispatch(setAuthUser(response.data.data.user));
      toast.success("Password reset successfully");
      navigate('/auth/login');

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="center" sx={{ backgroundColor: '#4A2D73', marginLeft: '150px' }} width="125%">
      <Box display="flex" width="80%">
        {/* Left Side Image */}
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
          <img src={sideImage} alt="PC Builder" style={{ width: '100%', maxWidth: 400, marginTop: 20 }} />
        </Box>

        {/* Right Side Reset Password Card */}
        <Card sx={{ padding: 4, width: 400, borderRadius: 3, backgroundColor: '#23103C', color: 'white', textAlign: 'center', boxShadow: 3 }}>
          <img
                                      src={logo}  // Use the imported logo
                                      alt="Logo"
                                      style={{
                                        width: '120px',  // Adjust logo width
                                        height: '60px',  // Maintain aspect ratio
                                        marginRight: '16px',  // Add space between logo and text
                                      }}
                                    />
          <Typography variant="h5" fontWeight={600} marginBottom={2}>
            Reset Password
          </Typography>
          <TextField 
    type="text"  // Changed from 'number' to 'text' to remove arrows
    label="Enter OTP"
    variant="outlined"
    fullWidth
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    sx={{ 
        marginBottom: 2, 
        backgroundColor: '#f0f0f0',  // Light grey background
        borderRadius: '5px'
    }}
    inputProps={{ 
        inputMode: 'numeric', // Allows numeric input without number arrows
        pattern: '[0-9]*' 
    }}
/>

<TextField 
    type="password"
    label="Enter New Password"
    variant="outlined"
    fullWidth
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    sx={{ 
        marginBottom: 2, 
        backgroundColor: '#f0f0f0', // Light grey background
        borderRadius: '5px'
    }}
/>

<TextField 
    type="password"
    label="Confirm New Password"
    variant="outlined"
    fullWidth
    value={passwordConfirm}
    onChange={(e) => setPasswordConfirm(e.target.value)}
    sx={{ 
        marginBottom: 2, 
        backgroundColor: '#f0f0f0', // Light grey background
        borderRadius: '5px'
    }}
/>

          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            {!loading ? (
              <Box display="flex" justifyContent="space-between" sx={{ width: '100%', maxWidth: '300px', marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ width: '100%' }}>
                  Change Password
                </Button>
              </Box>
            ) : (
              <Button variant="contained" disabled sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <CircularProgress size={24} sx={{ marginRight: 1 }} /> Loading...
              </Button>
            )}

            <Button variant="text" color="secondary" component={Link} to="/auth/forgetpassword" sx={{ marginTop: 1 }}>
              Go Back
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ResetPassword;
