import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      navigate("/auth/login"); // Redirect to Login if no token
    }
  }, [navigate]);

  return <h1>Redirecting...</h1>; // Temporary message while redirecting
};

export default AuthRedirect;
