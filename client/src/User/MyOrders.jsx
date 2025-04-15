import React, { useState } from "react";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_component/Navbar";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrderCard from "../AtomicComponents/Cards/OrderDetailsCard";

export default function MyOrders() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Dummy data for orders
  const orders = [
    {
      id: 1,
      status: "Awaiting delivery",
      itemName: "Build name 1",
      totalAmount: "LKR 250,000.00",
      orderDate: "Nov 12, 2024",
      orderId: "1109M8B2Y7A0Z3_O6W",
      type: "build",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      status: "Delivered",
      itemName: "Item name 2",
      totalAmount: "LKR 150,000.00",
      orderDate: "Nov 10, 2024",
      orderId: "1109M8B2Y7A0Z3_O6X",
      type: "component",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      status: "Awaiting delivery",
      itemName: "Build name 3",
      totalAmount: "LKR 350,000.00",
      orderDate: "Nov 15, 2024",
      orderId: "1109M8B2Y7A0Z3_O6Y",
      type: "build",
      imageUrl: "https://via.placeholder.com/100",
    },
  ];

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
                      {filteredOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          status={order.status}
                          itemName={order.itemName}
                          totalAmount={order.totalAmount}
                          orderDate={order.orderDate}
                          orderId={order.orderId}
                          imageUrl={order.imageUrl}
                        />
                      ))}
                    </TabPanel>
                    <TabPanel value="2">
                      {filteredOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          status={order.status}
                          itemName={order.itemName}
                          totalAmount={order.totalAmount}
                          orderDate={order.orderDate}
                          orderId={order.orderId}
                          imageUrl={order.imageUrl}
                        />
                      ))}
                    </TabPanel>
                    <TabPanel value="3">
                      {filteredOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          status={order.status}
                          itemName={order.itemName}
                          totalAmount={order.totalAmount}
                          orderDate={order.orderDate}
                          orderId={order.orderId}
                          imageUrl={order.imageUrl}
                        />
                      ))}
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
