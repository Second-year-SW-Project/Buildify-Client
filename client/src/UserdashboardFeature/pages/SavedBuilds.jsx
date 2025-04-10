import React, { useState } from "react";
import SideNav from "../SideNav";
import Navbar from "../../MoleculesComponents/User_component/Navbar";
import CustomBuildsContent from "./CustomBuildsContent";
import PublishedBuildsContent from "../PublishedBuildsContent";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SavedBuilds() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleChange} aria-label="Build tabs">
                        <Tab
                          icon={<BuildIcon />}
                          label="Custom Builds"
                          iconPosition="start"
                          value="1"
                        />
                        <Tab
                          icon={<CheckCircleIcon />}
                          iconPosition="start"
                          label="Published Builds"
                          value="2"
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <CustomBuildsContent />
                    </TabPanel>
                    <TabPanel value="2">
                      <PublishedBuildsContent />
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
