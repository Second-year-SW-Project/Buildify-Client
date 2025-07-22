import React, { useState, useEffect } from "react";
import { InputField } from "../AtomicComponents/Inputs/Input";
import {
  PageSubtitle,
  PageTitle,
} from "../AtomicComponents/Typographics/TextStyles";
import theme from "../AtomicComponents/theme";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Chip, Box, Stack, Typography, Avatar } from "@mui/material";
import OrderItemCard from "../AtomicComponents/Cards/OrderItemCard";
import FullScreenLoader from "../AtomicComponents/FullScreenLoader";
import OrderStepper from "../MoleculesComponents/Admin_components/Stepper";
import { PrimaryButton } from "../AtomicComponents/Buttons/Buttons";
import { useNavigation } from "../MoleculesComponents/Admin_components/NavigationContext";

function ViewOrder() {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { selectedTab } = useNavigation();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const StatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Refunded", label: "Refunded" },
    { value: "Canceled", label: "Canceled" }
  ];

  const statusColorMap = {
    Completed: "delete",
    Pending: "warning",
    Refunded: "ternary",
    Canceled: "error",
    Shipped: "info",
    Delivered: "primaryprimary",
    Successful: "success",
  };

  const getStepFromStatus = (status, stepTimestamps = null) => {
    // For canceled orders, determine the step based on the last completed step timestamp
    if (status === "Canceled" && stepTimestamps) {
      // Check timestamps to determine which step was active when canceled
      const steps = ["Pending", "Completed", "Shipped", "Delivered", "Successful"];
      let lastCompletedStep = 0; // Default to step 0 if no timestamps found

      for (let i = steps.length - 1; i >= 0; i--) {
        if (stepTimestamps[steps[i]]) {
          lastCompletedStep = i + 1; // +1 because activeStep is 1-indexed
          break;
        }
      }
      return lastCompletedStep;
    }

    switch (status) {
      case "Pending":
        return 1;
      case "Completed":
        return 2;
      case "Shipped":
        return 3;
      case "Delivered":
        return 4;
      case "Successful":
        return 5;
      case "Refunded":
        return 4;
      case "Canceled":
        return 2; // fallback if no stepTimestamps provided
      default:
        return 1;
    }
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        toast.error("No order ID provided");
        navigate("/adminpanel/orders/orderlist");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching order:", id);
        const response = await axios.get(
          `${backendUrl}/api/checkout/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          setOrder(response.data);
          // Set active step based on order status, passing stepTimestamps for canceled orders
          setActiveStep(getStepFromStatus(response.data.status, response.data.stepTimestamps));
        } else {
          toast.error("Failed to load Order");
          navigate("/adminpanel/orders/orderlist");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order data");
        navigate("/adminpanel/orders/orderlist");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, backendUrl, navigate]);

  // Handle status change from stepper
  const handleStepperStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setOrder((prev) => ({ ...prev, status: newStatus }));
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const currentTime = new Date();

      // Determine the step based on status
      let newStep;
      let currentStep = getStepFromStatus(order.status, order.stepTimestamps);

      switch (newStatus) {
        case "Pending":
          newStep = 1;
          break;
        case "Completed":
          newStep = 2;
          break;
        case "Shipped":
          newStep = 3;
          break;
        case "Delivered":
          newStep = 4;
          break;
        case "Successful":
          newStep = 5;
          break;
        case "Canceled":
          // Preserve the current step when canceling - don't change the step
          newStep = currentStep;
          break;
        case "Refunded":
          newStep = 4;
          break;
        default:
          newStep = 1;
      }      // Prepare timestamp updates
      const stepTimestamp = {
        [newStatus]: currentTime,
      };

      // Special handling for Canceled status - don't modify existing step timestamps
      if (newStatus === "Canceled") {
        // Only add the Canceled timestamp, don't modify other timestamps
        delete stepTimestamp[order.status]; // Don't clear the current status timestamp
      } else {
        // If going back to a previous status, set the current status timestamp to null
        if (newStep < currentStep) {
          stepTimestamp[order.status] = null;
        }
      }

      // Update both status and timestamp
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${id}`,
        {
          status: newStatus,
          stepTimestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setOrder((prev) => ({ ...prev, status: newStatus }));
        setActiveStep(newStep);
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  // Update the cancel button handler
  const handleCancel = () => {
    navigate("/adminpanel/orders/orderlist");
  };

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="pl-6 grid grid-rows">
      <FullScreenLoader open={loading} message={"Loading Data..."} />
      <div className="mt-3">
        <div className="flex items-center gap-2 ">
          <PageTitle
            value={`Order #${order._id?.slice(-4).toUpperCase() || "----"}`}
          />
          <Chip
            label={order.status}
            color={statusColorMap[order.status] || "default"}
            size="small"
            sx={{
              padding: "5px",
              height: "30px",
            }}
          />
        </div>
        <PageSubtitle
          value={
            new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) +
            " " +
            new Date(order.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          }
          color={theme.palette.primary300.main}
        />
      </div>
      <div className="pb-4 mr-2">
        <div className="float-right mr-2">
          <InputField
            type="select"
            options={StatusOptions}
            value={order.status}
            onChange={(value) => handleStatusChange(value)}
            width="100%"
          />
        </div>
      </div>

      {/* Order Details */}
      <div className="mb-10 gap-4 w-full pr-4 flex items-start">
        <div className="w-2/3">
          <div className="orderDetails border-2 border-violet-600 rounded-lg p-4 mb-4">
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                Order Details
              </Typography>
              {order.items?.map((item, i) => (
                <Stack
                  key={item._id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius={1}
                  border={1}
                  borderColor={theme.palette.black100.main}
                  width="100%"
                  mb={1}
                  p={1}
                  pr={0}
                >
                  <Box flex={3} display="flex" alignItems="center">
                    <OrderItemCard
                      name={item.name}
                      type={item.type?.toUpperCase()}
                      src={item.product_image}
                    />
                  </Box>
                  <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    textAlign="right"
                  >
                    <Typography>x {item.quantity}</Typography>
                  </Box>
                  <Box
                    flex={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    textAlign="right"
                    marginRight={2}
                  >
                    <Typography variant="body1" fontWeight="bold" flex={1}>
                      {item.price * item.quantity} LKR
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "right",
                  mr: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {/* Label column */}
                <Box sx={{ textAlign: "right", mr: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    Subtotal:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    Delivery:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    Net Total:
                  </Typography>
                </Box>

                {/* Value column */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {order.total?.toLocaleString() || 0} LKR
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="warning"
                    sx={{ mb: 1 }}
                  >
                    + {order.shipping?.toLocaleString() || 0} LKR
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {(
                      (order.total || 0) + (order.shipping || 0)
                    ).toLocaleString()}{" "}
                    LKR
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
          <div className="orderTracking border-2 border-violet-600 rounded-lg p-4 mt-4 bg-purple-100">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Order Tracking
            </Typography>
            <OrderStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              orderId={order._id}
              onStatusChange={handleStepperStatusChange}
              orderStatus={order.status}
              editable={true}
            />
            {order.status === "Refunded" && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  color="ternary"
                  sx={{ fontWeight: "bold" }}
                >
                  Order Refunded
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.stepTimestamps?.Refunded ? (
                    <>
                      This order has been refunded on{" "}
                      {new Date(
                        order.stepTimestamps.Refunded
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(
                        order.stepTimestamps.Refunded
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    "This order has been refunded"
                  )}
                </Typography>
              </Box>
            )}
            {order.status === "Canceled" && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                >
                  Order Canceled
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.stepTimestamps?.Canceled ? (
                    <>
                      This order has been Canceled on{" "}
                      {new Date(
                        order.stepTimestamps.Canceled
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(
                        order.stepTimestamps.Canceled
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    "This order has been Canceled"
                  )}
                </Typography>
              </Box>
            )}
            {order.status === "Delivered" && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  color="success"
                  sx={{ fontWeight: "bold" }}
                >
                  Order Delivered Successfully
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.stepTimestamps?.Delivered ? (
                    <>
                      This order has been Delivered on{" "}
                      {new Date(
                        order.stepTimestamps.Delivered
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(
                        order.stepTimestamps.Delivered
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    "This order has been Delivered"
                  )}
                </Typography>
              </Box>
            )}
          </div>
        </div>
        <div className="w-1/3">
          <div className="userDetails border-2 border-violet-600 rounded-lg p-4">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Customer
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar
                  src={order.profilePicture || "../../client/public/logo.png"}
                  alt={order.user_name}
                  sx={{ width: 50, height: 50, flexShrink: 0 }}
                />
                <Box
                  sx={{
                    flex: 1,
                    wordBreak: "break-word",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ wordBreak: "break-word", fontWeight: "bold" }}
                  >
                    {order.user_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {order.email}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
              Shipping
            </Typography>
            <Box
              sx={{
                mt: 2,
                textAlign: "left",
                mr: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {/* Address Row */}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="gray"
                  sx={{ minWidth: "80px" }}
                >
                  Address
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                >
                  :{order.address || "null"}
                </Typography>
              </Box>

              {/* Contact Row */}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="gray"
                  sx={{ minWidth: "80px" }}
                >
                  Contact
                </Typography>
                <Typography variant="body1">
                  :{order.number || "null"}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
              Payment
            </Typography>
          </div>
        </div>
      </div>
      <div className="pb-6 pr-4">
        <div className="float-right flex flex-row gap-x-2">
          <PrimaryButton
            fontSize="16px"
            name="Save Order"
            buttonSize="medium"
            isBold={1}
            color="primary"
            padding="40px"
            type="button"
            onClick={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
