import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, CircularProgress, Box, Typography, Card, Divider } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import pcImage from "../assets/PC.webp";
import { toast, Toaster } from 'sonner';
import logo from '../assets/logo.png';



const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://buildify-server-d5yu.vercel.app/api/v1/users/signup", formData, { withCredentials: true });
            
            const user = response.data.data.user;
            toast.success("SignUp successfully");
            dispatch(setAuthUser(user));
            navigate('/auth/verify');

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);  // Corrected this line
            } else if (error.request) {
                toast.error("Network error: Please check your connection.");
            } else {
                toast.error("An error occurred during signup.");
            }
            setError("An error occurred during signup.");
            
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        // Redirect to backend Google OAuth
        window.location.href = "https://buildify-server-d5yu.vercel.app/auth/google";
       

        
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
                    <img src={pcImage} alt="PC Builder" style={{ width: "100%", maxWidth: 400, marginTop: 20 }} />
                </Box>
                
                {/* Right Side Signup Card */}
                <Card sx={{ padding: 4, width: 300, borderRadius: 3, backgroundColor: "#23103C", color: "white" }}>
                <img
        src={logo}  // Use the imported logo
        alt="Logo"
        style={{
          width: '120px',  // Adjust logo width
          height: '60px',  // Maintain aspect ratio
          marginRight: '16px',  // Add space between logo and text
        }}
      />
                    <Typography variant="h5" textAlign="center" fontWeight={600} marginBottom={2}>Sign Up</Typography>
                    <form onSubmit={submitHandler}>


                    <div style={{ marginBottom: "2px", fontSize: "14px", color: "#FFFFFF", fontWeight: "500" }}>
  Username
</div>


                    <TextField
    fullWidth
    label="Username"
    name="name"
    value={formData.name}
    onChange={handleChange}
    margin="normal"
    variant="filled"
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

<div style={{ marginBottom: "2px", fontSize: "14px", color: "#FFFFFF", fontWeight: "500" }}>
  Email
</div>


                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            variant="filled"
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
                        <div style={{ marginBottom: "2px", fontSize: "14px", color: "#FFFFFF", fontWeight: "500" }}>
  Password
</div>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            variant="filled"
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

<div style={{ marginBottom: "2px", fontSize: "14px", color: "#FFFFFF", fontWeight: "500" }}>
  Confirm Password
</div>
                        <TextField
                            fullWidth
                            type="password"
                            label="Confirm Password"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            margin="normal"
                            variant="filled"
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
                        <FormControlLabel
    control={
        <Checkbox
            style={{
                color: "white",
                transform: "scale(0.8)", // Reduce checkbox size
            }}
        />
    }
    label={
        <Typography
            style={{
                color: "white",
                fontSize: "15px", // Reduce label font size
                fontWeight: "400", // Adjust font weight (optional)
            }}
        >
            I agree to the terms and conditions
        </Typography>
    }
/>
<Button
    fullWidth
    type="submit"
    variant="contained"
    color="primary"
    sx={{
        marginTop: 2,
        height: 35, // Reduce button height
        padding: "6px 16px", // Adjust padding for better proportions
    }}
>
    {loading ? <CircularProgress size={24} /> : "Sign Up"}
</Button>

                    </form>
                    <Divider sx={{ backgroundColor: "#ffffff30", marginY: 2 }} />
                    <Button
    fullWidth
    startIcon={<GoogleIcon />}
    variant="contained"
    sx={{
        backgroundColor: "#D3D3D3",  // Light blue color
        color: "#000000",            // Black text color
        fontSize: "12px",            // Reduced font size
        height: "35px",              // Reduced button height
        padding: "6px 16px",         // Adjust padding for smaller button
        "&:hover": {
            backgroundColor: "#87CEEB",  // Slightly darker blue on hover
        },
    }}
    onClick={handleGoogleLogin}
>
    Sign up with Google
</Button>


                    <Typography textAlign="center" marginTop={2}>
                        Already have an account? <Link to="/auth/login" style={{ color: "#ffcc00" }}>Login</Link>
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
};


export default Signup;

