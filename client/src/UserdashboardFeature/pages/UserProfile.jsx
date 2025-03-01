import React, { useState } from "react";
import { Box } from "@mui/system";
import SideNav from "../SideNav";
import { Divider, Paper } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputField } from "../../AtomicComponents/Inputs/Input";
import { OutlinedButton } from "../../AtomicComponents/Buttons/Buttons";

export default function UserProfile() {
  const [isEnabled, SetIsEnabled] = useState(false);

  const handleToggle = () => {
    SetIsEnabled(!isEnabled);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component={"main"} sx={{ flexGrow: 1, p: 3, pl: 1 }}>
          <h1 className="text-3xl font-bold mt-5 mb-6">Profile</h1>
          <Divider></Divider>
          <Box sx={{ pt: 3 }}>
            <AccountCircleIcon
              sx={{ fontSize: 50 }}
              color="primary"
            ></AccountCircleIcon>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 mb-5 mr-1">
                <InputField
                  type="text"
                  variant="standard"
                  label="Username"
                  defaultValue="Gethmi02"
                  width="70%"
                />
              </div>
              <div className="flex-1 mb-5">
                <InputField
                  type="text"
                  variant="standard"
                  label="First Name"
                  defaultValue="Gethmi"
                  width="70%"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 mb-5 mr-1">
                <InputField
                  type="text"
                  variant="standard"
                  label="Last Name"
                  defaultValue="Rathnayaka"
                  width="70%"
                />
              </div>
              <div className="flex-1 mb-5">
                <InputField
                  type="text"
                  variant="standard"
                  label="Email Address"
                  defaultValue="gethmi@gmail.com"
                  width="70%"
                />
              </div>
            </div>
            <div>
              <div className="flex-1 mb-5 mr-1">
                <InputField
                  type="text"
                  variant="standard"
                  label="Address"
                  defaultValue="Value"
                  width="87%"
                  rows={3}
                />
              </div>
            </div>
            <div>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <h2 className="text-2xl font-semibold text-gray-600">
                  Two Factor Authentication(2FA)
                </h2>
                <p className="text-gray-600 mt-2">
                  Status: {isEnabled ? "Enabled" : "Disabled"}
                </p>
                <OutlinedButton
                  name={isEnabled ? "Disable" : "Enable"}
                  onClick={handleToggle}
                ></OutlinedButton>
              </Paper>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
