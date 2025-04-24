import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";


export default function Itemrelates({category}) {

  const [pcs, setPcs] = useState([]);

  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/filter?attribute=type&value=${category}`); // Axios fetch
        setPcs(response.data.slice(0, 5)); // Select only the first 8 items
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchPCs();
  }, []);

  
    return (
      <div className="ml-35 mr-35 px-6 py-12">
        {/* Header */}
        <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-500 py-3 px-6 rounded-md text-center mb-8">
          Related Products
        </h2>
  
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {pcs.map((product) => (
            <div
              key={product._id}
              className="bg-white  shadow-md rounded-lg text-center hover:shadow-xl transition duration-300"
            >
              {/* Product Image */}
              <img
                src={product?.imgUrls?.[0]?.url}
                alt={product.name}
                className="w-full h-32 object-contain mb-4"
              />
  
              {/* Product Name */}
              <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                {product.name}
              </h3>
  
              {/* Brand */}
              <p className="text-xs text-gray-600 mt-2">
                <span className="font-semibold">Brand:</span> {product.manufacturer}
              </p>
  
              {/* Price */}
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {product.price} LKR
              </p>

              
            </div>
          ))}
        </div>
      </div>
    );
  }
  
