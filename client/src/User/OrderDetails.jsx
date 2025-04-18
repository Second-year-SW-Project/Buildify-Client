import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import { Box, Button, Divider } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/checkout/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
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
                  <h1 className="text-2xl font-bold mt-5 mb-2">Order Status</h1>
                  <div className="mb-3">
                    <Button
                      variant="contained"
                      sx={{
                        mr: 1,
                        borderRadius: 900,
                        textTransform: "none",
                        px: 2,
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
                  <div className="flex items-stretch justify-between pb-4 pt-4 rounded-md shadow-sm gap-4">
                    <div className="w-1/2 p-4 border bg-white rounded-md shadow-sm">
                      <div className="flex items-center mb-2">
                        <PlaceOutlinedIcon />
                        <span className="text-lg font-medium ml-2">
                          {order?.shippingAddress?.recipient || "N/A"}
                        </span>
                        <span className="ml-2 text-sm text-purple-600">
                          {order?.shippingAddress?.phone || "+94 710354073"}
                        </span>
                      </div>
                      <p className="text-sm">
                        {order?.shippingAddress?.addressLine ||
                          "Address not available"}
                      </p>
                      <p className="text-sm mt-1">
                        {order?.shippingAddress?.city},{" "}
                        {order?.shippingAddress?.region},{" "}
                        {order?.shippingAddress?.postalCode}
                      </p>
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

                      <p className="text-sm mt-1">
                        <span className="font-medium">Order placed on:</span>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">
                          Payment completed on:
                        </span>{" "}
                        Nov 12, 2024
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">
                          Shipment completed on:
                        </span>{" "}
                        Nov 13, 2024
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Order completed on:</span>{" "}
                        Jan 27, 2025
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Payment method:</span>{" "}
                        {order?.paymentMethod || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-md shadow-sm border mb-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <img
                            src={
                              item.image || "https://via.placeholder.com/80x80"
                            }
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

                  <hr className="my-4" />

                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold">LKR {order.total}</p>
                    </div>
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
