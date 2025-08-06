import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Itemimage() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Mainimage, setMainImage] = useState(null); // Initialize as null

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Update Mainimage when product data is fetched
  useEffect(() => {
    if (product?.imgUrls?.[0]?.url) {
      setMainImage(product?.imgUrls?.[0]?.url); // Set main image to image1 when available
    }
  }, [product]);

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  // Fallback image in case `product.image1` is missing
  const defaultImage = [product?.imgUrls?.[1]?.url || "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421085/graph1_zqumzj.png"] ;
  const imageArray = [product?.imgUrls?.[0]?.url || defaultImage, defaultImage];

  return (
    <div className="flex flex-col items-center w-full max-w-lg ml-20 mt-12">
      {/* Main Image */}
      <div className="border rounded-lg p-4 w-96 h-96 object-cover">
        <img
          src={Mainimage || defaultImage} // Use Mainimage, fallback to default
          alt={product.name}
          className="w-full h-auto max-h-[450px] object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4">
        {imageArray.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`border-2 rounded-lg p-2 transition ${
              Mainimage === img ? "border-black" : "border-gray-300 hover:border-gray-500"
            }`}
          >
            <img
              src={img}
              alt="sub image"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
