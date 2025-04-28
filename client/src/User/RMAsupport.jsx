import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import { Box, Divider, Paper, Typography, Button } from "@mui/material";
import { InputField } from "../AtomicComponents/Inputs/Input";

export default function RMAsupport() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    subject: "",
    orderId: "",
    reason: "",
    message: "",
    userId: "",
  });

  const [rmaRequests, setRmaRequests] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdFromQuery = params.get("orderId");

    if (orderIdFromQuery) {
      setFormData((prev) => ({ ...prev, orderId: orderIdFromQuery }));
    }
  }, [location.search]);

  // Get userId on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setFormData((prev) => ({ ...prev, userId: storedUserId }));
    fetchRMARequests(storedUserId);
  }, []);

  // Handle input changes
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit RMA request
  const handleSubmit = async () => {
    const { subject, orderId, reason, message, userId } = formData;

    if (!subject || !orderId || !reason || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/rma", formData);
      alert("RMA request submitted successfully!");
      setFormData({
        subject: "",
        orderId: "",
        reason: "",
        message: "",
        userId,
      });
      fetchRMARequests(userId);
    } catch (error) {
      console.error("Error submitting RMA:", error);
      alert("Failed to submit RMA request.");
    }
  };

  // Fetch RMA requests
  const fetchRMARequests = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/rma/user/${userId}`
      );
      setRmaRequests(response.data);
    } catch (error) {
      console.error("Error fetching RMAs:", error);
    }
  };

  return (
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
                      label="Subject*"
                      width="70%"
                      outlinedActive
                      name="subject"
                      value={formData.subject}
                      onChange={(value) => handleChange("subject", value)}
                    />

                    <InputField
                      type="text"
                      variant="outlined"
                      label="Order ID*"
                      width="70%"
                      outlinedActive
                      name="orderId"
                      value={formData.orderId}
                      onChange={(value) => handleChange("orderId", value)}
                    />
                  </div>

                  <div className="mb-6">
                    <InputField
                      type="select"
                      label="Reason for Contact*"
                      width="86%"
                      name="reason"
                      value={formData.reason}
                      onChange={(value) => handleChange("reason", value)}
                      options={[
                        {
                          value: "defective",
                          label: "Defective or Damaged Parts",
                        },
                        { value: "incorrectorder", label: "Incorrect Order" },
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
                        { value: "support", label: "Support Request" },
                        { value: "other", label: "Other" },
                      ]}
                    />
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
                      onChange={(value) => handleChange("message", value)}
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
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="large"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          subject: "",
                          orderId: "",
                          reason: "",
                          message: "",
                        }));
                      }}
                    >
                      Cancel
                    </Button>
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
                            className="mt-6 p-6 rounded-2xl flex flex-col gap-1 w-4/5 mx-auto bg-white"
                            elevation={3}
                          >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                              <p className="font-semibold text-gray-900 text-2xl">
                                {rma.subject}
                              </p>

                              <div className="text-right">
                                <p className="text-gray-500"> Date created :</p>

                                <p className="text-gray-700">
                                  {new Date(rma.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Message */}
                            <div className="mb-2">
                              <p className="text-gray-700">
                                <span className="font-medium">Message: </span>
                                {rma.message}
                              </p>
                            </div>

                            {/* Admin Response */}
                            <div className="mb-4">
                              <p className="text-gray-700">
                                <span className="font-medium">
                                  Admin response:{" "}
                                </span>
                                {rma.response || (
                                  <span className="italic text-gray-400">
                                    Awaiting response...
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#e5e5e5",
                                  color: "#000",
                                  boxShadow: "none",
                                  textTransform: "none",
                                }}
                              >
                                Respond
                              </Button>
                              <Button
                                variant="contained"
                                style={{
                                  textTransform: "none",
                                  boxShadow: "none",
                                }}
                              >
                                {rma.status === "pending"
                                  ? "Awaiting User"
                                  : rma.status}
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
  );
}
