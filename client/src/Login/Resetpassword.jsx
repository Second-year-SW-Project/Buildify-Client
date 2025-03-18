import { Button, TextField, CircularProgress, Box, Card, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../store/authSlice";
import sideImage from "../assets/PC.webp";
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
    if (!otp || !email || !password || !passwordConfirm) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const data = { email, otp, password, passwordConfirm };
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/reset-password", 
        data, 
        { withCredentials: true }
      );

      dispatch(setAuthUser(response.data.data.user));
      toast.success("Password reset successfully");
      navigate('/auth/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex h-screen bg-[#4A2D73] items-center justify-center p-4">
      <Card className="!bg-[#23103C] !rounded-xl !flex !p-8 !w-full md:!max-w-5xl !shadow-lg">
        {/* Left Section */}
        <Box className="flex-[1.2] !hidden md:!flex flex-col items-center justify-center !pr-6">
          <Typography variant="h3" className="!text-white !font-bold !mb-4 !text-4xl">
            PC BUILDER
          </Typography>
          <Typography variant="h6" className="!text-white !text-center !mb-6 !text-lg">
            Get compatible recommendations
            <br /> Pick your ideal components
          </Typography>
          <img 
            src={sideImage} 
            alt="PC" 
            className="w-full max-w-[420px] !mt-4" 
          />
        </Box>

        {/* Vertical Divider */}
        <Divider 
          orientation="vertical" 
          flexItem 
          className="!bg-white/30 !mx-6 !hidden md:!block" 
        />

        {/* Right Section */}
        <Box className="flex-1 !min-w-[300px] !max-w-md">
          <Box className="flex flex-col items-center mb-6">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-24 mb-4" 
            />
            <Typography variant="h4" className="!text-white !font-bold !text-xl">
              Reset Password
            </Typography>
          </Box>

          <form className="space-y-4">
            {/* OTP Field */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Verification Code</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="!bg-white !rounded"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  className: "!text-xs"
                }}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">New Password</label>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!bg-white !rounded"
                InputProps={{ className: "!text-xs" }}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Confirm Password</label>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="!bg-white !rounded"
                InputProps={{ className: "!text-xs" }}
              />
            </div>

            {/* Submit Button */}
            <Button
              fullWidth
              onClick={handleSubmit}
              className="!bg-[#60A5FA] !text-white !font-bold !py-1.5 !rounded-lg
                      hover:!bg-[#3B82F6] !text-sm !normal-case"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Reset Password"}
            </Button>

            {/* Back Link */}
            <Typography className="!text-white !text-center !mt-4 !text-xs">
              <Link 
                to="/auth/forgetpassword" 
                className="!text-[#60A5FA] hover:!underline"
              >
                Back to Forgot Password
              </Link>
            </Typography>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default ResetPassword;