import React from "react";
import { Box } from "@mui/system";
import SideNav from "../SideNav";
import { Typography } from "@mui/material";

export default function UserProfile() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          <h1>Profile</h1>
        </Box>
      </Box>
    </div>
  );
}
