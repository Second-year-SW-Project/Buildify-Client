import { Button, CircularProgress, TextField, Box, Typography, Card, Divider } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import sideImage from "../assets/PC.webp";
import logo from '../assets/logo.png';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:8000/api/v1/users/forget-password", 
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
                            Forgot Password
                        </Typography>
                    </Box>

                    <Typography className="!text-white !text-center !mb-6 !text-sm">
                        Enter your email to receive a password reset OTP
                    </Typography>

                    <form className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="text-white text-xs font-medium">Email</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="!bg-white !rounded"
                                InputProps={{ 
                                    className: "!h-8 !text-xs",
                                    style: { borderRadius: '8px' } 
                                }}
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
                            {loading ? <CircularProgress size={20} /> : "Send Reset Code"}
                        </Button>

                        {/* Login Link */}
                        <Typography className="!text-white !text-center !mt-4 !text-xs">
                            Remember your password?{" "}
                            <Link 
                                to="/auth/login" 
                                className="!text-[#60A5FA] hover:!underline"
                            >
                                Login here
                            </Link>
                        </Typography>
                    </form>
                </Box>
            </Card>
        </Box>
    );
};

export default ForgetPassword;
