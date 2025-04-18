import React, { useState, useRef, useEffect } from 'react';
import {
    Button, Grid, Typography, Box,
    TextField, CircularProgress, Card, Divider
} from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../Store/authSlice';
import { useNavigate } from 'react-router-dom';
import pcImage from "../assets/PC.webp";
import logo from '../assets/logo.png';

const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const hiddenInputRef = useRef(null);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate('adminpanel/auth/signup', { replace: true });
        }
    }, [user, navigate]);

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(pasteData)) {
            const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''));
            setOtp(newOtp);

            // Focus on last entered digit
            const focusIndex = Math.min(pasteData.length - 1, 5);
            inputRefs.current[focusIndex]?.focus();
        }
    };

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
        const { key } = event;
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const otpValue = otp.join('');
            const response = await axios.post(
                'http://localhost:8000/api/v1/users/verify',
                { otp: otpValue },
                { withCredentials: true }
            );

            dispatch(setAuthUser(response.data.data.user));
            toast.success('Verification successful');
            navigate('/auth/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/v1/users/resend-otp', null, { withCredentials: true });
            toast.success('New OTP sent to your email');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Resend failed');
        } finally {
            setLoading(false);
        }
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
                            Verify Your Email
                        </Typography>
                    </Box>

                    {/* Hidden input for paste functionality */}
                    <TextField
                        inputRef={hiddenInputRef}
                        style={{
                            opacity: 0,
                            position: 'absolute',
                            pointerEvents: 'none'
                        }}
                        onPaste={handlePaste}
                    />

                    <Typography className="!text-white !text-center !mb-4 !text-sm">
                        Enter the 6-digit code sent to your email
                    </Typography>

                    <Grid container spacing={2} justifyContent="center" className="!mb-6">
                        {otp.map((digit, index) => (
                            <Grid item key={index}>
                                <TextField
                                    value={digit}
                                    onChange={(e) => handleChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    inputRef={(el) => (inputRefs.current[index] = el)}
                                    onFocus={() => hiddenInputRef.current?.focus()}
                                    type="text"
                                    inputProps={{
                                        maxLength: 1,
                                        className: "!text-center !text-xl",
                                    }}
                                    className="!bg-white !rounded"
                                    sx={{
                                        width: '50px',
                                        '& .MuiInputBase-root': {
                                            height: '50px'
                                        }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Box className="flex flex-col space-y-4">
                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            className="!bg-[#60A5FA] !text-white !font-bold !py-1.5 !rounded-lg
                                    hover:!bg-[#3B82F6] !text-sm !normal-case"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Verify Code"}
                        </Button>

                        <Button
                            fullWidth
                            onClick={handleResendOtp}
                            className="!text-[#60A5FA] !font-medium !py-1.5 !rounded-lg
                                    hover:!bg-[#3B82F610] !text-xs !normal-case"
                            disabled={loading}
                        >
                            Resend Code
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Verify;
