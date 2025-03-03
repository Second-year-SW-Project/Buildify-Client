import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuthUser } from '../store/authSlice';
import { toast } from 'sonner';

const GoogleCallbackPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleCallback = async () => {
        try {
            // Send a request to the backend's callback route
            const response = await axios.get("http://localhost:8000/auth/google/callback", { withCredentials: true });
            const user = response.data.data.user; // Assuming the backend sends the user data

            // Store user in Redux
            dispatch(setAuthUser(user));

            // Redirect to the dashboard after successful login
            navigate('/');
            toast.success("Logged in with Google successfully");
        } catch (error) {
            toast.error("Google login failed");
        }
    };

    useEffect(() => {
        googleCallback(); // Automatically trigger googleCallback when the page is loaded
    }, []);

    return (
        <div>
            <h1>Redirecting...</h1>
            <p>If you're not redirected automatically, click <a href="/">here</a>.</p>
        </div>
    );
};

export default GoogleCallbackPage;
