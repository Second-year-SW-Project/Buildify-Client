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


    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md border-2 border-gray-200">


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
      <div className="p-8 ">
        {activeTab === "specification" ? (
          <div>
            <p className="text-justify text-gray-800 mb-8">
            The TEAM T-FORCE DELTAα RGB 32GB (2x16GB)  DDR5 5600MHz RAM is a high-performance memory kit designed for gamers and power users seeking speed, stability, and visual appeal. With a sleek black design and vibrant RGB lighting, it enhances any build while delivering exceptional performance through its 5600MHz speed and low 1.2V operating voltage. Featuring a 288-pin DIMM form factor, CAS latency of 38, and a first word latency of 13.571ns, this non-ECC, unbuffered memory ensures smooth multitasking and fast data access. Backed by a 4-year warranty and equipped with a reliable heat spreader for optimal thermal performance, this kit is in stock and ready to power your next-gen system.
            </p>

            {/*<h3 className="text-xl font-semibold mb-4">{product.description}</h3>*/}
      

            <p className="mt-6 text-sm text-gray-700">
              <span className="font-bold">Category:</span> {product.type}
            </p>
          </div>
        ) : (
          <div className='text-gray-800'>
            <h3 className="text-xl font-semibold mb-4 ">{product.description}</h3>
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
