import React from "react";
import { Box } from "@mui/system";
import SideNav from "../SideNav";
import { Typography } from "@mui/material";

export default function OrderHistory() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />

        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          {/* <Toolbar /> */}
          <h1>Order History</h1>
        </Box>
      </Box>
    </div>
  );
}
