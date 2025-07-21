import { Button, CircularProgress, TextField, Box, Typography, Card } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import sideImage from "../assets/PC.webp"; // Ensure you have an appropriate image file
import logo from '../assets/logo.png';

// Add this in your main component (App.jsx)


const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async () => {

        setLoading(true);
        try {
            await axios.post("https://buildify-server-d5yu.vercel.app/api/v1/users/forget-password", { email }, { withCredentials: true });

            toast.success("Reset OTP sent to email");
            navigate(`/auth/resetpassword?email=${encodeURIComponent(email)}`);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" height="100vh" alignItems="center" justifyContent="center" sx={{ backgroundColor: "#4A2D73" ,
                    marginLeft: "150px"
                }} width="80%">
                    <Box display="flex" width="80%" maxWidth={1200}>
                        {/* Left Side Image */}
                        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
                            <Typography variant="h4" fontWeight={600} color="white" gutterBottom sx={{ fontSize: "50px" }}>
                                PC BUILDER
                            </Typography><br></br>
                            <Typography variant="body1" color="white" textAlign="center">
                                Get compatible recommendations
                                <br /> Pick your ideal components
                            </Typography><br></br>
                            <img src={sideImage} alt="PC Builder" style={{ width: "100%", maxWidth: 400, marginTop: 20 }} />
                        </Box>

                {/* Right Side Forget Password Card */}
                <Card sx={{ padding: 4, width: 300, borderRadius: 3, backgroundColor: "#23103C", color: "white" ,marginTop: "150px", height: "300px"}}>
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
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" marginBottom={3} color="white">
                        Enter your email to receive a reset password link.
                    </Typography>

                    <div style={{ marginBottom: "2px", fontSize: "14px", color: "#FFFFFF", fontWeight: "500" }}>
  Email
</div>

                    <TextField
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        name="email"
                        label="Email Address"
                        variant="filled"
                        fullWidth
                        required
                        InputProps={{
                            style: { 
                                backgroundColor: "white", 
                                height: "30px",  // Adjust field height
                                fontSize: "14px",
                                padding: "0 10px", // Padding for input text
                                alignItems: "center" // Ensure text is centered
                            },
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                height: "30px",  // Reduce field height
                                display: "flex",
                                alignItems: "center", // Center text vertically
                            },
                            "& .MuiInputLabel-root": {
                                fontSize: "12px", // Reduce label font size
                                top: "50%",  // Start label in center
                                transform: "translateY(-50%)",
                                left: "10px",  // Add left padding
                                paddingLeft: "5px", // Optional extra padding
                            },
                            "& .MuiInputLabel-shrink": {
                                top: "0", // Adjust when label shrinks
                                transform: "translateY(0)",
                                left: "5px", // Keep padding when label moves up
                            },
                        }}
                    />
                    <br></br>

                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={loading} marginTop="20px"  sx={{
        marginTop: 2,
        height: 35, // Reduce button height
        padding: "6px 16px", // Adjust padding for better proportions
    }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Password"}
                    </Button>

                    <Typography marginTop={2}>
                        <span style={{ color: "#ffcc00", cursor: "pointer" }} onClick={() => navigate("/auth/login")}>
                            Back to Login
                        </span>
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
};

export default ForgetPassword;
