import React, { useState } from "react";
import {
  TextField, Button, Checkbox, FormControlLabel,
  CircularProgress, Box, Typography, Divider
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from 'sonner';
import { setAuthUser } from "../Store/authSlice";

import logo from '../assets/logo.png';
import pcImage from "../assets/images/pc3.jpg";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", passwordConfirm: ""
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
    <Box
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      sx={{
        backgroundImage: `url(${pcImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

      }}
    >
      {/* Blurry overlay */}
      <Box className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />


      <Box className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
        
        {/* Left side: Logo and quote */}
        <Box className="hidden md:flex flex-col justify-center items-center p-10 text-white w-1/2">
          <img src={logo} alt="Buildify Logo" className="h-18 mb-4" />
          <Typography variant="h6" className="text-center font-light">
            Get compatible recommendations <br /> Pick your ideal components
          </Typography>
        </Box>

        {/* Right side: Signup Form */}
        <Box className="w-full md:w-1/2 p-8">
          <Box className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-16 mb-2 md:hidden" />
            <Typography variant="h5" className="!text-white font-bold">
              Sign Up
            </Typography>
          </Box>

          <form onSubmit={submitHandler} className="space-y-4">
            {["name", "email", "password", "passwordConfirm"].map((field, idx) => (
              <div key={idx}>
                <label className="text-white text-xs font-medium capitalize">
                  {field.replace("Confirm", " Confirm")}
                </label>
                <TextField
                  fullWidth
                  type={field.includes("password") ? "password" : "text"}
                  variant="outlined"
                  size="small"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="!bg-white !rounded-lg"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: '8px', // Adjust the border-radius here
                    },
                    "& .MuiInputBase-root": {
                      borderColor: "#9b4de5",
                      color: "#6a2c9c",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "8px 12px", // Reduce the padding for slightly smaller input
                    },
                  }}
                />
              </div>
            ))}

            <FormControlLabel
              control={
                <Checkbox
                  className="!text-white"
                  size="small"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label={
                <span className="text-white text-xs">
                  Accept the T&C and have read the Privacy Policy
                </span>
              }
            />

            <Button
              fullWidth
              type="submit"
              className="!bg-[#6a2c9c] !text-white !font-bold !py-1.5 !rounded-lg hover:!bg-[#7a32c6] !text-sm"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Sign Up"}
            </Button>

            <Divider
              sx={{
                my: 3,
                color: 'white',
                '&.MuiDivider-root::before, &.MuiDivider-root::after': {
                  borderColor: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              <span className="text-xs text-white">or</span>
            </Divider>

            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<GoogleIcon fontSize="small" />}
              className="!bg-white !text-black !font-medium !py-1.5 !rounded-lg hover:!bg-gray-100 !text-xs !normal-case"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            <Typography className="!text-white !text-center !mt-4 !text-xs">
              Already have an account?{" "}
              <Link to="/auth/login" className="!text-[#9b4de5] hover:!no-underline">
                Sign in
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
