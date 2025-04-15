import React, { useState } from "react";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_component/Navbar";
import { Box, Button, Divider } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

export default function OrderDetails() {
  const orderId = "1108983829767453";
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

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
                        <span className="text-lg font-medium">
                          R. M. Gethmi S. Rathnayaka
                        </span>
                        <span className="ml-2 text-sm text-purple-600">
                          +94 710354073
                        </span>
                      </div>
                      <p className="text-sm">
                        44, Pubudhu Mw , Madiha, Kamburugamuwa, Matara, Sri
                        Lanka.
                      </p>
                      <p className="text-sm mt-1">
                        Matara, Matara, Sri Lanka, 81750
                      </p>
                    </div>

                    <div className="w-1/2 p-4 border bg-white rounded-md shadow-sm">
                      <div className="flex items-center mb-2">
                        <AssignmentOutlinedIcon />
                        <p className="text-sm mr-3">
                          <span className="font-medium">Order ID:</span>{" "}
                          <span className="text-purple-600">{orderId}</span>{" "}
                          <button
                            className="text-purple-500 hover:underline text-xs ml-1"
                            onClick={() => handleCopy(orderId)}
                          >
                            Copy
                          </button>
                        </p>
                      </div>

                      <p className="text-sm mt-1">
                        <span className="font-medium">Order placed on:</span>{" "}
                        Nov 12, 2024
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
                        Credit/Debit card
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm border">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <img
                          src="https://via.placeholder.com/80x80"
                          alt="Product"
                          className="w-20 h-20 object-cover rounded"
                        />

                        <div>
                          <p className="text-sm font-semibold">
                            25g Mohair Yarn Extra Soft Warm Baby Wool Crochet
                            Yarn for Hand Knitting Sweater Sha...
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            51, CHINA
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">LKR 300.97</span>{" "}
                            <span className="text-gray-600">x4</span>
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

                    <hr className="my-4" />

                    <div className="flex justify-end">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-lg font-semibold">LKR 563.88</p>
                      </div>
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
