import React, { useState } from "react";
import SideNav from "../SideNav";
import Navbar from "../../MoleculesComponents/User_component/Navbar";
import { Box } from "@mui/material";
import { Divider, Paper, Typography, Button } from "@mui/material";
import { InputField } from "../../AtomicComponents/Inputs/Input";
import { OutlinedButton } from "../../AtomicComponents/Buttons/Buttons";

export default function RMAsupport() {
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
                  <h1 className="text-3xl font-bold mt-5 mb-6">
                    Support + Returns
                  </h1>
                  <Divider />
                  <Box sx={{ pt: 3 }}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <InputField
                        type="text"
                        variant="outlined"
                        label="Subject"
                        width="70%"
                        outlinedActive
                      />

                      <InputField
                        type="text"
                        variant="outlined"
                        label="Order id"
                        width="70%"
                        outlinedActive
                      />
                    </div>
                    <div className="mb-6">
                      <InputField
                        type="select"
                        label="Reason for Contact"
                        width="86%"
                        options={[
                          {
                            value: "defective",
                            label: "Defective or Damaged Parts",
                          },
                          {
                            value: "incorrectorder",
                            label: "Incorrect Order",
                          },
                          {
                            value: "incompatible",
                            label: "Compatibility Issues",
                          },
                          { value: "changedmind", label: "Changed My Mind" },
                          {
                            value: "lowperformance",
                            label: "Performance Below Expectations",
                          },
                          {
                            value: "incorrectspecifications",
                            label: "Incorrect Specifications",
                          },
                        ]}
                      ></InputField>
                    </div>

                    <div className="mb-6">
                      <InputField
                        type="text"
                        variant="outlined"
                        label="Message"
                        width="86%"
                        rows={3}
                        outlinedActive
                      />
                    </div>

                    <div className="flex gap-4 mb-6">
                      <OutlinedButton
                        name="Submit"
                        color="primary"
                        buttonSize="long"
                      />

                      <OutlinedButton
                        name="Cancel"
                        color="black700"
                        buttonSize="long"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mt-5 mb-6">
                        Active RMA Requests
                      </h3>
                      <Divider />
                      <Box sx={{ pt: 3 }}>
                        <Paper className="mt-6 p-4 shadow-md rounded-lg flex justify-between items-center">
                          <div>
                            <Typography variant="h6" className="font-bold">
                              Subject
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-gray-600"
                            >
                              Lorem Lorem ipsum dolor sit amet. Aut molestiae
                              temporibus sit soluta suscipit...
                            </Typography>
                          </div>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="body2"
                              className="text-gray-500"
                            >
                              Date created: Nov 12, 2024
                            </Typography>
                            <Button variant="contained" className="bg-gray-400">
                              Open in Chat
                            </Button>
                            <Button
                              variant="contained"
                              className="bg-purple-500"
                            >
                              Awaiting User
                            </Button>
                          </div>
                        </Paper>
                      </Box>
                    </div>
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
