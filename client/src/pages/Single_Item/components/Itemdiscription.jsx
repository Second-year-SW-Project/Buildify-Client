import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';






export default function ProductTabs() {


  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const [activeTab, setActiveTab] = useState("specification");
  

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;






  

  return (


    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg border-2 border-gray-400">


      {/* Tab Headers (Centered) */}
      <div className="flex justify-center border-b-2 border-gray-300">


        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "specification"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("specification")}
        >
          Specification
        </button>



        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "review"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 text-gray-700">
        {activeTab === "specification" ? (
          <div>
            <p className="text-sm text-gray-600 mb-8">
            {product.description}
            </p>

            {/*<h3 className="text-xl font-semibold mb-4">{product.description}</h3>*/}
            <p className="text-sm text-gray-600 mb-8">
            {product.description}
            </p>

            <p className="text-sm text-gray-600 mb-8">
            {product.description}
            </p>

            <p className="mt-6 text-sm text-gray-500">
              <span className="font-semibold">Categories:</span> {product.type}
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">{product.description}</h3>
            <p className="mb-4">
              ⭐⭐⭐⭐⭐ - {product.description} -{" "}
              <span className="text-gray-500">John D.</span>
            </p>
            <p className="mb-4">
              ⭐⭐⭐⭐ - {product.description} -{" "}
              <span className="text-gray-500">Alice W.</span>
            </p>
            <p className="mb-4">
              ⭐⭐⭐⭐⭐ - {product.description} -{" "}
              <span className="text-gray-500">Mark R.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
