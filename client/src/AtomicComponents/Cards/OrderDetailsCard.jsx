import React from "react";
import { Card, CardContent, Button, Divider } from "@mui/material";

const OrderCard = ({
  status,
  itemName,
  totalAmount,
  orderDate,
  orderId,
  imageUrl,
}) => {
  return (
    <Card className="p-6 rounded-2xl shadow-2xl bg-white flex flex-col w-full max-w-3xl mb-6">
      <CardContent>
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900">{status}</h2>
          <div className="flex items-center gap-4">
            <div className="border-r-2 pr-4 text-right">
              <p className="text-sm text-gray-700">Order date: {orderDate}</p>
              <p className="text-sm text-gray-700">
                Order ID: {orderId}{" "}
                <span className="text-purple-500 cursor-pointer">Copy</span>
              </p>
            </div>
            <p className="text-purple-500 cursor-pointer">Order Details &gt;</p>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={imageUrl}
              alt={itemName}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                {itemName}
              </h3>
              <p className="text-lg text-gray-700">{totalAmount}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              Total: {totalAmount}
            </p>
            <div className="mt-4 flex gap-4">
              <Button
                sx={{
                  backgroundColor: "#a614f5",
                  color: "#ffffff",
                  borderColor: "#6B21A8",
                  "&:hover": {
                    backgroundColor: "#8a0acf",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  },
                }}
                className="px-4 py-1 rounded-lg border-2"
              >
                Confirm Received
              </Button>
              <Button
                sx={{
                  backgroundColor: "#d1d5db",
                  color: "#000000",
                  borderColor: "#6b7280",
                  "&:hover": {
                    backgroundColor: "#9ca3af",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  },
                }}
                className="px-4 py-1 rounded-lg border-2"
              >
                Track Order
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
