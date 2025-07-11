import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import AddButton from './AddButton';
import ComponentSelectionPopup from './ComponentSelectionPopup';

const rows = [
  { component: 'CPU' },
  { component: 'CPU Cooler' },
  { component: 'Motherboard' },
  { component: 'Memory' },
  { component: 'Storage' },
  { component: 'Video Card' },
  { component: 'Case' },
  { component: 'Power Supply' },
  { component: 'Expansion Cards/Networking' },
];

// Map component attributes from backend snake_case to frontend camelCase
const mapComponentAttributes = (productData) => {
  if (!productData) return productData;

  // Create a comprehensive mapping from snake_case to camelCase
  const attributeMapping = {
    // Common attributes
    socket_type: 'socketType',
    form_factor: 'formFactor',
    
    // CPU attributes
    core_count: 'coreCount',
    thread_count: 'threadCount',
    base_clock: 'baseClock',
    boost_clock: 'boostClock',
    integrated_graphics: 'integratedGraphics',
    includes_cooler: 'includesCooler',
    graphics_model: 'graphicsModel',
    
    // Cooler attributes
    cooler_type: 'coolerType',
    supported_socket: 'supportedSocket',
    max_tdp: 'maxTdp',
    
    // Motherboard attributes
    motherboard_chipset: 'motherboardChipset',
    ram_slots: 'ramSlots',
    max_ram: 'maxRam',
    supported_memory_types: 'supportedMemoryTypes',
    pcie_slots: 'pcieSlots',
    storage_interfaces: 'storageInterfaces',
    
    // RAM attributes
    memory_type: 'memoryType',
    memory_speed: 'memorySpeed',
    memory_capacity: 'memoryCapacity',
    
    // Storage attributes
    storage_type: 'storageType',
    storage_capacity: 'storageCapacity',
    
    // GPU attributes
    interface_type: 'interfaceType',
    power_connectors: 'powerConnectors',
    gpu_chipset: 'gpuChipset',
    gpu_cores: 'gpuCores',
    
    // Case attributes
    supported_motherboard_sizes: 'supportedMotherboardSizes',
    max_gpu_length: 'maxGpuLength',
    max_cooler_height: 'maxCoolerHeight',
    
    // Power Supply attributes
    efficiency_rating: 'efficiencyRating',
    modular_type: 'modularType',
    
    // Common attributes
    img_urls: 'imgUrls'
  };

  // Create mapped object
  const mapped = { ...productData };
  
  // Apply attribute mapping
  Object.entries(attributeMapping).forEach(([snakeKey, camelKey]) => {
    if (productData[snakeKey] !== undefined) {
      mapped[camelKey] = productData[snakeKey];
    }
  });

  return mapped;
};

// Format price with LKR currency
const formatPrice = (price) => {
  if (!price && price !== 0) return '—';
  
  // If price is already formatted (contains 'LKR'), return as is
  if (typeof price === 'string' && price.includes('LKR')) {
    return price;
  }
  
  // Convert to number and format
  const numericPrice = typeof price === 'string' ? 
    parseFloat(price.replace(/[^0-9.]/g, '')) : 
    parseFloat(price);
    
  if (isNaN(numericPrice)) return '—';
  
  return `LKR ${numericPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

function PartsTable({ onComponentsChanged, initialComponents }) {
  const [selectedComponents, setSelectedComponents] = useState(() => {
    // If initial components are provided (edit mode), use them
    if (initialComponents && Object.keys(initialComponents).length > 0) {
      return initialComponents;
    }
    // Otherwise, initialize from localStorage if available
    const savedComponents = localStorage.getItem('selectedComponents');
    return savedComponents ? JSON.parse(savedComponents) : {};
  });
  const [showPopup, setShowPopup] = useState(false);
  const [currentComponentType, setCurrentComponentType] = useState(null);//Tracks the current component type

  // Update selectedComponents when initialComponents prop changes (for edit mode)
  useEffect(() => {
    if (initialComponents && Object.keys(initialComponents).length > 0) {
      setSelectedComponents(initialComponents);
    }
  }, [initialComponents]);

  // Save to localStorage whenever selectedComponents changes
  useEffect(() => {
    localStorage.setItem('selectedComponents', JSON.stringify(selectedComponents));
  }, [selectedComponents]);

  // Notify parent of component changes
  useEffect(() => {
    onComponentsChanged(selectedComponents);
  }, [selectedComponents, onComponentsChanged]);

  // Handle button click to show component selection popup
  const handleSelectComponent = (component) => {
    setCurrentComponentType(component);
    setShowPopup(true);
  };

  // Handle component selection from the popup
  const handleComponentSelected = (componentType, selectedData) => {
    const key = typeof componentType === 'object' ? componentType.componentType : componentType;
    //Extract the key from the component type
    
    // Map attributes from snake_case to camelCase for compatibility checking
    const mappedOriginalData = mapComponentAttributes(selectedData.originalData);
    
    // Special handling for RAM and Storage to allow multiple modules
    if (key === 'Memory' || key === 'Storage') {
      setSelectedComponents((prev) => {
        const existingComponents = prev[key] || [];
        const newComponent = {
          // Include all the mapped product data for compatibility checking
          ...mappedOriginalData,
          name: selectedData.name,
          image: selectedData.image,
          availability: selectedData.availability,
          price: selectedData.price,
          tdp: selectedData.tdp
        };
        
        // If it's the first component, create an array
        if (!Array.isArray(existingComponents)) {
          return {
            ...prev,
            [key]: [newComponent]
          };
        }
        
        // Add to existing array
        return {
          ...prev,
          [key]: [...existingComponents, newComponent]
        };
      });
    } else {
      // Normal handling for other components
      setSelectedComponents((prev) => ({
        ...prev,
        [key]: {
          // Include all the mapped product data for compatibility checking
          ...mappedOriginalData,
          name: selectedData.name,
          image: selectedData.image,
          availability: selectedData.availability,
          price: selectedData.price,
          tdp: selectedData.tdp
        },
      }));
    }
  };

  // Handle click on the 9th row's clickable texts
  const handleClickableTextClick = ({ type, componentType }) => {
    console.log('handleClickableTextClick:', { type, componentType });
    setCurrentComponentType({ type, componentType });
    setShowPopup(true);
  };

  // Handle removing a component
  const handleRemoveComponent = (componentKey, index = null) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };
      
      // Special handling for RAM and Storage to remove specific module
      if ((componentKey === 'Memory' || componentKey === 'Storage') && index !== null) {
        const existingComponents = newComponents[componentKey];
        if (Array.isArray(existingComponents)) {
          existingComponents.splice(index, 1);
          if (existingComponents.length === 0) {
            delete newComponents[componentKey];
          } else {
            newComponents[componentKey] = existingComponents;
          }
        }
      } else {
        delete newComponents[componentKey];
      }
      
      return newComponents;
    });
  };

  // Expansion network component types
  const expansionNetworkTypes = [
    { display: 'Sound Cards', componentType: 'sound_card' },
    { display: 'Wired Network Adapters', componentType: 'wired_network_adapter' },
    { display: 'Wireless Network Adapters', componentType: 'wireless_network_adapter' },
  ];

  //Render the table
  return (
    <>
      <div className="overflow-x-auto shadow-md opacity-100 rounded-none bg-white">
        <table className="min-w-full bg-white">
          <thead className="bg-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Component
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-2/5">
                Selection
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Availability
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const isNinthRow = index === 8; // Check if it's the 9th row (index 8)
              const selectedData = selectedComponents[row.component];

              return (
                <tr key={row.component} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A] align-top">
                    {row.component}
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A] align-top">
                    {!isNinthRow ? (
                      selectedData ? (
                        row.component === 'Memory' || row.component === 'Storage' ? (
                          <div className="space-y-2">
                            {Array.isArray(selectedData) ? (
                              selectedData.map((component, idx) => (
                                <div key={idx} className="flex items-center h-[38px]">
                                  <img
                                    src={component.image}
                                    alt={component.name}
                                    className="w-[38px] h-[38px] mr-2 flex-shrink-0"
                                  />
                                  <span className="break-words whitespace-normal">
                                    {component.name}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center h-[38px]">
                                <img
                                  src={selectedData.image}
                                  alt={selectedData.name}
                                  className="w-[38px] h-[38px] mr-2 flex-shrink-0"
                                />
                                <span className="break-words whitespace-normal">
                                  {selectedData.name}
                                </span>
                              </div>
                            )}
                            <div className="h-[38px] flex items-center">
                              <AddButton
                                text={`Add More ${row.component}`}
                                onClick={() => handleSelectComponent(row.component)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center h-[38px]">
                            <img
                              src={selectedData.image}
                              alt={selectedData.name}
                              className="w-[38px] h-[38px] mr-2 flex-shrink-0"
                            />
                            <span className="break-words whitespace-normal">
                              {selectedData.name}
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="h-[38px] flex items-center">
                          <AddButton
                            text={`Choose ${row.component}`}
                            onClick={() => handleSelectComponent(row.component)}
                          />
                        </div>
                      )
                    ) : (
                      <div className="space-y-2">
                        {expansionNetworkTypes.map(({ display, componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType} className="flex items-center h-[38px]">
                              <img
                                src={selectedComponents[componentType].image}
                                alt={selectedComponents[componentType].name}
                                className="w-[38px] h-[38px] mr-2 flex-shrink-0"
                              />
                              <span className="break-words whitespace-normal">
                                {selectedComponents[componentType].name}
                              </span>
                            </div>
                          ) : (
                            <div
                              key={componentType}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer h-[38px] flex items-center"
                              onClick={() => handleClickableTextClick({ type: display, componentType })}
                            >
                              {display}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A] align-top">
                    {!isNinthRow ? (
                      selectedData ? (
                        row.component === 'Memory' || row.component === 'Storage' ? (
                          <div className="space-y-2">
                            {Array.isArray(selectedData) ? (
                              selectedData.map((component, idx) => (
                                <div key={idx} className="h-[38px] flex items-center">
                                  {component.availability}
                                </div>
                              ))
                            ) : (
                              <div className="h-[38px] flex items-center">
                                {selectedData.availability}
                              </div>
                            )}
                            <div className="h-[38px] flex items-center">
                              {/* Empty space to align with Add More button */}
                            </div>
                          </div>
                        ) : (
                          <div className="h-[38px] flex items-center">
                            {selectedData.availability}
                          </div>
                        )
                      ) : (
                        <div className="h-[38px] flex items-center">—</div>
                      )
                    ) : (
                      <div className="space-y-2">
                        {expansionNetworkTypes.map(({ componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType} className="h-[38px] flex items-center">
                              {selectedComponents[componentType].availability}
                            </div>
                          ) : (
                            <div key={componentType} className="h-[38px] flex items-center">—</div>
                          )
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A] align-top">
                    {!isNinthRow ? (
                      selectedData ? (
                        row.component === 'Memory' || row.component === 'Storage' ? (
                          <div className="space-y-2">
                            {Array.isArray(selectedData) ? (
                              selectedData.map((component, idx) => (
                                <div key={idx} className="h-[38px] flex items-center">
                                  {formatPrice(component.price)}
                                </div>
                              ))
                            ) : (
                              <div className="h-[38px] flex items-center">
                                {formatPrice(selectedData.price)}
                              </div>
                            )}
                            <div className="h-[38px] flex items-center">
                              {/* Empty space to align with Add More button */}
                            </div>
                          </div>
                        ) : (
                          <div className="h-[38px] flex items-center">
                            {formatPrice(selectedData.price)}
                          </div>
                        )
                      ) : (
                        <div className="h-[38px] flex items-center">—</div>
                      )
                    ) : (
                      <div className="space-y-2">
                        {expansionNetworkTypes.map(({ componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType} className="h-[38px] flex items-center">
                              {formatPrice(selectedComponents[componentType].price)}
                            </div>
                          ) : (
                            <div key={componentType} className="h-[38px] flex items-center">—</div>
                          )
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A] align-top">
                    {!isNinthRow ? (
                      selectedData ? (
                        row.component === 'Memory' || row.component === 'Storage' ? (
                          <div className="space-y-2">
                            {Array.isArray(selectedData) ? (
                              selectedData.map((component, idx) => (
                                <div key={idx} className="h-[38px] flex items-center">
                                  <button
                                    onClick={() => handleRemoveComponent(row.component, idx)}
                                    className="text-gray-500 hover:text-red-700 focus:outline-none"
                                  >
                                    <ClearIcon className="w-5 h-5" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="h-[38px] flex items-center">
                                <button
                                  onClick={() => handleRemoveComponent(row.component)}
                                  className="text-gray-500 hover:text-red-700 focus:outline-none"
                                >
                                  <ClearIcon className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                            <div className="h-[38px] flex items-center">
                              {/* Empty space to align with Add More button */}
                            </div>
                          </div>
                        ) : (
                          <div className="h-[38px] flex items-center">
                            <button
                              onClick={() => handleRemoveComponent(row.component)}
                              className="text-gray-500 hover:text-red-700 focus:outline-none"
                            >
                              <ClearIcon className="w-5 h-5" />
                            </button>
                          </div>
                        )
                      ) : (
                        <div className="h-[38px]"></div>
                      )
                    ) : (
                      <div className="space-y-2">
                        {expansionNetworkTypes.map(({ componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType} className="h-[38px] flex items-center">
                              <button
                                onClick={() => handleRemoveComponent(componentType)}
                                className="text-gray-500 hover:text-red-700 focus:outline-none"
                              >
                                <ClearIcon className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <div key={componentType} className="h-[38px] flex items-center">
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Component Selection Popup */}
      {showPopup && (
        <ComponentSelectionPopup
          onClose={() => setShowPopup(false)}
          onComponentSelected={(selectedData) => {
            handleComponentSelected(currentComponentType, selectedData);
            setShowPopup(false);
          }}
          componentType={currentComponentType}
        />
      )}
    </>
  );
}

PartsTable.propTypes = {
  onComponentsChanged: PropTypes.func.isRequired,
  initialComponents: PropTypes.object,
};

export default PartsTable;