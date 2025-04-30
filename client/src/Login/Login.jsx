import React, { useState } from "react";
import {TextField, Button, CircularProgress,Box, Typography, Divider} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from 'sonner';
import { setAuthUser } from "../Store/authSlice";
import logo from '../assets/logo.png';
import pcImage from "../assets/images/pc3.jpg";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
      //get user email and password for login
      const response = await axios.post(
        `${backendUrl}/api/v1/users/login`,
        formData,
        { withCredentials: true }
      );
    
      const user = response.data.data.user;
    
      localStorage.setItem('userId', user._id);
      localStorage.setItem('token', response.data.token);
      dispatch(setAuthUser(user));
    
      //  Check if user is not verified
      if (!user.isVerified) {

        toast.error("Please verify your email before proceeding.");
        navigate("/adminpanel/auth/verify", {
          state: { email: user.email },
        });
        return;

      }
    
      // Check if user is banned
      if (user.status === "banned") {

        toast.error("Your account has been banned!");
        navigate('/user/errorstatus');
        return; 

      }
    
      toast.success("Login successful!");
    
      if (user.Role === "admin") {
        navigate('/adminpanel/dashboard');
      } else {
        navigate('/user/profile');
      }
    
    } catch (error) {

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error: Please check your connection");
      } else {
        toast.error("An error occurred during login");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${backendUrl}/auth/google`, "_self");
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
        
        {/* Left Section */}
        <Box className="hidden md:flex flex-col justify-center items-center p-10 text-white w-1/2">
          <img src={logo} alt="Buildify Logo" className="h-18 mb-4" />
          <Typography variant="h6" className="text-center font-light">
            Get compatible recommendations <br /> Pick your ideal components
          </Typography>
        </Box>

        {/* Right Section */}
        <Box className="w-full md:w-1/2 p-8">
          <Box className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-16 mb-2 md:hidden" />
            <Typography variant="h5" className="!text-white font-bold">
              Login
            </Typography>
          </Box>

          <form onSubmit={submitHandler} className="space-y-4">
            
            <div>
              <label className="text-white text-xs font-medium">Email</label>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                size="small"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="!bg-white !rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: '8px' },
                  "& .MuiOutlinedInput-input": { padding: "8px 12px" },
                }}
              />
            </div>

            
            <div>
              <label className="text-white text-xs font-medium">Password</label>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="!bg-white !rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: '8px' },
                  "& .MuiOutlinedInput-input": { padding: "8px 12px" },
                }}
              />
            </div>

      
            <Typography className="!text-right !mb-2">
              <Link to="/adminpanel/auth/forgetpassword" className="!text-[#9b4de5] hover:!no-underline !text-xs">
                Forgot Password?
              </Link>
            </Typography>

            
            <Button
              fullWidth
              type="submit"
              className="!bg-[#6a2c9c] !text-white !font-bold !py-1.5 !rounded-lg hover:!bg-[#7a32c6] !text-sm"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Login"}
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
              Don't have an account?{" "}
              <Link to="/adminpanel/auth/signup" className="!text-[#9b4de5] hover:!no-underline">
                Sign Up
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
