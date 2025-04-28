import React from "react";
import { Card, CardContent, Button } from "@mui/material";

export default function Reviewcard() {
  return (
    <Card className="p-4 rounded-2xl shadow-2xl bg-white flex flex-col w-full max-w-3xl mb-6">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex justify-between items-start">
            <img
              src="placeholder.png"
              alt="product image"
              className="w-24 h-24 rounded-lg object-cover"
            ></img>
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-gray-900">itemName</p>

            <h3 className="text-base font-bold text-gray-900">Subcategory</h3>
          </div>
          <div className="flex flex-col">
            {status === "Delivered" ? (
              <>
                <Button
                  variant="contained"
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
                >
                  Your Reviews
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
                  Refund/Refuse
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
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
