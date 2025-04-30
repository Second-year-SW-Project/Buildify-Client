import { React } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ReviewPopupcard from "../AtomicComponents/Cards/ReviewPopupcard";

export default function ReviewPopup({
  open,
  onClose,
  orderId,
  type,
  items = [],
}) {
  const navigate = useNavigate();

  // Navigate to item review page with order and item-specific details
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
          {items.map((item, index) => (
            <a
              href={`/product/${item.productId}`}
              key={`${item.productId}-${index}`}
            >
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
          {items.map((item, index) => (
            <ReviewPopupcard
              key={`${item.productId}-${index}`}
              item={item}
              onReviewClick={handleItemReviewClick}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
