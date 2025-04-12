////http://localhost:5000/api/products


import { useEffect, useState } from "react";
import axios from "axios";
import Reviewcardhome from "./Reviewcardhome";

export default function Home_part4() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product/filter?"); // Fetch data from backend
        setReviews(response.data.slice(0, 6)); // Show only 6 reviews
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {reviews.map((review) => (
          <Reviewcardhome key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
