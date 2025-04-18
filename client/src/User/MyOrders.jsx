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

export default function MyOrders() {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/checkout/product-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal: controller.signal,
          }
        );

        if (isMounted) {
          const formatted = res.data.map((order) => {
            const itemCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0
            );
            return {
              ...order,
              type: "component",
              itemName: order.items[0]?.name || "Unknown",
              totalAmount: Number(order.total).toLocaleString("en-LK", {
                style: "currency",
                currency: "LKR",
              }),
              orderDate: new Date(order.createdAt).toDateString(),
              orderId: order._id,
              imageUrl: "https://picsum.photos/100",
              itemCount: itemCount,
            };
          });

          setOrders(formatted);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          console.error("Failed to fetch product orders", err);
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (value === "1") return true;
    if (value === "2") return order.type === "build";
    if (value === "3") return order.type === "component";
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
                        <p>Loading...</p>
                      ) : (
                        filteredOrders.map((order) => (
                          <OrderCard
                            key={order.orderId}
                            status={order.status}
                            totalAmount={order.totalAmount}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            imageUrl={order.imageUrl}
                            itemCount={order.itemCount}
                            onDetailsClick={() => navigate(`${order.orderId}`)}
                          />
                        ))
                      )}
                    </TabPanel>
                    <TabPanel value="2">
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        filteredOrders.map((order) => (
                          <OrderCard
                            key={order.orderId}
                            status={order.status}
                            totalAmount={order.totalAmount}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            imageUrl={order.imageUrl}
                            itemCount={order.itemCount}
                            onDetailsClick={() => navigate(`/${order.orderId}`)}
                          />
                        ))
                      )}
                    </TabPanel>
                    <TabPanel value="3">
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        filteredOrders.map((order) => (
                          <OrderCard
                            key={order.orderId}
                            status={order.status}
                            totalAmount={order.totalAmount}
                            orderDate={order.orderDate}
                            orderId={order.orderId}
                            imageUrl={order.imageUrl}
                            itemCount={order.itemCount}
                            onDetailsClick={() => navigate(`${order.orderId}`)}
                          />
                        ))
                      )}
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
