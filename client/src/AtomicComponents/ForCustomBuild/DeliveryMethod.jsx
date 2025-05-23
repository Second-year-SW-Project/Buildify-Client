// src/components/DeliveryMethod.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function DeliveryMethod({ onDeliveryMethodChange }) {
  const [selected, setSelected] = useState('Home Delivery');

  const options = ['Home Delivery', 'Pick up at store'];

  const handleDeliveryMethodChange = (option) => {
    setSelected(option);
    onDeliveryMethodChange(option);
  };

  return (
    <div className="border rounded-2xl p-8 shadow-md bg-white flex flex-col items-center">
      <h3 className="font-semibold text-purple-700 text-lg mb-6 self-start">Select a delivery method</h3>
      <div className="flex flex-col gap-4 w-full max-w-[340px] bg-gray-50 p-4 rounded-xl border border-gray-200">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleDeliveryMethodChange(option)}
            className={`w-full py-3 rounded-lg text-white text-center font-semibold text-base transition-all duration-200 shadow-sm focus:outline-none
              ${selected === option
                ? 'bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg ring-2 ring-purple-300 scale-[1.03]'
                : 'bg-purple-400 hover:bg-purple-500'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

DeliveryMethod.propTypes = {
  onDeliveryMethodChange: PropTypes.func.isRequired
};
