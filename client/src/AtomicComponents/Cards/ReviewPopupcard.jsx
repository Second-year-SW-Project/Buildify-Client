import React from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function ReviewPopupcard({ item, onReviewClick }) {
  return (
    <Card className="p-4 rounded-xl">
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

        <IconButton variant="outlined" onClick={() => onReviewClick(item)}>
          <ArrowForwardIosOutlinedIcon sx={{ color: "black" }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default ReviewPopupcard;
