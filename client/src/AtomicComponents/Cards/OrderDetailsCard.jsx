import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Divider } from "@mui/material";
import { toast } from "sonner";

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

function OrderCard({
  status,
  totalAmount,
  type,
  orderDate,
  orderId,
  imageUrl,
  itemCount,
  onDetailsClick,
  onDelivered,
  onLeaveReview,
}) {
  const navigate = useNavigate();

  const handleRefundClick = () => {
    toast.info("Redirecting to RMA support");
    navigate(`/user/rmaSupport?orderId=${orderId}`);
  };

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
              onClick={() => onDetailsClick(orderId, type)}
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
          <div className="text-left">
            <p className="text-lg font-bold text-gray-900">
              Total: {totalAmount}
            </p>

            <h3 className="text-base font-bold text-gray-900">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </h3>
          </div>
          <div className="flex flex-col">
            {status === "Cancelled" || status === "Refunded" ? null : status ===
              "Delivered" ? (
              <>
                <Button
                  variant="contained"
                  onClick={onLeaveReview}
                  sx={{
                    borderRadius: 900,
                    textTransform: "none",
                    px: 2,
                    mt: 2,
                  }}
                >
                  Leave a Review
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleRefundClick}
                  sx={{
                    borderRadius: 900,
                    textTransform: "none",
                    px: 2,
                    mt: 2,
                  }}
                >
                  Refund/Refuse
                </Button>
              </>
            ) : status === "Completed" ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 900,
                    textTransform: "none",
                    px: 2,
                    mt: 2,
                  }}
                  onClick={() => navigate("/user/reviews")}
                >
                  Your Reviews
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleRefundClick}
                  sx={{
                    borderRadius: 900,
                    textTransform: "none",
                    px: 2,
                    mt: 2,
                  }}
                >
                  Refund/Refuse
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={onDelivered}
                  sx={{
                    borderRadius: 900,
                    textTransform: "none",
                    px: 2,
                    mt: 2,
                  }}
                >
                  Mark as Delivered
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 900,
                    textTransform: "none",
                    px: 2,
                    mt: 2,
                  }}
                >
                  Track Order
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
