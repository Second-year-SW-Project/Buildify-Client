import React, { useState, useRef, useEffect } from 'react';
import { Button, Grid, Typography, Box, TextField, CircularProgress, Card } from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import sideImage from "../assets/PC.webp"; // Ensure you have an appropriate image file
import logo from '../assets/logo.png';

const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            // If no user is found, redirect to the signup page
            navigate('/auth/signup', { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (index, event) => {
        const { value } = event.target;

        if (/^\d{0,1}$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value.length === 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, event) => {
        const { key } = event;

        if (key === 'ArrowRight' && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }

        if (key === 'ArrowLeft' && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }

        if (key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }

        if (key === 'Delete' && !otp[index] && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const otpValue = otp.join('');
            const response = await axios.post('http://localhost:8000/api/v1/users/verify', { otp: otpValue }, { withCredentials: true });

            const verifiedUser = response.data.data.user;
            dispatch(setAuthUser(verifiedUser));
            toast.success('Verification successful');
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/v1/users/resend-otp', null, { withCredentials: true });
            toast.success('New OTP is sent to your email');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" height="100vh" alignItems="center" justifyContent="center" sx={{ backgroundColor: '#4A2D73', marginLeft: '150px' }} width="125%">
            <Box display="flex" width="80%" maxWidth={1200}>
                {/* Left Side Image */}
                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
                    <img src={sideImage} alt="PC Builder" style={{ width: '100%', maxWidth: 400, marginTop: 20 }} />
                </Box>

                {/* Right Side Verify OTP Card */}
                <Card sx={{ padding: 4, width: 400, borderRadius: 3, backgroundColor: '#23103C', color: 'white', textAlign: 'center', boxShadow: 3 }}>
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
                        Enter Your Email Verification Code
                    </Typography>
                    <Grid 
    container 
    spacing={2} 
    justifyContent="center" 
    sx={{ 
        marginBottom: '1rem', 

        // Light grey grid color
        padding: '5px', 
        borderRadius: '8px' // Optional for rounded corners
    }}
>
    {otp.map((_, index) => (
        <Grid item key={index}>
            <TextField
                value={otp[index]}
                onChange={(e) => handleChange(index, e)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                type="text"
                inputProps={{
                    maxLength: 1,
                    style: { 
                        textAlign: 'center', 
                        fontSize: '1.5rem' 
                    },
                }}
                variant="outlined"
                size="small"
                sx={{ 
                    width: '50px', 
                    height: '50px',
                    backgroundColor: 'white', // Ensures text fields have a white background
                    borderRadius: '5px',
                }}
            />
        </Grid>
    ))}
</Grid>

                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                        {!loading ? (
                            <Box display="flex" justifyContent="space-between" sx={{ width: '100%', maxWidth: '300px' }}>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Button variant="text" color="secondary" onClick={handleResendOtp}>
                                    Resend OTP
                                </Button>
                            </Box>
                        ) : (
                            <Button variant="contained" disabled sx={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress size={24} sx={{ marginRight: 1 }} /> Loading...
                            </Button>
                        )}
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default Verify;
