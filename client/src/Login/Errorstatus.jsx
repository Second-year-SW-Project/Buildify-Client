import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/error.avif";

export default function ErrorStatus() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
       
        style={{
          backgroundImage: `url(${errorImage})`,
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)", 
        }}
      ></div>

      {/* Main Content Card */}
      <div className="relative z-10 bg-gray-900/70 backdrop-blur-md rounded-2xl p-10 max-w-md w-full text-center animate-fadeIn shadow-2xl border border-gray-700">
        
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-600/20 p-3 rounded-full">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main Title */}
        <Typography variant="h4" className="text-red-400 font-bold mb-4 tracking-wider">
          System Blocked
        </Typography>

        {/* Sub Title */}
        <Typography variant="body1" className="text-gray-300 mb-6">
          Oops! Your PC Builder account has been <span className="text-red-400 font-semibold">suspended</span> due to policy violation.
          <br />
          Please reach out to support.
        </Typography>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <Button
            variant="contained"
            onClick={() => navigate("/support")}
            sx={{
              backgroundColor: "#FF4C4C",
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e04343",
              },
            }}
          >
            Contact Support
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "10px 24px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#FF4C4C",
                color: "#FF4C4C",
              },
            }}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
