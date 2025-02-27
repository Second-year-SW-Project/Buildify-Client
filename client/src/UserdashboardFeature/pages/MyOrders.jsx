import React from "react";
import { Box } from "@mui/system";
import SideNav from "../SideNav";

export default function MyOrders() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />

        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          <h1>My Orders</h1>
        </Box>
      </Box>
    </div>
  );
}
