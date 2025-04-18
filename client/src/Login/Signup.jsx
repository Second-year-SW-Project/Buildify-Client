import React, { useState } from "react";
import {
  TextField, Button, Checkbox, FormControlLabel,
  CircularProgress, Box, Typography, Card, Divider
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';
import { setAuthUser } from "../Store/authSlice";
import logo from '../assets/logo.png';
import pcImage from "../assets/PC.webp";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        formData,
        { withCredentials: true }
      );

      const user = response.data.data.user;
      toast.success("Sign up successful!");
      dispatch(setAuthUser(user));
      navigate('/auth/verify');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error: Please check your connection");
      } else {
        toast.error("An error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <Box className="flex h-screen bg-gray-300 items-center justify-center p-4 shadow-2xl backdrop-blur-2xl bg-opacity-60">


      <Card className="!bg-[#23103C] !rounded-xl !flex !p-8 !w-full md:!max-w-5xl !shadow-lg">
        {/* Left Section */}
        <Box className="flex-[1.2] !hidden md:!flex flex-col items-center justify-center !pr-6">
          <img
            src={logo}
            alt="Logo"
            className="w-30 mb-4"
          />
          <Typography variant="h6" className="!text-white !text-center !mb-6 !text-lg">
            Get compatible recommendations
            <br /> Pick your ideal components
          </Typography>
          <img
            src={pcImage}
            alt="PC"
            className="w-full max-w-[300px] !mt-4"
          />
        </Box>

        {/* Vertical Divider */}
        <Divider
          orientation="vertical"
          flexItem
          className="!bg-white/30 !mx-6 !hidden md:!block"
        />

        {/* Right Section */}
        <Box className="flex-1 !min-w-[180px] !max-w-sm">

          <Box className="flex flex-col items-center mb-6">

            <Typography variant="h4" className="!text-white !font-bold !text-2xl">
              Sign Up
            </Typography>
          </Box>

          <form onSubmit={submitHandler} className="space-y-3">
            {/* Form fields remain the same */}
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Full name</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="!bg-white !rounded"
                InputProps={{
                  className: "!h-8 !text-xs",
                  style: { borderRadius: '4px' }
                }}
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Email</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="!bg-white !rounded"
                InputProps={{
                  className: "!h-8 !text-xs",
                  style: { borderRadius: '4px' }
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Password</label>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="!bg-white !rounded"
                InputProps={{
                  className: "!h-8 !text-xs",
                  style: { borderRadius: '4px' }
                }}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Confirm Password</label>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="!bg-white !rounded"
                InputProps={{
                  className: "!h-8 !text-xs",
                  style: { borderRadius: '4px' }
                }}
              />
            </div>

            {/* Terms Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  className="!text-white"
                  size="small"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  sx={{ padding: '4px', paddingLeft: '10px' }}
                />
              }
              label={
                <span className="text-white text-xs">
                  Accept the T&C and have read the Privacy Policy
                </span>
              }
              className="!mt-2"
            />


            {/* Sign Up Button - Changed to light blue */}
            <Button
              fullWidth
              type="submit"
              className="!bg-[#60A5FA] !text-white !font-bold !py-1.5 !rounded-lg
                        hover:!bg-[#3B82F6] !text-sm !mt-2 !normal-case"
              disabled={loading}
              sx={{ height: '36px' }}
            >
              {loading ? <CircularProgress size={20} /> : "Sign Up"}
            </Button>

            {/* Divider - Updated styling */}
            <Divider
              sx={{
                my: 4,
                color: 'white',
                '&.MuiDivider-root::before, &.MuiDivider-root::after': {
                  borderColor: 'rgba(255,255,255,0.5)'
                }
              }}
            >
              <span className="text-xs text-white">or</span>
            </Divider>

            {/* Google Button Only */}
            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<GoogleIcon fontSize="small" />}
              className="!bg-white !text-black !font-medium !py-1.5 !rounded-lg
                        hover:!bg-gray-100 !text-xs !normal-case"
              onClick={handleGoogleLogin}
              sx={{ height: '36px' }}
            >
              Continue with Google
            </Button>

            {/* Login Link */}
            <Typography className="!text-white !text-center !mt-4 !text-xs">
              Already have an account?{" "}
              <Link to="/adminpanel/auth/login" className="!text-[#60A5FA] hover:!no-underline">
                Sign in
              </Link>
            </Typography>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default Signup;