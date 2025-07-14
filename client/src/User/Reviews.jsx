import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import Navbar from "../MoleculesComponents/User_navbar_and_footer/Navbar";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Reviewcard from "../AtomicComponents/Cards/Reviewcard";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Reviews() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productsWithReviews, setProductsWithReviews] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLeaveReviewClick = (review) => {
    if (review.type === "pc_build") {
      navigate(`/user/orders/review-submit/${review.orderId}`, {
        state: {
          type: review.type,
          itemName: review.name,
          imageUrl: review.product_image,
          isEdit: false,
        },
      });
    } else {
      navigate(
        `/user/orders/review-submit/${review.orderId}/${review.productId}`,
        {
          state: {
            type: review.type,
            itemName: review.name,
            imageUrl: review.product_image,
            isEdit: false,
          },
        }
      );
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/review/my`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(res.data);
        setProductsWithReviews(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

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
                  <h1 className="text-3xl font-bold mt-5 mb-6">Your Reviews</h1>

                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleChange} aria-label="Build tabs">
                        <Tab
                          icon={<RateReviewOutlinedIcon />}
                          label="To review"
                          iconPosition="start"
                          value="1"
                        />
                        <Tab
                          icon={<ReviewsOutlinedIcon />}
                          iconPosition="start"
                          label="Reviewed"
                          value="2"
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      {loading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                      ) : error ? (
                        <p>Error: {error}</p>
                      ) : productsWithReviews.filter(
                          (p) => p.status === "To Review"
                        ).length === 0 ? (
                        <p>No reviews to do.</p>
                      ) : (
                        productsWithReviews
                          .filter((p) => p.status === "To Review")
                          .map((review) => (
                            <Reviewcard
                              key={`${review.type}-${review.productId || review.reviewId || review.orderId}`}
                              review={review}
                              onLeaveReviewClick={handleLeaveReviewClick}
                            />
                          ))
                      )}
                    </TabPanel>

                    <TabPanel value="2">
                      {loading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                      ) : error ? (
                        <p>Error: {error}</p>
                      ) : productsWithReviews.filter(
                          (p) => p.status === "Reviewed"
                        ).length === 0 ? (
                        <p>No completed reviews.</p>
                      ) : (
                        productsWithReviews
                          .filter((p) => p.status === "Reviewed")
                          .map((review) => (
                            <Reviewcard
                              key={`${review.type}-${review.productId || review.reviewId || review.orderId}`}
                              review={review}
                            />
                          ))
                      )}
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
