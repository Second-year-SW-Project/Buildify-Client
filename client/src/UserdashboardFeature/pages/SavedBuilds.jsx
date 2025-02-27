import React from "react";
import { Box } from "@mui/system";
import SideNav from "../SideNav";

export default function SavedBuilds() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNav />

        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          <h1>Saved Builds</h1>
        </Box>
      </Box>
    </div>
  );
}
