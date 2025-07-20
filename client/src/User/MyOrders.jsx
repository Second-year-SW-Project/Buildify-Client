import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrderCard from "../AtomicComponents/Cards/OrderDetailsCard";
import ReviewPopup from "./ReviewPopup";
import { toast } from "sonner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function MyOrders() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [value, setValue] = useState("1");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openReview, setOpenReview] = useState(false);
  const [selectedOrderId, setSeletcedOrderId] = useState(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Mark as Delivered
  const markAsDelivered = async (orderId, orderType) => {
    try {
      if (orderType == "product") {
        await axios.patch(
          `${backendUrl}/api/checkout/product-orders/${orderId}`,
          {
            status: "Delivered",
            stepTimestamp: { Delivered: new Date().toISOString() },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (orderType == "pc_build") {
        await axios.patch(
          `${backendUrl}/api/build-transactions/${orderId}/status`,
          {
            buildStatus: "Delivered",
            stepTimestamp: { Delivered: new Date().toISOString() },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                status: "Delivered",
              }
            : order
        )
      );

      toast.success("Order marked as Delivered!");
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Failed to update order status", error);
    }
  };

  // fetch user orders
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [productRes, buildRes] = await Promise.all([
          axios.get(
            `${backendUrl}/api/checkout/product-orders${userId ? `?userId=${userId}` : ""}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              signal: controller.signal,
            }
          ),
          axios.get(
            `${backendUrl}/api/build-transactions/user-builds/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              signal: controller.signal,
            }
          ),
        ]);

        if (isMounted) {
          const formattedProductOrders = productRes.data.map((order) => {
            const itemCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0
            );
            return {
              ...order,
              type: "product",
              itemName: order.items[0]?.name || "Unknown",
              totalAmount: Number(order.total).toLocaleString("en-LK", {
                style: "currency",
                currency: "LKR",
              }),
              orderDate: new Date(order.createdAt).toDateString(),
              orderId: order._id,
              imageUrl: order.items[0]?.product_image,
              itemCount,
              status: order.status,
              items: order.items,
            };
          });

          const formattedBuildOrders = buildRes.data.data.map((order) => ({
            type: "pc_build",
            itemName: order.buildName || "Custom Build",
            totalAmount: Number(order.totalCharge).toLocaleString("en-LK", {
              style: "currency",
              currency: "LKR",
            }),
            orderDate: new Date(order.createdAt).toDateString(),
            orderId: order._id,
            imageUrl: order.buildImage,
            itemCount: order.components.length,
            status: order.buildStatus,
            items: order.components,
          }));

          setOrders([...formattedProductOrders, ...formattedBuildOrders]);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          console.error("Failed to fetch orders", err);
          toast.error("Failed to fetch orders");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId]);

  const filteredOrders = orders
    .filter(
      (order) => order.status !== "Sucessful" && order.status !== "Refunded"
    )
    .filter((order) => {
      if (value === "1") return true;
      if (value === "2") return order.type === "pc_build";
      if (value === "3") return order.type === "product";
      return false;
    });

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
                  <h1 className="text-3xl font-bold mt-5 mb-6">Your Orders</h1>

                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleChange} aria-label="Order tabs">
                        <Tab label="All" value="1" />
                        <Tab label="Builds" value="2" />
                        <Tab label="Components" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      {loading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                      ) : (
                        filteredOrders.map((order) => (
                          <OrderCard
                            key={order.orderId}
                            status={order.status}
                            totalAmount={order.totalAmount}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            imageUrl={order.imageUrl}
                            type={order.type}
                            itemCount={order.itemCount}
                            onDetailsClick={() =>
                              navigate(`/user/orders/${order.orderId}`, {
                                state: { type: order.type },
                              })
                            }
                            onDelivered={() =>
                              markAsDelivered(order.orderId, order.type)
                            }
                            onLeaveReview={() => {
                              if (order.type === "pc_build") {
                                navigate(
                                  `/user/orders/review-submit/${order.orderId}`,
                                  {
                                    state: {
                                      type: order.type,
                                      itemName: order.itemName,
                                      imageUrl: order.imageUrl,
                                    },
                                  }
                                );
                              } else {
                                setSeletcedOrderId(order.orderId);
                                setOpenReview(true);
                                setSelectedOrderItems(
                                  order.items.map((item) => ({
                                    ...item,
                                    type: order.type,
                                  }))
                                );
                              }
                            }}
                          />
                        ))
                      )}
                    </TabPanel>
                    <TabPanel value="2">
                      {loading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                      ) : (
                        filteredOrders.map((order) => (
                          <OrderCard
                            key={order.orderId}
                            status={order.status}
                            totalAmount={order.totalAmount}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            imageUrl={order.imageUrl}
                            type={order.type}
                            itemCount={order.itemCount}
                            onDetailsClick={() =>
                              navigate(`/user/orders/${order.orderId}`, {
                                state: { type: order.type },
                              })
                            }
                            onDelivered={() =>
                              markAsDelivered(order.orderId, order.type)
                            }
                            onLeaveReview={() => {
                              if (order.type === "pc_build") {
                                navigate(
                                  `/user/orders/review-submit/${order.orderId}`,
                                  {
                                    state: {
                                      type: order.type,
                                      itemName: order.itemName,
                                      imageUrl: order.imageUrl,
                                    },
                                  }
                                );
                              } else {
                                setSeletcedOrderId(order.orderId);
                                setOpenReview(true);
                                setSelectedOrderItems(
                                  order.items.map((item) => ({
                                    ...item,
                                    type: order.type,
                                  }))
                                );
                              }
                            }}
                          />
                        ))
                      )}
                    </TabPanel>
                    <TabPanel value="3">
                      {loading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                      ) : (
                        filteredOrders.map((order) => (
                          <OrderCard
                            key={order.orderId}
                            status={order.status}
                            totalAmount={order.totalAmount}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            imageUrl={order.imageUrl}
                            type={order.type}
                            itemCount={order.itemCount}
                            onDetailsClick={() =>
                              navigate(`/user/orders/${order.orderId}`, {
                                state: { type: order.type },
                              })
                            }
                            onDelivered={() =>
                              markAsDelivered(order.orderId, order.type)
                            }
                            onLeaveReview={() => {
                              if (order.type === "pc_build") {
                                navigate(
                                  `/user/orders/review-submit/${order.orderId}`,
                                  {
                                    state: {
                                      type: order.type,
                                      itemName: order.itemName,
                                      imageUrl: order.imageUrl,
                                    },
                                  }
                                );
                              } else {
                                setSeletcedOrderId(order.orderId);
                                setOpenReview(true);
                                setSelectedOrderItems(
                                  order.items.map((item) => ({
                                    ...item,
                                    type: order.type,
                                  }))
                                );
                              }
                            }}
                          />
                        ))
                      )}
                    </TabPanel>
                  </TabContext>
                  <ReviewPopup
                    open={openReview}
                    onClose={() => setOpenReview(false)}
                    orderId={selectedOrderId}
                    items={selectedOrderItems}
                  />
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
