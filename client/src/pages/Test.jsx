import React from 'react';

export default function Itemspecs() {
  return (
    <div className="bg-orange-300  w-full lg:w-[50%] px-6 lg:pl-10 flex flex-col justify-center">
      
      {/* Product Name */}
      <h2 className="pb-5 text-xl md:text-2xl font-semibold text-gray-900">
        Intel® Core Ultra 9 Processor 285K
      </h2>

      {/* Specifications */}
      <div className="mt-3 text-gray-700 space-y-2 text-sm md:text-base">
        <p><span className="font-bold">Brand:</span> INTEL</p>
        <p><span className="font-bold">Cores:</span> 24</p>
        <p><span className="font-bold">Threads:</span> 24</p>
        <p><span className="font-bold">Cache:</span> 36MB</p>
        <p><span className="font-bold">Frequency:</span> Up to 5.7GHz</p>
        <p><span className="font-bold">Warranty:</span> 03 Years</p>
      </div>

      {/* Price */}
      <div className="mt-6">
        <p className="text-lg md:text-2xl font-bold text-gray-900">156,000 LKR</p>
      </div>

      {/* Stock Status */}
      <div className="mt-5">
        <span className="inline-block bg-blue-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
          In stock
        </span>
      </div>

      {/* Quantity & Add to Cart Button */}
      <div className="mt-4 flex items-center space-x-5">
        <input
          type="number"
          defaultValue="1"
          min="1"
          className="w-16 md:w-20 h-9 border rounded-2xl text-center"
        />
        <button className="px-4 py-2 bg-black text-white text-xs md:text-sm font-medium rounded-lg hover:bg-gray-800 transition">
          Add To Cart
        </button>
      </div> 
    </div>
  );
}
