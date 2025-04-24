import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import AddButton from './AddButton';

const ComponentSelectionPopup = ({ 
  onClose, 
  onComponentSelected, 
  componentType 
}) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true);
        const backendType = getBackendType(componentType);
        const isExpansionNetwork = backendType === 'expansion_network';
        const componentTypeValue = typeof componentType === 'object' ? componentType.componentType : null;

        // Construct query URL
        let url = `http://localhost:8000/api/product/filter?attribute=type&value=${backendType}`;
        if (isExpansionNetwork && componentTypeValue) {
          url += `&attribute2=component_type&value2=${componentTypeValue}`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${componentType} components`);
        }
        
        const data = await response.json();
        setComponents(data);
      } catch (err) {
        console.error("Error fetching components:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [componentType]);

  // Helper function to map frontend component type to backend type
  const getBackendType = (type) => {
    const typeMap = {
      'CPU': 'processor',
      'CPU Cooler': 'cooling',
      'Motherboard': 'motherboard',
      'Memory': 'ram',
      'Storage': 'storage',
      'Video Card': 'gpu',
      'Case': 'casing',
      'Power Supply': 'power',
      'Expansion Cards/Networking': 'expansion_network',
      'sound_card': 'expansion_network',
      'wired_network_adapter': 'expansion_network',
      'wireless_network_adapter': 'expansion_network'
    };
    
    return typeMap[typeof type === 'object' ? type.componentType : type] || type.toLowerCase();
  };

  const handleSelectComponent = (component) => {
    // Format the component data for the table
    const selectedData = {
      name: component.name,
      image: component.imgUrls && component.imgUrls.length > 0 
        ? component.imgUrls[0].url 
        : 'https://via.placeholder.com/38',
      availability: component.quantity > 0 ? 'In Stock' : 'Out of Stock',
      price: `LKR ${component.price.toFixed(2)}`, // Updated to LKR
      tdp: component.tdp || 0, // Include tdp, default to 0 if not present
      originalData: component
    };
    
    onComponentSelected(selectedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-800 hover:text-purple-900"
          aria-label="Close"
        >
          <ClearIcon fontSize="large" />
        </button>
       
        {/* Header */}
        <div className="pt-4 sm:pt-6">
          <h2 className="text-center text-purple-800 font-bold text-2xl sm:text-3xl mb-6">
            Select {typeof componentType === 'object' ? componentType.componentType.replace('_', ' ') : componentType}
          </h2>
         
          {/* Component listing */}
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading components...</p>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">
              Error: {error}
            </div>
          ) : components.length === 0 ? (
            <div className="text-center py-8">
              No {typeof componentType === 'object' ? componentType.componentType.replace('_', ' ') : componentType} components found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {components.map((component) => (
                <div 
                  key={component._id}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 mr-3">
                      {component.imgUrls && component.imgUrls.length > 0 ? (
                        <img 
                          src={component.imgUrls[0].url} 
                          alt={component.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{component.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <p className="text-green-600 font-medium text-sm">
                        LKR {component.price.toFixed(2)} {/* Updated to LKR */}
                      </p>
                      <p className={`text-xs ${component.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {component.quantity > 0 
                          ? `In Stock (${component.quantity})` 
                          : 'Out of Stock'}
                      </p>
                    </div>
                    <AddButton 
                      text="Select" 
                      onClick={() => handleSelectComponent(component)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Prop types validation
ComponentSelectionPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onComponentSelected: PropTypes.func.isRequired,
  componentType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      type: PropTypes.string,
      componentType: PropTypes.string
    })
  ]).isRequired
};

export default ComponentSelectionPopup;