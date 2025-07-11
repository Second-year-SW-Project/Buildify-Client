import React from "react";
import { Card, CardContent, Button, Divider, Rating } from "@mui/material";

export default function Reviewcard({ review, onLeaveReviewClick }) {
  const {
    productId,
    name,
    price,
    product_image,
    rating,
    comment,
    createdAt,
    status,
  } = review;

  return (
    <Card className="p-4 rounded-2xl shadow-2xl bg-white flex flex-col w-full max-w-3xl mb-6">
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <p className="text-xl font-bold text-gray-900">{name}</p>
          {status === "Reviewed" && (
            <div>
              <p className="text-sm text-gray-500">
                Date: {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <Divider className="mb-4" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <img
            src={product_image}
            alt={name}
            className="w-24 h-24 rounded-lg object-cover"
          />

          <div className="flex-1 text-left space-y-1">
            <h3 className="text-base font-bold text-gray-900">
              Price: ${price.toFixed(2)}
            </h3>
            {status === "Reviewed" && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Rating value={rating} readOnly size="small" />
                </div>
                {comment && <p className="text-gray-700">{comment}</p>}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {status === "To Review" ? (
              <Button
                variant="contained"
                sx={{
                  borderRadius: 900,
                  textTransform: "none",
                  px: 2,
                  mt: 2,
                  height: 40,
                  width: 140,
                }}
                onClick={() => onLeaveReviewClick(review)}
              >
                Leave a Review
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 900,
                  textTransform: "none",
                  px: 2,
                  mt: 2,
                  height: 40,
                  width: 140,
                }}
              >
                Edit Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
