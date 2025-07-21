import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../SideNav";
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";
import { Box, Divider, Paper, Typography, Button } from "@mui/material";
import { InputField } from "../../AtomicComponents/Inputs/Input";
import { OutlinedButton } from "../../AtomicComponents/Buttons/Buttons";

export default function RMAsupport() {
  const [formData, setFormData] = useState({
    subject: "",
    orderId: "",
    reason: "",
    message: "",
    userId: "67bb2ef04c2464b97ea7f9b4", // Replace with logged-in user ID
  });

  const [rmaRequests, setRmaRequests] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit RMA request
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://buildify-server-d5yu.vercel.app/api/rma",
        formData
      );
      alert("RMA request submitted successfully!");
      fetchRMARequests(); // Refresh RMA requests after submission
    } catch (error) {
      console.error("Error submitting RMA:", error);
      alert("Failed to submit RMA request.");
    }
  };

  // Fetch RMA requests for the user
  const fetchRMARequests = async () => {
    try {
      const response = await axios.get(
        `https://buildify-server-d5yu.vercel.app/api/rma/user/${formData.userId}`
      );
      setRmaRequests(response.data);
    } catch (error) {
      console.error("Error fetching RMAs:", error);
    }
  };

  // Fetch RMA requests on component mount
  useEffect(() => {
    fetchRMARequests();
  }, []);

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
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />

                      <InputField
                        type="text"
                        variant="outlined"
                        label="Order id"
                        width="70%"
                        outlinedActive
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <InputField
                        type="select"
                        label="Reason for Contact"
                        width="86%"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
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
                          {
                            value: "support",
                            label: "Support Request",
                          },
                          {
                            value: "other",
                            label: "Other",
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
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex gap-4 mb-6">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Button variant="outlined" color="inherit" size="large">
                        Cancel
                      </Button>
                      {/* <OutlinedButton
                        name="Submit"
                        color="primary"
                        buttonSize="long"
                      />

                      <OutlinedButton
                        name="Cancel"
                        color="black700"
                        buttonSize="long"
                      /> */}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mt-5 mb-6">
                        Active RMA Requests
                      </h3>
                      <Divider />
                      <Box sx={{ pt: 3 }}>
                        {rmaRequests.length === 0 ? (
                          <Typography variant="body1" className="text-gray-500">
                            No active RMA requests.
                          </Typography>
                        ) : (
                          rmaRequests.map((rma) => (
                            <Paper
                              key={rma._id}
                              className="mt-6 p-4 shadow-md rounded-lg flex justify-between items-center"
                            >
                              <div>
                                <Typography variant="h6" className="font-bold">
                                  {rma.subject}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="text-gray-600"
                                >
                                  {rma.message}
                                </Typography>
                              </div>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="body2"
                                  className="text-gray-500"
                                >
                                  Date:{" "}
                                  {new Date(rma.createdAt).toLocaleDateString()}
                                </Typography>
                                <Button
                                  variant="contained"
                                  className="bg-gray-400"
                                >
                                  Open
                                </Button>
                                <Button
                                  variant="contained"
                                  className="bg-purple-500"
                                >
                                  {rma.status}
                                </Button>
                              </div>
                            </Paper>
                          ))
                        )}
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
