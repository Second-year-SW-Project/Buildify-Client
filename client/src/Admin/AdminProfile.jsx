import React, { useState } from "react";
import {
  Box,
  Paper,
  Divider,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AdminProfile() {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div>
      {/* Main Profile Section beside the Sidebar */}
      <Box>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%", // Increased width to 95%
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Profile
          </Typography>
          <Divider />

          <Box sx={{ pt: 3, textAlign: "center" }}>
            <AccountCircleIcon sx={{ fontSize: 60, color: "#6a1b9a" }} />
          </Box>

          {/* Username and Email Address Section */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                defaultValue="Gethmi02"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { height: "60px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                defaultValue="gethmi@gmail.com"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { height: "60px" },
                }}
              />
            </Grid>
          </Grid>

          {/* First Name and Last Name Section */}
          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                defaultValue="Gethmi"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { height: "60px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                defaultValue="Rathnayaka"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: { height: "60px" },
                }}
              />
            </Grid>
          </Grid>

          {/* Address Section */}
          <Box sx={{ marginTop: 6 }}>
            <TextField
              type="text"
              variant="outlined"
              label="Address"
              defaultValue="1234, Example St."
              fullWidth
              InputProps={{
                sx: { height: "60px" },
              }}
              sx={{ marginBottom: 2 }}
            />
          </Box>

          {/* Two-Factor Authentication Section */}
          <Box sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ padding: 3, width: "100%", mb: 3 }}>
              <Typography variant="h6" sx={{ color: "gray" }}>
                Two-Factor Authentication (2FA)
              </Typography>
              <Typography sx={{ color: "gray", mt: 1 }}>
                Status: {isEnabled ? "Enabled" : "Disabled"}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: isEnabled ? "#d32f2f" : "#6a1b9a",
                  color: "white",
                  "&:hover": {
                    backgroundColor: isEnabled ? "#b71c1c" : "#4a148c",
                  },
                  padding: "6px 12px",
                  maxWidth: "100%",
                }}
                onClick={handleToggle}
              >
                {isEnabled ? "Disable" : "Enable"}
              </Button>
            </Paper>
          </Box>

          {/* Checkbox for Email Updates */}
          <Box sx={{ mb: 5 }}>
            <label>
              <input type="checkbox" /> Sign up for emails to get updates
            </label>
          </Box>

          {/* Change Password Text */}
          <Button
  variant="text"
  sx={{
    mt: 2,
    color: "#6a1b9a",
    fontWeight: "medium",
    textTransform: "none",
    "&:hover": { backgroundColor: "transparent", textDecoration: "underline" },
  }}
  onClick={() => alert("Redirect to Change Password Page")}
>
  Change password
</Button>


          {/* Save Button */}
          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#6a1b9a",
              color: "white",
              "&:hover": { backgroundColor: "#4a148c" },
              width: "10%",
              padding: "6px 12px",
              fontSize: "14px",
              maxWidth: "100%",
            }}
          >
            Save
          </Button>
        </Paper>
      </Box>
    </div>
  );
}
