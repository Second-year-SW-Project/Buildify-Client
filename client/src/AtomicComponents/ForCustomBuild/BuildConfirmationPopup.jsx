import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { InputField } from '../Inputs/Input';
import { toast } from 'sonner';

const BuildConfirmationPopup = ({ 
  open, 
  onClose, 
  selectedComponents,
  onConfirm,
  totalPrice
}) => {
  const [buildName, setBuildName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleConfirm = async () => {
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

    try {
      setIsSaving(true);
      
      // Calculate total price
      const componentsPrice = Object.values(selectedComponents).reduce((sum, component) => {
        if (Array.isArray(component)) {
          return sum + component.reduce((subSum, item) => {
            const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || '0');
            return subSum + price;
          }, 0);
        }
        const price = parseFloat(component.price?.toString().replace(/[^0-9.]/g, '') || '0');
        return sum + price;
      }, 0);

      // Calculate service charge (5%)
      const serviceCharge = componentsPrice * 0.05;
      const totalCharge = componentsPrice + serviceCharge;

      // Prepare components array with new structure
      const components = Object.entries(selectedComponents).map(([type, component]) => {
        if (Array.isArray(component)) {
          return component.map(item => ({
            componentId: item._id,
            quantity: 1
          }));
        }
        return [{
          componentId: component._id,
          quantity: 1
        }];
      }).flat();

      // Prepare build data with new structure
      const buildData = {
        name: buildName,
        image: selectedComponents.Case?.image || '',
        components: components,
        componentsPrice: componentsPrice,
        serviceCharge: serviceCharge,
        totalCharge: totalCharge,
        buildStatus: "pending",
        published: false,
        stepTimestamps: {
          Pending: new Date()
        }
      };

      onConfirm(buildData);
    } catch (error) {
      console.error("Error preparing build data:", error);
      toast.error("Failed to prepare build data. Please try again.", {
        duration: 5000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Function to format component type names
  const formatComponentType = (type) => {
    if (type === 'sound_card') return 'Sound Card';
    if (type === 'wired_network_adapter') return 'Wired Network Adapter';
    if (type === 'wireless_network_adapter') return 'Wireless Network Adapter';
    
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-[#191B2A]">Components Price:</div>
              <div className="text-xl font-bold text-[#191B2A]">LKR {totalPrice.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <div>Service Charge (5%):</div>
              <div>LKR {(totalPrice * 0.05).toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-[#191B2A] border-t pt-2">
              <div>Total Charge:</div>
              <div>LKR {(totalPrice + (totalPrice * 0.05)).toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-[#a036b2] text-white rounded-md hover:bg-[#8a2da0] transition-colors disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Build'}
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