import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, CircularProgress, Box, Typography } from "@mui/material";
import { toast } from 'sonner';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../Store/authSlice";
import logo from "../assets/logo.png";
import pcImage from "../assets/images/pc3.jpg";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Verify = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  //use to get the input one by one as an array
  const inputRefs = useRef([]);

  const user = useSelector((state) => state.auth.user);


  //if the user not there then it navigate to signup page
  useEffect(() => {
    if (!user) {
      navigate("/adminpanel/auth/signup", { replace: true });
    }
  }, [user, navigate]);


  const handleChange = (index, event) => {
    const { value } = event.target;
    if (/^\d{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, startIndex) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6 - startIndex; i++) {
      if (i >= paste.length) break;
      newOtp[startIndex + i] = paste[i];
    }

    setOtp(newOtp);

    const nextIndex = startIndex + paste.length;
    if (nextIndex <= 5) {
      inputRefs.current[nextIndex]?.focus();
    }
  };


  //get the otp value through verify
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join("");

      const response = await axios.post(
        `${backendUrl}/api/v1/users/verify`,
        { otp: otpValue },
        { withCredentials: true }
      );

      dispatch(setAuthUser(response.data.data.user));
      toast.success("Verification successful!");
      navigate("/adminpanel/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  //request to resend otp
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/api/v1/users/resend-otp`, null, {
        withCredentials: true,
      });
      toast.success("New OTP sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      sx={{
        backgroundImage: `url(${pcImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <Box className="relative z-10 w-full max-w-4xl h-[630px] flex flex-col md:flex-row items-center justify-between rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
        {/* Left side */}
        <Box className="hidden md:flex flex-col justify-center items-center p-10 text-white w-1/2">
          <img src={logo} alt="Buildify Logo" className="h-18 mb-4" />
          <Typography variant="h6" className="text-center font-light">
            Get compatible recommendations <br /> Pick your ideal components
          </Typography>
        </Box>

        {/* Right side */}
        <Box className="w-full md:w-1/2 p-8">
          <Box className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-16 mb-2 md:hidden" />
            <Typography variant="h5" className="!text-white font-bold">
              Verify Your Email
            </Typography>
          </Box>

          <Typography className="!text-white !text-center !mb-6 !text-sm">
            Enter the 6-digit code sent to your email
          </Typography>

          <Box className="flex justify-center space-x-2 mb-8">
            {otp.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.25rem" },
                }}
                className="!bg-white !rounded"
                sx={{
                  width: "50px",
                  "& .MuiInputBase-root": {
                    height: "50px",
                  },
                }}
              />
            ))}
          </Box>

          <Box className="flex flex-col space-y-4">
            <Button
              fullWidth
              onClick={handleSubmit}
              className="!bg-[#6a2c9c] !text-white !font-bold !py-1.5 !rounded-lg hover:!bg-[#7a32c6] !text-sm"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Verify Code"}
            </Button>

            <Button
              fullWidth
              onClick={handleResendOtp}
              className="!text-[#FFFFFF] !font-medium !py-1.5 !rounded-lg hover:!bg-[#7a32c6] !text-xs !normal-case"
              disabled={loading}
            >
              Resend Code
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Verify;
