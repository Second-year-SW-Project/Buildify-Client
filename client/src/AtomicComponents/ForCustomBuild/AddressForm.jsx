// src/components/AddressForm.jsx
import React from 'react';

export default function AddressForm() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-purple-700 text-lg mb-4">Confirm your address</h3>
      <div className="space-y-3">
        {['Address', 'Building no. or Street', 'City or Town', 'Postal Code'].map((placeholder) => (
          <input
            key={placeholder}
            type="text"
            placeholder={placeholder}
            className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ))}
      </div>
    </div>
  );
}
