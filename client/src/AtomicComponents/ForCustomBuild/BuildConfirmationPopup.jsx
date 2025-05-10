import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { InputField } from '../Inputs/Input';
import { toast } from 'sonner';

const BuildConfirmationPopup = ({ 
  open, 
  onClose, 
  selectedComponents,//Holds the selected components
  onConfirm,
  totalPrice
}) => {
  const [buildName, setBuildName] = useState('');//Save the build name

  const handleConfirm = () => {
    if (!buildName.trim()) {
      toast.error("Please enter a name for your build", {
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      return;
    }
    onConfirm(buildName);
  };

  // Function to format component type names
  const formatComponentType = (type) => {
    // Handle expansion network types
    if (type === 'sound_card') return 'Sound Card';
    if (type === 'wired_network_adapter') return 'Wired Network Adapter';
    if (type === 'wireless_network_adapter') return 'Wireless Network Adapter';
    
    // Handle other component types
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };//Converts internal keys like "sound_card" to "Sound Card"

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 p-6 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#191B2A]">Build Summary</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700 focus:outline-none"
          >
            <ClearIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Build Name Input */}
        <div className="mb-6">
          <InputField
            type="text"
            label="Build Name"
            value={buildName}
            onChange={(value) => setBuildName(value)}
            width="100%"
            placeholder="Enter a name for your build"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-4">
            {Object.entries(selectedComponents).map(([type, component]) => {
              // Skip expansion cards/networking if empty
              if (type === 'Expansion Cards/Networking' && !component) return null;

              return (
                <div key={type} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg text-[#191B2A] mb-3">{formatComponentType(type)}</h3>
                  {Array.isArray(component) ? (
                    component.map((item, index) => (
                      <div key={index} className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="text-[#191B2A]">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[#191B2A]">{item.price}</div>
                          <div className="text-sm text-gray-500">{item.availability}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={component.image}
                          alt={component.name}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="text-[#191B2A]">{component.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[#191B2A]">{component.price}</div>
                        <div className="text-sm text-gray-500">{component.availability}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-[#191B2A]">Total Price:</div>
            <div className="text-xl font-bold text-[#191B2A]">LKR {totalPrice.toFixed(2)}</div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-[#a036b2] text-white rounded-md hover:bg-[#8a2da0] transition-colors"
            >
              Save Build
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BuildConfirmationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedComponents: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default BuildConfirmationPopup;