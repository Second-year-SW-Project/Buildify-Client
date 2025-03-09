import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/auth/google/callback", { withCredentials: true });
                dispatch(setAuthUser(response.data.user));
                navigate("/");
            } catch (error) {
                console.error("OAuth login failed", error);
                navigate("/auth/login");
            }
        };

        fetchUser();
    }, [dispatch, navigate]);

    return <p>Loading...</p>;
};

export default OAuthCallback;
