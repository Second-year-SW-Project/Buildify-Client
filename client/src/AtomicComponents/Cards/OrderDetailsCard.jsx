import React from "react";
import { Card, CardContent, Button, Divider } from "@mui/material";

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

function OrderCard({
  status,
  totalAmount,
  orderDate,
  orderId,
  imageUrl,
  itemCount,
  onDetailsClick,
}) {
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
                <button
                  className="text-purple-500 hover:underline text-xs ml-1"
                  onClick={() => handleCopy(orderId)}
                >
                  Copy
                </button>
              </p>
            </div>
            <p
              className="text-purple-500 cursor-pointer"
              onClick={onDetailsClick}
            >
              Order Details &gt;
            </p>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 mt-2">
            <img
              src={imageUrl}
              alt="Order items"
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              Total: {totalAmount}
            </p>

            <h3 className="text-base font-bold text-gray-900">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
