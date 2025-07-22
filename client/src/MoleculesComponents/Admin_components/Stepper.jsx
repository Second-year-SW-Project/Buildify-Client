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

const OrderStepper = ({
  activeStep,
  setActiveStep,
  orderId,
  onStatusChange,
  orderStatus,
  editable = true,
}) => {
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [stepTimestamps, setStepTimestamps] = useState({});

  const steps = [
    {
      label: "Order Placed",
      description: "",
      status: "Pending",
    },
    {
      label: "Processing",
      description:
        "Your order has been successfully placed and is being processed.",
      status: "Completed",
    },
    {
      label: "Shipped",
      description: "Your Order is being processed and prepared for shipment.",
      status: "Shipped",
    },
    {
      label: "Delivered",
      description: "Your Order has been shipped and is on its way.",
      status: "Delivered",
    },
    {
      label: "Successful",
      description: "Your Order has been delivered and you can add a review.",
      status: "Successful",
    },
  ];

  // Fetch order timestamps when component mounts or activeStep changes
  useEffect(() => {
    const fetchOrderTimestamps = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/checkout/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
          const orderData = response.data;

          // Initialize timestamps with all steps
          const initialTimestamps = {
            Pending: new Date(orderData.createdAt),
            ...(orderData.stepTimestamps || {}),
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

          // Don't set missing timestamps to null - leave them undefined
          // This way, only actual timestamps from the database will be displayed

          setStepTimestamps(initialTimestamps);

          // Only save the Pending timestamp if it's missing (don't save null timestamps for other steps)
          if (!orderData.stepTimestamps?.Pending) {
            const pendingTimestamp = { Pending: new Date(orderData.createdAt) };
            await axios.patch(
              `${backendUrl}/api/checkout/product-orders/${orderId}`,
              {
                stepTimestamp: pendingTimestamp,
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
        console.error("Error fetching order timestamps:", error);
      }
    };
    fetchOrderTimestamps();
  }, [orderId, backendUrl, activeStep, orderStatus]);

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
      const nextStep = activeStep + 1;
      const currentStep = steps[nextStep - 1];
      const nextStepStatus = steps[nextStep - 1].status;
      const currentTime = new Date();

      // Update both status and timestamp
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${orderId}`,
        {
          status: nextStepStatus,
          ...(activeStep !== 0 && {
            stepTimestamp: {
              [currentStep.status]: currentTime,
            },
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        // Only update timestamps if not on the first step
        if (activeStep !== 0) {
          setStepTimestamps((prev) => ({
            ...prev,
            [currentStep.status]: currentTime,
          }));
        }
        setActiveStep(nextStep);
        // Call onStatusChange with next step's status
        onStatusChange(nextStepStatus);
      }
    } catch (error) {
      console.error("Error updating order step:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    try {
      setLoading(true);

      // Define the correct status progression order (same as BuildStepper)
      const statusProgression = [
        "Pending",
        "Completed",
        "Shipped",
        "Delivered",
        "Successful",
      ];

      const currentStatusIndex = statusProgression.indexOf(orderStatus);

      // Don't allow going back from Pending (first status)
      if (currentStatusIndex > 0) {
        const prevStatus = statusProgression[currentStatusIndex - 1];
        const currentTime = new Date();

        // Update both status and timestamp
        const response = await axios.patch(
          `${backendUrl}/api/checkout/product-orders/${orderId}`,
          {
            status: prevStatus, // Use previous status from progression
            stepTimestamp: {
              [prevStatus]: currentTime,
              // Clear the timestamp of the current status
              [orderStatus]: null,
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
            [orderStatus]: null,
          }));

          // Update active step based on new status
          const newStepIndex = statusProgression.indexOf(prevStatus) + 1;
          setActiveStep(newStepIndex);

          // Call onStatusChange with previous status
          onStatusChange(prevStatus);
        }
      }
    } catch (error) {
      console.error("Error updating order step:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const currentTime = new Date();
      const firstStep = steps[0];

      // Reset to first step and update both status and timestamp
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${orderId}`,
        {
          status: firstStep.status,
          stepTimestamp: {
            [firstStep.status]: currentTime,
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
          [firstStep.status]: currentTime,
        }));
        setActiveStep(0);
        // Call onStatusChange with first step's status
        onStatusChange(firstStep.status);
      }
    } catch (error) {
      console.error("Error resetting order step:", error);
      toast.error("Failed to reset order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={orderStatus === "Canceled" || orderStatus === "Refunded" ? -1 : activeStep} orientation="vertical">
        {steps.map((step, index) => {
          // For canceled/refunded orders, determine completion based on timestamps instead of activeStep
          let isCompleted = false;
          if (orderStatus === "Canceled" || orderStatus === "Refunded") {
            // Step is completed only if it has a timestamp and it's before the active canceled/refunded step
            isCompleted = !!stepTimestamps[step.status] && (index < activeStep);
          } else {
            // Normal behavior: steps before activeStep are completed
            isCompleted = index < activeStep;
          }

          return (
            <Step 
              key={step.label} 
              disabled={orderStatus === "Canceled" || orderStatus === "Refunded"}
              completed={isCompleted}
            >
            <StepLabel
              optional={
                <Typography variant="caption" color="textSecondary">
                  {stepTimestamps[step.status]
                    ? formatDateTime(stepTimestamps[step.status])
                    : ""}
                </Typography>
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>

              {editable && (
                <Box sx={{ mb: 2 }}>
                  {orderStatus !== "Delivered" && orderStatus !== "Successful" && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={
                        loading ||
                        orderStatus === "Canceled" ||
                        orderStatus === "Refunded"
                      }
                    >
                      {orderStatus == "Shipped" ? "Make as Delivered" : "Continue"}
                    </Button>
                  )}

                  {index > 1 &&
                    orderStatus !== "Delivered" &&
                    orderStatus !== "Successful" && (
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={loading || orderStatus === "Canceled" || orderStatus === "Refunded"}
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
      {/* {activeStep === steps.length && orderStatus !== 'Refunded' && (
                <Paper round elevation={0} sx={{ p: 3 }}>
                    <Button onClick={handleReset} disabled={orderStatus === 'Canceled'}>
                        Reset
                    </Button>
                </Paper>
            )} */}
    </Box>
  );
};

export default OrderStepper;
