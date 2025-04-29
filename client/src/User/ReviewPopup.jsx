import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

export default function ReviewPopup({
  open,
  onClose,
  orderId,
  type,
  items = [],
}) {
  const navigate = useNavigate();

  const handleItemReviewClick = (item) => {
    navigate(`review-submit/${orderId}/${item._id}`, {
      state: {
        type: item.type,
        itemName: item.name,
        imageUrl: item.product_image,
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          border: "1px solid",
          borderRadius: "16px",
          p: 2,
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Leave a review
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Review all items
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, mb: 3 }}>
          {items.map((item) => (
            <a href={`/product/${item.productId}`} key={item.productId}>
              <img
                src={item.product_image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            </a>
          ))}
          <IconButton>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Choose an item to review
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((item) => (
            <Card key={item.productId} className="p-4 rounded-xl">
              <CardContent className="flex items-center gap-4">
                <img
                  src={item.product_image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <Box className="flex-1 text-left">
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2">x{item.quantity}</Typography>
                </Box>

                <IconButton
                  variant="outlined"
                  onClick={() => handleItemReviewClick(item)}
                >
                  <ArrowForwardIosOutlinedIcon sx={{ color: "black" }} />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
