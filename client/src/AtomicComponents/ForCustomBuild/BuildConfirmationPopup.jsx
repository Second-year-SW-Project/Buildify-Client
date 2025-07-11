import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { InputField } from '../Inputs/Input';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BuildConfirmationPopup = ({ 
  open, 
  onClose, 
  selectedComponents,
  onConfirm,
  totalPrice
}) => {
  const [buildName, setBuildName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please log in to save your build", {
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      navigate('/auth/login');
      return;
    }

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

    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to save your build", {
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      navigate('/auth/login');
      return;
    }

    try {
      setIsSaving(true);
      
      // Calculate total price
      const componentsPrice = Object.values(selectedComponents).reduce((total, component) => {
        if (Array.isArray(component)) {
          return total + component.reduce((subTotal, item) => {
            // Handle price parsing - remove currency symbols and convert to number
            const price = typeof item.price === 'string' 
              ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
              : parseFloat(item.price) || 0;
            return subTotal + price;
          }, 0);
        } else {
          // Handle price parsing - remove currency symbols and convert to number
          const price = typeof component.price === 'string' 
            ? parseFloat(component.price.replace(/[^0-9.]/g, '')) 
            : parseFloat(component.price) || 0;
          return total + price;
        }
      }, 0);

      // Prepare build data for saving to database
      const buildData = {
        name: buildName,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userAddress: user.address || '',
        userPhone: user.phone || '',
        image: selectedComponents.Case?.image || selectedComponents.case?.image || 
               selectedComponents.casing?.image || 
               (selectedComponents.Case?.imgUrls && selectedComponents.Case.imgUrls[0]?.url) ||
               (selectedComponents.case?.imgUrls && selectedComponents.case.imgUrls[0]?.url) ||
               (selectedComponents.casing?.imgUrls && selectedComponents.casing.imgUrls[0]?.url) || '',
        buildStatus: 'pending',
        published: false,
        components: Object.entries(selectedComponents).flatMap(([type, component]) => {
        if (Array.isArray(component)) {
          return component.map(item => ({
            componentId: item._id,
            quantity: 1
          }));
          } else {
        return [{
          componentId: component._id,
          quantity: 1
        }];
          }
        }),
        componentsPrice: componentsPrice,
        paymentMethod: '',
        deliveryMethod: '',
        serviceCharge: 0,
        deliveryCharge: 0,
        totalCharge: componentsPrice
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
              <div className="text-lg font-bold text-[#191B2A]">Component Price:</div>
              <div className="text-xl font-bold text-[#191B2A]">LKR {totalPrice.toFixed(2)}</div>
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
            <button
              onClick={async () => {
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

                  // Check if user is logged in
                  if (!user) {
                    toast.error("Please log in to continue with purchase", {
                      duration: 3000,
                      style: {
                        background: '#ff6b6b',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      },
                    });
                    navigate('/auth/login');
                    return;
                  }

                  // Get token for authentication
                  const token = localStorage.getItem("token");
                  if (!token) {
                    toast.error("Please log in to continue with purchase", {
                      duration: 3000,
                      style: {
                        background: '#ff6b6b',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      },
                    });
                    navigate('/auth/login');
                    return;
                  }

                  // Calculate total price
                  const componentsPrice = Object.values(selectedComponents).reduce((total, component) => {
                    if (Array.isArray(component)) {
                      return total + component.reduce((subTotal, item) => {
                        // Handle price parsing - remove currency symbols and convert to number
                        const price = typeof item.price === 'string' 
                          ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
                          : parseFloat(item.price) || 0;
                        return subTotal + price;
                      }, 0);
                    } else {
                      // Handle price parsing - remove currency symbols and convert to number
                      const price = typeof component.price === 'string' 
                        ? parseFloat(component.price.replace(/[^0-9.]/g, '')) 
                        : parseFloat(component.price) || 0;
                      return total + price;
                    }
                  }, 0);

                  // Prepare build data for saving to database
                  const buildDataForSaving = {
                    name: buildName,
                    userId: user._id,
                    userName: user.name,
                    userEmail: user.email,
                    userAddress: user.address || '',
                    userPhone: user.phone || '',
                    image: selectedComponents.Case?.image || selectedComponents.case?.image || 
                           selectedComponents.casing?.image || 
                           (selectedComponents.Case?.imgUrls && selectedComponents.Case.imgUrls[0]?.url) ||
                           (selectedComponents.case?.imgUrls && selectedComponents.case.imgUrls[0]?.url) ||
                           (selectedComponents.casing?.imgUrls && selectedComponents.casing.imgUrls[0]?.url) || '',
                    buildStatus: 'pending',
                    published: false,
                    components: Object.entries(selectedComponents).flatMap(([type, component]) => {
                      if (Array.isArray(component)) {
                        return component.map(item => ({
                          componentId: item._id,
                          quantity: 1
                        }));
                      } else {
                        return [{
                          componentId: component._id,
                          quantity: 1
                        }];
                      }
                    }),
                    componentsPrice: componentsPrice,
                    paymentMethod: '',
                    deliveryMethod: '',
                    serviceCharge: 0,
                    deliveryCharge: 0,
                    totalCharge: componentsPrice
                  };

                  console.log('Saving build data for continue purchase:', buildDataForSaving);

                  // Save build to database first
                  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/build/builds`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(buildDataForSaving),
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to save build');
                  }

                  const savedBuildResponse = await response.json();
                  console.log('Build saved successfully:', savedBuildResponse);

                  if (!savedBuildResponse.success || !savedBuildResponse.build || !savedBuildResponse.build._id) {
                    throw new Error('Invalid response from server');
                  }

                  const savedBuild = savedBuildResponse.build;

                  // Prepare build data for navigation with the saved _id
                  const buildDataForNavigation = {
                    ...buildDataForSaving,
                    _id: savedBuild._id, // Important: Include the _id from saved build
                    components: Object.entries(selectedComponents).flatMap(([type, component]) => {
                      if (Array.isArray(component)) {
                        return component.map(item => ({
                          _id: item._id,
                          name: item.name,
                          type: type.toLowerCase() === 'case' ? 'casing' : item.type || type.toLowerCase(),
                          manufacturer: item.manufacturer,
                          price: typeof item.price === 'string' 
                            ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
                            : parseFloat(item.price) || 0,
                          image: item.image || (item.imgUrls && item.imgUrls[0]?.url) || '',
                          imgUrls: item.imgUrls || [],
                          specifications: item.specifications || {}
                        }));
                      } else if (component) {
                        return [{
                          _id: component._id,
                          name: component.name,
                          type: type.toLowerCase() === 'case' ? 'casing' : component.type || type.toLowerCase(),
                          manufacturer: component.manufacturer,
                          price: typeof component.price === 'string' 
                            ? parseFloat(component.price.replace(/[^0-9.]/g, '')) 
                            : parseFloat(component.price) || 0,
                          image: component.image || (component.imgUrls && component.imgUrls[0]?.url) || '',
                          imgUrls: component.imgUrls || [],
                          specifications: component.specifications || {}
                        }];
                      }
                      return [];
                    })
                  };

                  // Show success message
                  toast.success("Build saved successfully! Proceeding to purchase...", {
                    duration: 2000,
                    style: {
                      background: '#a036b2',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    },
                  });

                  // Navigate to continue purchase with the saved build data (including _id)
                  navigate('/continuepurchase', { 
                    state: { 
                      buildData: buildDataForNavigation,
                      selectedComponents: Object.entries(selectedComponents).flatMap(([type, component]) => {
                        if (Array.isArray(component)) {
                          return component.map(item => ({
                            _id: item._id,
                            name: item.name,
                            type: type.toLowerCase() === 'case' ? 'casing' : item.type || type.toLowerCase(),
                            manufacturer: item.manufacturer,
                            price: typeof item.price === 'string' 
                              ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
                              : parseFloat(item.price) || 0,
                            image: item.image || (item.imgUrls && item.imgUrls[0]?.url) || '',
                            imgUrls: item.imgUrls || [],
                            specifications: item.specifications || {}
                          }));
                        } else if (component) {
                          return [{
                            _id: component._id,
                            name: component.name,
                            type: type.toLowerCase() === 'case' ? 'casing' : component.type || type.toLowerCase(),
                            manufacturer: component.manufacturer,
                            price: typeof component.price === 'string' 
                              ? parseFloat(component.price.replace(/[^0-9.]/g, '')) 
                              : parseFloat(component.price) || 0,
                            image: component.image || (component.imgUrls && component.imgUrls[0]?.url) || '',
                            imgUrls: component.imgUrls || [],
                            specifications: component.specifications || {}
                          }];
                        }
                        return [];
                      }),
                      totalPrice: componentsPrice
                    }
                  });

                  // Close the popup
                  onClose();

                } catch (error) {
                  console.error('Error saving build and continuing to purchase:', error);
                  toast.error(`Failed to save build: ${error.message}`, {
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
              }}
              className="px-6 py-2 bg-[#7315E5] text-white rounded-md hover:bg-[#5A0DB2] transition-colors disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? 'Saving & Preparing...' : 'Continue Purchase'}
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