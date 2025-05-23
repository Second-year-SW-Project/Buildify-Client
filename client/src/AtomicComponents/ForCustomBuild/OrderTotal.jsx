// src/components/OrderTotal.jsx
import React from 'react';

export default function OrderTotal() {
  return (
    <div className="border rounded-lg p-4 space-y-3 shadow-sm">
      <div className="space-y-2 text-gray-800">
        <p><span className="font-semibold">Total component cost:</span></p>
        <p><span className="font-semibold">Fixed service charge:</span></p>
        <p><span className="font-semibold">Delivery charge:</span></p>
      </div>
      <div className="flex justify-between items-center text-lg font-semibold text-gray-900 pt-2 border-t">
        <span>Total :</span>
        <span>3,000,000 LKR</span>
      </div>
      <div className="flex justify-center">
        <button className="w-full max-w-[300px] py-3 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-medium transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
