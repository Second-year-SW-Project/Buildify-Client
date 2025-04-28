import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import {
  Box,
  Typography,
  Rating,
  Chip,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { toast } from "sonner";

const productTagOptions = [
  "Fast Delivery",
  "Affordable Price",
  "Fast Replies",
  "Great Packaging",
  "Quick service",
  "High-Quality",
  "Professional",
];

const pcBuildTagOptions = [
  "Easy Customization",
  "High Performance",
  "Customizable Parts",
  "Great Cooling",
  "Affordable Price",
  "Gaming Ready",
  "Future-Proof",
  "Fast Setup",
  "Efficient",
];

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

export default function ReviewSubmitPage() {
  const { orderId, productId } = useParams();
  const location = useLocation();
  const { type, itemName, imageUrl } = location.state || {};
  const navigate = useNavigate();

  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    if (type === "product") {
      setTagOptions(productTagOptions);
    } else if (type === "pc_build") {
      setTagOptions(pcBuildTagOptions);
    } else {
      console.error("Invalid review type");
    }
  }, [type]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // Remove the tag from selectedTags
      const newTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
      setSelectedTags(newTags);

      // Remove the tag from reviewText
      const updatedReviewText = reviewText
        .split(", ")
        .filter((text) => text.trim() !== tag)
        .join(", ")
        .trim();
      setReviewText(updatedReviewText);
    } else {
      // Add the tag to selectedTags
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);

      // Add the tag to reviewText
      setReviewText((prev) => (prev ? `${prev}, ${tag}` : `${tag}`));
    }
  };

  const markAsCompleted = async (orderId) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/checkout/product-orders/${orderId}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(`Order ${orderId} marked as Completed`);
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not authenticated.");
        return;
      }

      // Decode the token to get the userId
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await fetch("http://localhost:8000/api/review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          orderId,
          userId,
          rating,
          comment: reviewText,
        }),
      });

      // for testing
      if (type !== "product" && type !== "pc_build") {
        console.error("Invalid review type");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Error submitting review", errorData);
        console.error("Error submitting review:", errorData);
        return;
      }

      const data = await response.json();
      toast.success("Review submitted successfully!");
      console.log("Review submitted:", data);
      markAsCompleted(orderId);

      navigate(`/user/orders`);
    } catch (err) {
      toast.error("Submission failed:", err);
      console.error("Submission failed:", err);
    }
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
                  component="main"
                  sx={{
                    p: 3,
                    pl: 7,
                    width: "90%",
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <h1 className="text-3xl font-bold mt-5 mb-6">
                    Leave a Review
                  </h1>
                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 4,
                      pt: 3,
                      alignItems: { xs: "stretch", md: "flex-start" },
                    }}
                  >
                    <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                      <Typography variant="h6">
                        {itemName} {orderId}
                      </Typography>
                      <img
                        src={imageUrl}
                        alt={itemName}
                        className="w-48 h-48 rounded-lg object-cover mb-4"
                      />
                      {/* <Typography>Order ID: {orderId}</Typography>
                      <Typography>Type: {type}</Typography> */}
                    </Box>

                    <Box sx={{ flex: 2, width: { xs: "100%", md: "auto" } }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={rating}
                          onChange={(e, newValue) => setRating(newValue)}
                          size="large"
                          sx={{ mr: 2 }}
                        />
                        <Typography variant="body2">
                          {rating ? ratingLabels[rating] : "Select a rating"}
                        </Typography>
                      </Box>

                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Select most applicable
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {tagOptions.map((tag, index) => (
                          <Chip
                            key={`${tag}-${index}`}
                            label={tag}
                            onClick={() => handleTagClick(tag)}
                            clickable
                            variant={
                              selectedTags.includes(tag) ? "filled" : "outlined"
                            }
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
                          background:
                            "linear-gradient(90deg, #9C27B0, #673AB7)",
                          borderRadius: 50,
                          px: 4,
                          textTransform: "none",
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
