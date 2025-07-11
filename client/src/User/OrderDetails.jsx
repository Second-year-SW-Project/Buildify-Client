import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import OrderStepper from "../MoleculesComponents/Admin_components/Stepper";
import { Box, Button, Divider, Typography } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getStepFromStatus = (status) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Successful":
        return 3;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      case "Refunded":
        return 4;
      case "Canceled":
        return 0;
      default:
        return 0;
    }
  };

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/checkout/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrder(res.data);
      setActiveStep(getStepFromStatus(res.data.status));
    } catch (err) {
      console.error("Failed to fetch order", err);
      toast.error("Failed to fetch order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "Delivered" && order.status !== "Shipped") {
      toast.error(
        "Order must be 'Shipped' before it can be marked as 'Delivered'"
      );
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}/api/checkout/product-orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setOrder((prev) => ({ ...prev, status: newStatus }));
        setActiveStep(getStepFromStatus(newStatus));
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
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
                    >
                      Order Again
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
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-md shadow-sm border mb-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <img
                            src={item.product_image}
                            alt="Product"
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-sm mt-1">
                              <span className="font-medium">
                                LKR {item.price}
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
                            Returns/refunds
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

                    <OrderStepper
                      activeStep={activeStep}
                      orderStatus={order.status}
                      editable={false}
                    />

                    {order.status === "Shipped" && (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 3 }}
                        disabled={loading}
                        onClick={() => handleStatusChange("Delivered")}
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
