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
const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
  const { isEdit, existingReview } = location.state || {};

  useEffect(() => {
    if (isEdit && existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.comment);
    }
  }, [isEdit, existingReview]);

  // Set tag options based on the product type
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

  // Update order status to complete upon review submission
  const markAsSuccessful = async (orderId, type) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const stepTimestamp = { Successful: new Date().toISOString() };

      if (type === "product") {
        await axios.patch(
          `${backendUrl}/api/checkout/product-orders/${orderId}`,
          { status: "Successful", stepTimestamp },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`Product order ${orderId} marked as Successful!`);
      }

      if (type === "pc_build") {
        await axios.patch(
          `${backendUrl}/api/build-transactions/${orderId}/status`,
          {
            buildStatus: "Successful",
            stepTimestamp,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`PC Build order ${orderId} marked as Successful!`);
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  // Review submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      if (!rating) {
        toast.error("Please provide a star rating.");
        return;
      }

      const payload = {
        productId,
        orderId,
        rating,
        comment: reviewText,
        type,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (isEdit) {
        response = await axios.put(
          `${backendUrl}/api/review/${existingReview._id}`,
          payload,
          config
        );
        toast.success("Review updated successfully!");
        navigate(`/user/reviews`);
      } else {
        response = await axios.post(
          `${backendUrl}/api/review/`,
          payload,
          config
        );
        toast.success("Review submitted successfully!");
        await markAsSuccessful(orderId, type);
        navigate(`/user/reviews`);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (isEdit ? "Error updating review." : "Error submitting review.");
      toast.error(message);
      console.error("Submission failed:", error);
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
                    minHeight: "100vh",
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
                      <Typography variant="h6">{itemName}</Typography>
                      <img
                        src={imageUrl}
                        alt={itemName}
                        className="w-48 h-48 rounded-lg object-cover mb-4"
                      />
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
                          {rating ? ratingLabels[rating] : "Select a rating*"}
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
                        {isEdit ? "Update Review" : "Submit"}
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
