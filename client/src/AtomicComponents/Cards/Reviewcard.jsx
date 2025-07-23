import React from "react";
import { Card, CardContent, Button, Divider, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Reviewcard({ review, onLeaveReviewClick }) {
  const {
    reviewId,
    type,
    orderId,
    productId,
    name,
    price,
    product_image,
    rating,
    comment,
    createdAt,
    status,
  } = review;

  const navigate = useNavigate();

  return (
    <Card className="p-4 rounded-2xl shadow-2xl bg-white flex flex-col w-full max-w-3xl mb-6">
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <p
            className="text-xl font-bold text-gray-900 cursor-pointer"
            onClick={() => navigate(`/itempage/${productId}`)}
          >
            {name}
          </p>
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
            className="w-24 h-24 rounded-lg object-cover cursor-pointer"
            onClick={() =>
              type === "product"
                ? navigate(`/itempage/${productId}`)
                : navigate(`/user/orders/${orderId}`, {
                    state: { type: type },
                  })
            }
          />

          <div className="flex-1 text-left space-y-1">
            <h3 className="text-base font-bold text-gray-900">
              {typeof price === "number"
                ? `Price: LKR ${price.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : "Price: N/A"}
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
                onClick={() =>
                  navigate(
                    `/user/orders/review-submit/${orderId}/${productId}`,
                    {
                      state: {
                        type,
                        itemName: name,
                        imageUrl: product_image,
                        isEdit: true,
                        existingReview: {
                          _id: review.reviewId,
                          rating: review.rating,
                          comment: review.comment,
                        },
                      },
                    }
                  )
                }
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
