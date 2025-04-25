import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import AddButton from './AddButton';
import { toast } from 'sonner';

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
        toast.error(`Failed to load components: ${err.message}`, {
          duration: 3000,
          style: {
            background: '#ff6b6b',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
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

  // Helper function to format component type text
  const formatComponentType = (type) => {
    if (typeof type === 'object') {
      return type.componentType
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return type;
  };

  const handleSelectComponent = (component) => {
    // Format the component data for the table
    const selectedData = {
      name: component.name,
      image: component.imgUrls && component.imgUrls.length > 0 
        ? component.imgUrls[0].url 
        : 'https://via.placeholder.com/38',
      availability: component.quantity > 0 ? 'In Stock' : 'Out of Stock',
      price: `LKR ${component.price.toFixed(2)}`,
      tdp: component.tdp || 0,
      originalData: component
    };
    
    onComponentSelected(selectedData);
    onClose();
    toast.success(`${component.name} selected!`, {
      duration: 2000,
      style: {
        background: '#a036b2',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 p-4 sm:p-6 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-600 hover:text-purple-800"
          aria-label="Close"
        >
          <ClearIcon fontSize="large" />
        </button>
       
        {/* Header */}
        <div className="pt-2">
          <h2 className="text-center text-purple-800 font-bold text-2xl sm:text-3xl mb-6">
            Select {formatComponentType(componentType)}
          </h2>
         
          {/* Component listing */}
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-purple-700">Loading components...</p>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">
              Error: {error}
            </div>
          ) : components.length === 0 ? (
            <div className="text-center py-8 text-gray-700">
              No {formatComponentType(componentType)} components found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {components.map((component) => (
                <div 
                  key={component._id}
                  className="border-2 border-[#D099FE9C] rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      {component.imgUrls && component.imgUrls.length > 0 ? (
                        <img 
                          src={component.imgUrls[0].url} 
                          alt={component.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="bg-[#d9a8ff1C] text-black -mx-4 my-2 p-2">
                        <h3 className="font-semibold text-lg">{component.name}</h3>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            LKR {component.price.toLocaleString()}
                          </p>
                          <p className={`text-sm font-medium ${component.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {component.quantity > 0 
                              ? `In Stock (${component.quantity})` 
                              : 'Out of Stock'}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handleSelectComponent(component)}
                          className="bg-[#7315E5] hover:bg-[#5A0DB2] text-white font-bold py-2 px-4 rounded text-sm sm:text-base mt-2 sm:mt-0"
                        >
                          Select
                        </button>
                      </div>
                    </div>
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