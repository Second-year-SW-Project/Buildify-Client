import React from "react";
import { Box } from "@mui/system";
import SideNav from "../SideNav";

export default function RMAsupport() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          <h1>RMA Support</h1>
        </Box>
      </Box>
    </div>
  );
}
