import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";

const BuildStepper = ({
  activeStep,
  setActiveStep,
  buildId,
  onStatusChange,
  buildStatus,
  editable = true,
}) => {
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [stepTimestamps, setStepTimestamps] = useState({});

  const steps = [
    {
      label: "Build Placed",
      description:
        "Your build order has been successfully placed and is being reviewed.",
      status: "Pending",
    },
    {
      label: "Build Confirmed",
      description: "Your build has been confirmed and components are being ordered.",
      status: "Confirmed",
    },
    {
      label: "Building in Progress",
      description: "Your PC is currently being assembled by our technicians.",
      status: "Building",
    },
    {
      label: "Build Completed",
      description: "Your PC build has been completed and tested.",
      status: "Completed",
    },
    {
      label: "Shipped",
      description: "Your completed build has been shipped and is on its way.",
      status: "Shipped",
    },
    {
      label: "Delivered",
      description: "",
      status: "Delivered",
    },
  ];

  // Fetch build timestamps when component mounts or activeStep changes
  useEffect(() => {
    const fetchBuildTimestamps = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/build-transactions/${buildId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
          const buildData = response.data.data;

          // Initialize timestamps with all steps - only set Pending timestamp from createdAt
          const initialTimestamps = {
            Pending: new Date(buildData.createdAt), // Only Pending gets initial timestamp
            ...(buildData.stepTimestamps || {}),
          };

          // Check and set null for timestamps before 2000
          Object.keys(initialTimestamps).forEach((key) => {
            if (initialTimestamps[key]) {
              const timestamp = new Date(initialTimestamps[key]);
              if (timestamp.getFullYear() < 2000) {
                initialTimestamps[key] = null;
              }
            }
          });

          // Ensure all step timestamps are properly set
          steps.forEach((step) => {
            if (!initialTimestamps[step.status]) {
              initialTimestamps[step.status] = null;
            }
          });

          setStepTimestamps(initialTimestamps);

          // Only save the Pending timestamp if it's missing in database
          // Don't auto-save timestamps for other steps
          const missingTimestamps = {};
          if (!buildData.stepTimestamps?.Pending && initialTimestamps.Pending) {
            missingTimestamps.Pending = initialTimestamps.Pending;
          }

          if (Object.keys(missingTimestamps).length > 0) {
            await axios.patch(
              `${backendUrl}/api/build-transactions/${buildId}/status`,
              {
                stepTimestamp: missingTimestamps,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          }
        }
      } catch (error) {
        console.error("Error fetching build timestamps:", error);
      }
    };

    if (buildId) {
      fetchBuildTimestamps();
    }
  }, [buildId, activeStep, backendUrl]);

  // Update activeStep based on buildStatus
  useEffect(() => {
    // Map status to correct step index
    const statusToStepMap = {
      "Pending": 1,     // Show Build Confirmed as active (step 0 completed)
      "Confirmed": 2,   // Show Building in Progress as active (steps 0,1 completed)
      "Building": 3,    // Show Build Completed as active (steps 0,1,2 completed)
      "Completed": 4,   // Show Shipped as active (steps 0,1,2,3 completed)
      "Shipped": 5,     // Show Delivered as active (steps 0,1,2,3,4 completed)
      "Delivered": 6,   // All steps completed
      "Canceled": 1     // Default to Build Confirmed step
    };

    const adjustedStepIndex = statusToStepMap[buildStatus] || 1;

    if (adjustedStepIndex !== activeStep) {
      setActiveStep(adjustedStepIndex);
    }
  }, [buildStatus, setActiveStep, activeStep]);

  const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleNext = async () => {
    try {
      setLoading(true);

      // Define the correct status progression order
      const statusProgression = ["Pending", "Confirmed", "Building", "Completed", "Shipped", "Delivered"];
      const currentStatusIndex = statusProgression.indexOf(buildStatus);

      if (currentStatusIndex < statusProgression.length - 1) {
        const nextStatus = statusProgression[currentStatusIndex + 1];
        const currentTime = new Date();

        // Update both status and timestamp - save timestamp for the current status being completed
        const response = await axios.patch(
          `${backendUrl}/api/build-transactions/${buildId}/status`,
          {
            buildStatus: nextStatus,
            stepTimestamp: {
              [buildStatus]: currentTime, // Save timestamp for current status being completed
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          // Update local timestamps
          setStepTimestamps((prev) => ({
            ...prev,
            [buildStatus]: currentTime,
          }));

          // Call onStatusChange with next status
          onStatusChange(nextStatus);
        }
      }
    } catch (error) {
      console.error("Error updating build step:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    try {
      setLoading(true);

      // Define the correct status progression order
      const statusProgression = ["Pending", "Confirmed", "Building", "Completed", "Shipped", "Delivered"];
      const currentStatusIndex = statusProgression.indexOf(buildStatus);

      // Don't allow going back from Pending (first status)
      if (currentStatusIndex > 0) {
        const prevStatus = statusProgression[currentStatusIndex - 1];
        const currentTime = new Date();

        // Update both status and timestamp
        const response = await axios.patch(
          `${backendUrl}/api/build-transactions/${buildId}/status`,
          {
            buildStatus: prevStatus,
            stepTimestamp: {
              [prevStatus]: currentTime,
              // Clear the timestamp of the current status
              [buildStatus]: null,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          // Update local state
          setStepTimestamps((prev) => ({
            ...prev,
            [prevStatus]: currentTime,
            [buildStatus]: null,
          }));

          // Call onStatusChange with previous status
          onStatusChange(prevStatus);
        }
      }
    } catch (error) {
      console.error("Error updating build step:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = async (stepIndex) => {
    // Prevent clicking on step 0 (Build Placed) and when canceled
    if (!editable || buildStatus === "Canceled" || stepIndex === 0) return;

    try {
      setLoading(true);
      const newStatus = steps[stepIndex].status;
      const currentTime = new Date();

      // Update both status and timestamp - save timestamp for the step being clicked
      const response = await axios.patch(
        `${backendUrl}/api/build-transactions/${buildId}/status`,
        {
          buildStatus: newStatus,
          stepTimestamp: {
            [newStatus]: currentTime, // Save timestamp for the step being activated
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setStepTimestamps((prev) => ({
          ...prev,
          [newStatus]: currentTime,
        }));
        setActiveStep(stepIndex);
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error("Error updating build status:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          // Determine if step is completed based on activeStep
          const isCompleted = index < activeStep;

          return (
            <Step key={step.label} completed={isCompleted} disabled={buildStatus === "Canceled"}>            <StepLabel
              onClick={() => editable && handleStepClick(index)}
              sx={{
                cursor: editable && index !== 0 ? "pointer" : "default",
                "& .MuiStepLabel-label": {
                  fontSize: "1rem",
                  fontWeight: index === activeStep ? "bold" : "normal",
                },
              }} optional={
                <Typography variant="caption" color="textSecondary">
                  {stepTimestamps[step.status] && index !== activeStep
                    ? formatDateTime(stepTimestamps[step.status])
                    : ""}
                </Typography>
              }
            >
              {step.label}
            </StepLabel>
              <StepContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                {editable && (
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={
                        loading || activeStep === steps.length - 1 || buildStatus === "Canceled"
                      }
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>

                    {buildStatus !== "Pending" && buildStatus !== "Delivered" && (
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={loading || buildStatus === "Canceled"}
                      >
                        Back
                      </Button>
                    )}
                  </Box>
                )}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - Build process finished!</Typography>
        </Paper>
      )} */}
    </Box>
  );
};

export default BuildStepper;
