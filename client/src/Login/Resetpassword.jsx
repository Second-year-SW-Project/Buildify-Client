import React, { useState } from "react";
import {TextField, Button, CircularProgress,Box, Typography, Divider} from "@mui/material";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../Store/authSlice";
import pcImage from "../assets/images/pc3.jpg";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/reset-password",
        { email, otp, password, passwordConfirm },
        { withCredentials: true }
      );
      dispatch(setAuthUser(data.data.user));
      toast.success("Password reset successfully");
      navigate('/auth/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
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

        {/* Left side part */}
        <Box className="hidden md:flex flex-col justify-center items-center p-10 text-white w-1/2">
          <img src={logo} alt="Buildify Logo" className="h-18 mb-4" />
          <Typography variant="h6" className="text-center font-light">
            Get compatible recommendations <br /> Pick your ideal components
          </Typography>
        </Box>

        {/* Right side part */}
        <Box className="w-full md:w-1/2 p-8">
          <Box className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-16 mb-2 md:hidden" />
            <Typography variant="h5" className="!text-white font-bold">
              Reset Password
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {[
              { label: "Verification Code", value: otp, setter: setOtp, name: "otp", type: "text" },
              { label: "New Password", value: password, setter: setPassword, name: "password", type: "password" },
              { label: "Confirm Password", value: passwordConfirm, setter: setPasswordConfirm, name: "passwordConfirm", type: "password" }
            ].map(({ label, value, setter, name, type }, idx) => (
              <div key={idx}>
                <label className="text-white text-xs font-medium">{label}</label>
                <TextField
                  fullWidth
                  type={type}
                  variant="outlined"
                  size="small"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  name={name}
                  className="!bg-white !rounded-lg"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: '8px' },
                    "& .MuiInputBase-root": { borderColor: "#9b4de5", color: "#6a2c9c" },
                    "& .MuiOutlinedInput-input": { padding: "8px 12px" },
                  }}
                />
              </div>
            ))}

            <Button
              fullWidth
              type="submit"
              className="!bg-[#6a2c9c] !text-white !font-bold !py-1.5 !rounded-lg hover:!bg-[#7a32c6] !text-sm  !mt-12"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Reset Password"}
            </Button>

            <Typography className="!text-white !text-center !mt-6 !text-xs">
              <Link
                to="/adminpanel/auth/forgetpassword"
                className="!text-[#9b4de5] hover:!underline"
              >
                Back to Forgot Password
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
