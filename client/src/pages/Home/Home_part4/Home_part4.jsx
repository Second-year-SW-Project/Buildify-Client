//// Example: `${import.meta.env.VITE_BACKEND_URL}/api/products`


import { useEffect, useState } from "react";
import axios from "axios";
import Reviewcardhome from "./Reviewcardhome";

export default function Home_part4() {
  const [reviews, setReviews] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/review/admin/all`); 
        const reviews = response.data.slice(0, 6); //show only 6 reviews

        // Fetch product names for each review
        const productNamePromises = reviews.map(async (review) => {
          try {
            const productRes = await axios.get(`${backendUrl}/api/product/${review.productId}`);
            // If productRes.data.Success, use productRes.data.data.name, else fallback
            let productName = productRes.data.name || productRes.data.data?.name || null;
            return { ...review, productName };
          } catch (err) {
            return { ...review, productName: null };
          }
        });
        const reviewsWithProductNames = await Promise.all(productNamePromises);
        setReviews(reviewsWithProductNames);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full py-16 px-4">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Customer Feedback</h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center ml-16">
        {reviews.map((review) => (
          <Reviewcardhome key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
