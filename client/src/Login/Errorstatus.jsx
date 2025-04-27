import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorStatus() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-gray-500 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-12 max-w-lg w-full text-center transform transition-all duration-500 scale-105 hover:scale-110">
        <div className="mb-6">
          <Typography variant="h4" className="text-red-600 font-bold mb-4 animate__animated animate__fadeIn">
            🚫 Access Denied
          </Typography>
          <Typography variant="h6" className="text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Your account has been <span className="text-red-500 font-semibold">banned</span> or <span className="text-red-500 font-semibold">blocked</span>. 
            You cannot log in at this time.
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Please contact support if you believe this is a mistake.
          </Typography>
        </div>

        <div className="space-x-2">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/support")}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
            sx={{
              textTransform: "none",
              padding: "14px 18px",
              width: "180px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px"
            }}
          >
            Contact Support
          </Button>

          <Button 
            variant="text" 
            onClick={() => navigate("/")}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
            sx={{
              textTransform: "none",
              padding: "14px 18px",
              width: "180px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px"
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
