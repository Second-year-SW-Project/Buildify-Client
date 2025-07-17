import React from "react";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import CustomBuildsContent from "./CustomBuildsContent";
import { Box, Divider } from "@mui/material";

export default function SavedBuilds() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="flex flex-1">
          <SideNav />

          <main className="flex-1 mt-36 p-6 pl-64">
            <Box>
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <Box
                  component={"main"}
                  sx={{
                    p: 3,
                    pl: 7,
                    width: "90%",
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <h1 className="text-3xl font-bold mt-5 mb-6">Your Builds</h1>
                  <Divider />
                  <Box sx={{ pt: 3 }}>
                    <CustomBuildsContent />
                  </Box>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
