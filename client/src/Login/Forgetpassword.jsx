import React, { useState } from "react";
import {
  TextField, Button, CircularProgress, Box, Typography, Divider
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import logo from '../assets/logo.png';
import pcImage from "../assets/images/pc3.jpg";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/forget-password",
        { email },
        { withCredentials: true }
      );
      toast.success("Reset OTP sent to email");
      navigate(`/auth/resetpassword?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      sx={{
        backgroundImage: `url(${pcImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <Box className="relative z-10 w-full max-w-4xl h-[630px] flex flex-col md:flex-row items-center justify-between rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20">

        {/* Left section */}
        <Box className="hidden md:flex flex-col justify-center items-center p-10 text-white w-1/2">
          <img src={logo} alt="Buildify Logo" className="h-18 mb-4" />
          <Typography variant="h6" className="text-center font-light">
            Get compatible recommendations <br /> Pick your ideal components
          </Typography>
        </Box>

        {/* Right section - Forgot Password form */}
        <Box className="w-full md:w-1/2 p-8">
          <Box className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-16 mb-2 md:hidden" />
            <Typography variant="h5" className="!text-white font-bold space-y-6">
              Forgot Password
            </Typography>
          </Box>

          <Typography className="!text-white text-center text-sm mb-6 space-y-6">
            Enter your email to receive a password reset OTP
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label className="text-white text-xs font-medium">Email</label>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!bg-white !rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: '8px' },
                  "& .MuiOutlinedInput-input": { padding: "8px 12px" },
                }}
              />
            </div>

            <Button
              fullWidth
              type="submit"
              className="!bg-[#6a2c9c] !text-white !font-bold !py-1.5 !rounded-lg hover:!bg-[#7a32c6] !text-sm !mt-12 "
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Send Reset Code"}
            </Button>

            <Typography className="!text-white !text-center !mt-4 !text-xs mt-6">
              Remember your password?{" "}
              <Link to="/auth/login" className="!text-[#9b4de5] hover:!underline">
                Login here
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
