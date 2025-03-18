import React, { useState } from "react";
import { 
  TextField, Button, CircularProgress, 
  Box, Typography, Card, Divider 
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import logo from '../assets/logo.png';
import pcImage from "../assets/PC.webp";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login", 
        formData, 
        { withCredentials: true }
      );
      
      const user = response.data.data.user;
      localStorage.setItem('userId', user._id);
      toast.success("Login successful!");
      dispatch(setAuthUser(user));
      
      navigate(user.Role === "admin" ? '/dashboard' : '/user');
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error: Please check your connection");
      } else {
        toast.error("An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8000/auth/google", "_self");
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
            src={pcImage} 
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
              Login
            </Typography>
          </Box>

          <form onSubmit={submitHandler} className="space-y-3">
            {/* Email Field */}
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
                  style: { borderRadius: '8px' } 
                }}
              />
            </div>

            {/* Password Field */}
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
                  style: { borderRadius: '8px' } 
                }}
              />
            </div>

            {/* Forgot Password Link */}
            <Typography className="!text-right !mb-2">
              <Link 
                to="/auth/forgetpassword" 
                className="!text-[#60A5FA] hover:!underline !text-xs"
              >
                Forgot Password?
              </Link>
            </Typography>

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              className="!bg-[#60A5FA] !text-white !font-bold !py-1.5 !rounded-lg
                        hover:!bg-[#3B82F6] !text-sm !mt-2 !normal-case"
              disabled={loading}
              sx={{ height: '36px' }}
            >
              {loading ? <CircularProgress size={20} /> : "Login"}
            </Button>

            {/* Divider */}
            <Divider 
              sx={{ 
                my: 4,
                color: 'white',
                '&.MuiDivider-root::before, &.MuiDivider-root::after': {
                  borderColor: 'rgba(255,255,255,0.5)'
                }
              }}
            >
              <span className="text-xs">or</span>
            </Divider>

            {/* Google Button */}
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

            {/* Signup Link */}
            <Typography className="!text-white !text-center !mt-4 !text-xs">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="!text-[#60A5FA] hover:!underline">
                Sign Up
              </Link>
            </Typography>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;