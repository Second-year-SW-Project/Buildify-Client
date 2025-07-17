import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import OrderStepper from "../MoleculesComponents/Admin_components/Stepper";
import BuildStepper from "../MoleculesComponents/Admin_components/BuildStepper";
import { Box, Button, Divider, Typography } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function OrderDetails() {
  const { orderId } = useParams();
  const location = useLocation();
  const orderType = location.state?.type || "product";

  const [order, setOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [build, setBuild] = useState(null);
  const [buildactiveStep, setBuildActiveStep] = useState(0);
  const navigate = useNavigate();

  const getStepFromStatus = (status) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Successful":
        return 2;
      case "Shipped":
        return 3;
      case "Delivered":
        return 4;
      case "Refunded":
        return 4;
      case "Canceled":
        return 2;
      default:
        return 1;
    }
  };
  const getBuildStepFromStatus = (status) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Confirmed":
        return 2;
      case "Building":
        return 3;
      case "Completed":
        return 4;
      case "Shipped":
        return 5;
      case "Delivered":
        return 6;
      case "Canceled":
        return 1;
      default:
        return 1;
    }
  };

  const mapItems = (items, type) =>
    items.map((item) =>
      type === "product"
        ? {
            name: item.name || "Product",
            product_image: item.product_image || item.imageUrl || "",
            price: item.price || item.componentPrice || 0,
            quantity: item.quantity,
          }
        : {
            name: item.name || "Component",
            product_image: item.product_image || "",
            price: item.price || 0,
            quantity: item.quantity,
          }
    );

  const fetchOrder = async () => {
    try {
      let res;
      if (orderType === "product") {
        res = await axios.get(`${backendUrl}/api/checkout/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const normalizedProductOrder = {
          ...res.data,
          items: mapItems(res.data.items, "product"),
        };
        setOrder(normalizedProductOrder);
        setActiveStep(getStepFromStatus(normalizedProductOrder.status));
      } else if (orderType === "pc_build") {
        res = await axios.get(
          `${backendUrl}/api/build-transactions/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data.data;
        if (!data) {
          toast.error("Build transaction not found");
          return;
        }
        // Normalize keys to match the UI expectations
        const normalizedOrder = {
          ...data,
          status: data.buildStatus,
          user_name: data.userName,
          phone: data.userPhone || "",
          addressLine: data.userAddress,
          email: data.userEmail,
          items: mapItems(data.components, "pc_build"),
          total: data.totalCharge,
          paymentMethod: data.paymentMethod,
          _id: data._id,
          createdAt: data.createdAt,
        };

        setOrder(normalizedOrder);
        setBuildActiveStep(getBuildStepFromStatus(normalizedOrder.status));
      }
    } catch (err) {
      console.error("Failed to fetch order", err);
      toast.error("Failed to fetch order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId, orderType]);

  // Handle status change from stepper
  const handleStepperStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${orderId}`,
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

  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const currentTime = new Date();

      // Determine the step based on status
      let newStep;
      switch (newStatus) {
        case "Pending":
          newStep = 1;
          break;
        case "Successful":
          newStep = 2;
          break;
        case "Shipped":
          newStep = 3;
          break;
        case "Delivered":
          newStep = 4;
          break;
        case "Canceled":
          newStep = 2;
          break;
        case "Refunded":
          newStep = 4;
          break;
        default:
          newStep = 1;
      }

      // Get current step from current status
      let currentStep;
      switch (order.status) {
        case "Pending":
          currentStep = 1;
          break;
        case "Successful":
          currentStep = 2;
          break;
        case "Shipped":
          currentStep = 3;
          break;
        case "Delivered":
          currentStep = 4;
          break;
        case "Canceled":
          currentStep = 2;
          break;
        default:
          currentStep = 1;
      }

      // Prepare timestamp updates
      const stepTimestamp = {
        [newStatus]: currentTime,
      };

      // If going back to a previous status, set the current status timestamp to null
      if (newStep < currentStep) {
        stepTimestamp[order.status] = null;
      }

      // Update both status and timestamp
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${orderId}`,
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

  const handleBuildStepperStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const currentTime = new Date();

      // Determine the step based on status
      let newStep = getBuildStepFromStatus(newStatus);
      let currentStep = getBuildStepFromStatus(order.status);

      // Prepare timestamp updates
      const stepTimestamp = {
        [newStatus]: currentTime,
      };

      // If going back to a previous status, set the current status timestamp to null
      if (newStep < currentStep) {
        stepTimestamp[order.status] = null;
      }

      const response = await axios.patch(
        `${backendUrl}/api/build-transactions/${orderId}/status`,
        {
          buildStatus: newStatus,
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
        setBuildActiveStep(newStep);
        toast.success("Build status updated successfully");
      }
    } catch (error) {
      console.error("Error updating build status:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  // Handle status change from dropdown
  const handleBuildStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const currentTime = new Date();

      // Determine the step based on status
      let newStep = getBuildStepFromStatus(newStatus);
      let currentStep = getBuildStepFromStatus(order.status);

      // Prepare timestamp updates
      const stepTimestamp = {
        [newStatus]: currentTime,
      };

      // If going back to a previous status, set the current status timestamp to null
      if (newStep < currentStep) {
        stepTimestamp[order.status] = null;
      }

      // Update both status and timestamp
      const response = await axios.patch(
        `${backendUrl}/api/build-transactions/${orderId}/status`,
        {
          buildStatus: newStatus,
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
        setBuildActiveStep(newStep);
        toast.success("Build status updated successfully");
      }
    } catch (error) {
      console.error("Error updating build status:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleRefundClick = () => {
    navigate(`/user/rmaSupport?orderId=${orderId}`);
  };

  if (!order) return <p>Loading...</p>;

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
                  <Typography variant="h5" fontWeight={"bold"} gutterBottom>
                    Order #{order._id?.slice(-4).toUpperCase() || "----"} -{" "}
                    {order.status}
                  </Typography>

                  <div className="mb-3">
                    <Button
                      variant="contained"
                      sx={{
                        mr: 1,
                        borderRadius: 900,
                        textTransform: "none",
                        px: 2,
                      }}
                      onClick={() => {
                        const trackerSection =
                          document.getElementById("order-tracker");
                        if (trackerSection) {
                          trackerSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      Track Order
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 900, textTransform: "none", px: 2 }}
                      onClick={handleRefundClick}
                    >
                      Return/refund
                    </Button>
                  </div>
                  <Divider />

                  {/* User and Order info */}
                  <div className="flex items-stretch justify-between pb-4 pt-4 rounded-md shadow-sm gap-4">
                    <div className="w-1/2 p-4 border bg-white rounded-md shadow-sm">
                      <div className="flex items-center mb-2">
                        <PlaceOutlinedIcon />
                        <span className="text-lg font-medium ml-2">
                          {order.user_name || "N/A"}
                        </span>
                        <span className="ml-2 text-sm text-purple-600">
                          {order.phone || "N/A"}
                        </span>
                      </div>
                      <p className="text-sm">
                        {order.addressLine || "Address not available"}
                      </p>
                      <p className="text-sm mt-1">{order.email}</p>
                    </div>

                    <div className="w-1/2 p-4 border bg-white rounded-md shadow-sm">
                      <div className="flex items-center mb-2">
                        <AssignmentOutlinedIcon />
                        <p className="text-sm mr-3 ml-2">
                          <span className="font-medium">Order ID:</span>{" "}
                          <span className="text-purple-600">{order._id}</span>{" "}
                          <button
                            className="text-purple-500 hover:underline text-xs ml-1"
                            onClick={() => handleCopy(order._id)}
                          >
                            Copy
                          </button>
                        </p>
                      </div>

                      {/* Dates and payment */}
                      <p className="text-sm mt-1">
                        <span className="font-medium">Order placed on:</span>{" "}
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Payment method:</span>{" "}
                        {order.paymentMethod || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-md shadow-sm border mb-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <img
                            src={item.product_image || item.imageUrl || ""}
                            alt="Product"
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-sm mt-1">
                              <span className="font-medium">
                                LKR {item.price || item.componentPrice || 0}
                              </span>{" "}
                              <span className="text-gray-600">
                                x{item.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: 999,
                              textTransform: "none",
                              px: 2,
                            }}
                          >
                            Add to cart
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleRefundClick}
                            sx={{
                              borderRadius: 999,
                              textTransform: "none",
                              px: 2,
                            }}
                          >
                            Return/refund
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Divider sx={{ my: 3 }} />

                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold">LKR {order.total}</p>
                    </div>
                  </div>

                  <Divider sx={{ my: 3 }} />

                  <div className="border-2 border-purple-600 rounded-2xl p-4">
                    <Typography
                      id="order-tracker"
                      variant="h6"
                      sx={{ mb: 2, fontWeight: "bold" }}
                    >
                      Order Tracking
                    </Typography>
                    {orderType === "product" ? (
                      <OrderStepper
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        orderId={orderId}
                        onStatusChange={handleStepperStatusChange}
                        orderStatus={order.status}
                        editable={false}
                      />
                    ) : (
                      <BuildStepper
                        activeStep={buildactiveStep}
                        setActiveStep={setBuildActiveStep}
                        buildId={orderId}
                        onStatusChange={handleBuildStepperStatusChange}
                        buildStatus={order.status}
                        editable={false}
                      />
                    )}

                    {order.status === "Shipped" && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        disabled={loading}
                        onClick={() =>
                          orderType === "product"
                            ? handleStatusChange("Delivered")
                            : handleBuildStatusChange("Delivered")
                        }
                      >
                        {loading ? "Updating..." : "Mark as Delivered"}
                      </Button>
                    )}
                  </div>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
