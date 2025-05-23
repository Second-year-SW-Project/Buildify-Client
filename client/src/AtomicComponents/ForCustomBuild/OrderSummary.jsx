// src/components/OrderSummary.jsx
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OrderSummary() {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/100x100.png?text=PC+Build"
          alt="Custom Build"
          className="w-24 h-24 rounded"
        />
        <div>
          <h3 className="font-semibold text-lg">Custom Build 1</h3>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-semibold text-xl text-gray-800">765,000 LKR</p>
        <button className="text-gray-400 hover:text-red-500 transition">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
