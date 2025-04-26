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
    navigate(`review-submit/${orderId}/${item.productId}`, {
      state: {
        type: item.type,
        itemName: item.name,
        imageUrl: item.imageUrl,
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
                src={item.imageUrl || "https://picsum.photos/80"}
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
                  src={item.imageUrl || "https://picsum.photos/60"}
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

      {/* <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Select most applicable
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
            mb: 2,
          }}
        >
          {tagOptions.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              clickable
              variant={selectedTags.includes(tag) ? "filled" : "outlined"}
              color="primary"
            />
          ))}
        </Box>
        <TextField
          label="Your Review"
          fullWidth
          multiline
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #9C27B0, #673AB7)",
            borderRadius: 50,
            px: 4,
            textTransform: "none",
          }}
        >
          Submit
        </Button> */}
    </Dialog>
  );
}
