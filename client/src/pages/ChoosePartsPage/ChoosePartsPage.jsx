import React, { useState, useCallback, useEffect } from "react";
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import ChoosePartsHeader from "../../AtomicComponents/ForCustomBuild/ChoosePartsHeader";
import PartsTable from "../../AtomicComponents/ForCustomBuild/PartsTable";
import WarningMessage from "../../AtomicComponents/ForCustomBuild/WarningMessage";
import CompatibilityWarningBanner from "../../AtomicComponents/ForCustomBuild/CompatibilityWarningBanner";
import FinishButton from "../../AtomicComponents/ForCustomBuild/FinishButton";
import BuildConfirmationPopup from "../../AtomicComponents/ForCustomBuild/BuildConfirmationPopup";
import { checkCompatibility } from "../../utils/compatibilityChecker";
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const ChooseParts = () => {
  // State for warnings/messages
  const [messages, setMessages] = useState([]);//Holds the messages

  // State for total TDP
  const [totalTDP, setTotalTDP] = useState("0W");//Holds the total TDP

  // State to track compatibility issues
  const [hasCompatibilityIssues, setHasCompatibilityIssues] = useState(false);//Flage to check if there are compatibility issues

  // State to track selected components
  const [selectedComponents, setSelectedComponents] = useState({});

  // State for confirmation popup
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBuild, setEditingBuild] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're in edit mode and load build data
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const editParam = urlParams.get('edit');
    
    if (editParam === 'true') {
      const storedBuild = localStorage.getItem('editingBuild');
      if (storedBuild) {
        try {
          const buildData = JSON.parse(storedBuild);
          setIsEditMode(true);
          setEditingBuild(buildData);
          
          // Convert build components to the format expected by PartsTable
          const componentsForTable = {};
          
          if (buildData.components && Array.isArray(buildData.components)) {
            // Group components by type first
            const componentsByType = {};
            
            buildData.components.forEach(component => {
              const componentType = mapComponentType(component.type);
              if (componentType) {
                if (!componentsByType[componentType]) {
                  componentsByType[componentType] = [];
                }
                componentsByType[componentType].push({
                  name: component.name,
                  type: component.type,
                  componentId: component.componentId,
                  quantity: component.quantity || 1,
                  image: '', // Will be populated when product details are fetched
                  price: 0,
                  availability: 'Unknown',
                  tdp: 0
                });
              }
            });
            
            // Process grouped components
            Object.entries(componentsByType).forEach(([componentType, components]) => {
              if (componentType === 'Memory' || componentType === 'Storage') {
                // Keep as array for multiple components
                componentsForTable[componentType] = components;
              } else {
                // Use the first (and should be only) component for single-component types
                componentsForTable[componentType] = components[0];
              }
            });
          }
          
          // Fetch complete product details for each component
          fetchProductDetailsForComponents(componentsForTable);
          
        } catch (error) {
          console.error('Error loading build data for editing:', error);
          toast.error('Failed to load build data for editing', {
            duration: 3000,
            style: {
              background: '#ff6b6b',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          });
        }
      }
    }
  }, [location]);

  // Map component types from backend to frontend format
  const mapComponentType = (backendType) => {
    const typeMap = {
      'processor': 'CPU',
      'cooling': 'CPU Cooler',
      'motherboard': 'Motherboard',
      'ram': 'Memory',
      'storage': 'Storage',
      'gpu': 'Video Card',
      'casing': 'Case',
      'power': 'Power Supply',
      'expansion_network': 'Expansion Cards/Networking'
    };
    return typeMap[backendType] || null;
  };

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

  // Fetch complete product details for components
  const fetchProductDetailsForComponents = async (componentsForTable) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const updatedComponents = {};
      
      for (const [componentType, components] of Object.entries(componentsForTable)) {
        if (Array.isArray(components)) {
          // Handle arrays (Memory/Storage)
          const updatedArray = await Promise.all(
            components.map(async (component) => {
              try {
                const response = await axios.get(`${backendUrl}/api/product/${component.componentId}`);
                if (response.data.Success) {
                  const productData = response.data;
                  const mappedData = mapComponentAttributes(productData);
                  
                  return {
                    ...component,
                    name: mappedData.name,
                    image: mappedData.imgUrls?.[0]?.url || mappedData.image || '',
                    price: mappedData.price || 0,
                    availability: mappedData.quantity > 0 ? 'In Stock' : 'Out of Stock',
                    tdp: mappedData.tdp || 0,
                    // Include all the mapped product data for compatibility checking
                    ...mappedData,
                    originalData: mappedData
                  };
                }
                return component;
              } catch (error) {
                console.error(`Error fetching product ${component.componentId}:`, error);
                return component;
              }
            })
          );
          updatedComponents[componentType] = updatedArray;
        } else {
          // Handle single components
          try {
            const response = await axios.get(`${backendUrl}/api/product/${components.componentId}`);
            if (response.data.Success) {
              const productData = response.data;
              const mappedData = mapComponentAttributes(productData);
              
              updatedComponents[componentType] = {
                ...components,
                name: mappedData.name,
                image: mappedData.imgUrls?.[0]?.url || mappedData.image || '',
                price: mappedData.price || 0,
                availability: mappedData.quantity > 0 ? 'In Stock' : 'Out of Stock',
                tdp: mappedData.tdp || 0,
                // Include all the mapped product data for compatibility checking
                ...mappedData,
                originalData: mappedData
              };
            } else {
              updatedComponents[componentType] = components;
            }
          } catch (error) {
            console.error(`Error fetching product ${components.componentId}:`, error);
            updatedComponents[componentType] = components;
          }
        }
      }
      
      setSelectedComponents(updatedComponents);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Listen for changes in the PartsTable component
  const handleComponentsChanged = useCallback((components) => {
    setSelectedComponents(components);
    const compatibilityResult = checkCompatibility(components);//Update the compatibility result
    setMessages(compatibilityResult.messages);
    setTotalTDP(compatibilityResult.totalTDP);
    setHasCompatibilityIssues(compatibilityResult.hasCompatibilityIssues);
  }, []);  // Empty dependency array means this function reference won't change

  // Function to handle "Finish" button click
  const handleFinishAndAddToQuote = () => {
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
      return;
    }

    // Check for out of stock items
    const outOfStockItems = [];
    Object.entries(selectedComponents).forEach(([type, component]) => {
      if (Array.isArray(component)) {
        component.forEach(item => {
          if (item.availability?.toLowerCase().includes('out of stock')) {
            outOfStockItems.push(`${item.name} (${type})`);
          }
        });
      } else if (component.availability?.toLowerCase().includes('out of stock')) {
        outOfStockItems.push(`${component.name} (${type})`);
      }
    });

    if (outOfStockItems.length > 0) {
      toast.error(`Cannot save build: The following items are out of stock: ${outOfStockItems.join(', ')}`, {
        duration: 5000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      return;
    }

    // Check for warning messages
    const hasWarnings = messages.some(message => 
      message.type?.toLowerCase() === 'warning' || 
      message.level?.toLowerCase() === 'warning'
    );

    if (hasWarnings) {
      toast.error("Cannot save build: There are compatibility warnings that need to be resolved", {
        duration: 4000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      return;
    }

    // Required components (excluding expansion cards/networking)
    const requiredComponents = [
      'CPU',
      'CPU Cooler',
      'Motherboard',
      'Memory',
      'Storage',
      'Video Card',
      'Case',
      'Power Supply'
    ];

    // Check if all required components are selected
    const missingComponents = requiredComponents.filter(
      component => !selectedComponents[component]
    );

    if (missingComponents.length > 0) {
      toast.error(`Please select the following required components: ${missingComponents.join(', ')}`, {
        duration: 4000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      return;
    }

    // Show confirmation popup
    setShowConfirmationPopup(true);
  };

  // Function to handle build confirmation
  const handleBuildConfirm = async (buildData) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error('Please login to save your build');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      let response;

      if (isEditMode && editingBuild) {
        // Update existing build
        response = await axios.put(`${backendUrl}/api/build/builds/${editingBuild._id}`, buildData, { headers });
      } else {
        // Create new build
        response = await axios.post(`${backendUrl}/api/build/builds`, buildData, { headers });
      }

      if (response.data.success) {
        const successMessage = isEditMode ? "Build updated successfully!" : "Build saved successfully!";
        toast.success(successMessage, {
          duration: 3000,
          style: {
            background: '#a036b2',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        setShowConfirmationPopup(false);
        
        // Clean up edit mode data and redirect to saved builds
        if (isEditMode) {
          localStorage.removeItem('editingBuild');
          navigate('/user/savedBuilds');
        }
      } else {
        throw new Error(response.data.message || `Failed to ${isEditMode ? 'update' : 'save'} build`);
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'saving'} build:`, error);
      console.error("Error response:", error.response?.data);
      
      // Handle authentication errors specifically
      if (error.response?.status === 401 || error.message.includes('login')) {
        toast.error('Please login to save your build', {
          duration: 5000,
          style: {
            background: '#ff6b6b',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        return;
      }
      
      const errorMessage = error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'save'} build. Please try again.`;
      toast.error(errorMessage, {
        duration: 5000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content */}
        <div className="flex-grow bg-gray-100">
          {/* Header */}
          <ChoosePartsHeader isEditMode={isEditMode} />

          {/* Compatibility Warning Banner */}
          <CompatibilityWarningBanner
            warningText="Warning! These parts have potential issues or incompatibilities. See details below."
            tdp={totalTDP}
            error={hasCompatibilityIssues}
          />

          {/* Add vertical spacing between CompatibilityWarningBanner and PartsTable */}
          <div className="h-40"></div>

          {/* Main Content */}
          <div className="container mx-auto px-4 flex flex-col">
            {/* Parts Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <PartsTable 
                onComponentsChanged={handleComponentsChanged} 
                initialComponents={isEditMode ? selectedComponents : null}
              />
            </div>

            {/* Buttons Section - Center aligned */}
            <div className="flex justify-center gap-4 mb-36">
              {/* Finish Button */}
              <FinishButton
                text="Continue"
                onClick={handleFinishAndAddToQuote}
              />
            </div>

            {/* Warning Messages - At the bottom */}
            <div className="mb-8">
              <WarningMessage messages={messages} />
            </div>
          </div>
        </div>

        {/* Footer at the bottom */}
        <Footer />

        {/* Build Confirmation Popup */}
        {showConfirmationPopup && (
          <BuildConfirmationPopup
            open={showConfirmationPopup}
            onClose={() => setShowConfirmationPopup(false)}
            selectedComponents={selectedComponents}
            onConfirm={handleBuildConfirm}
            isEditMode={isEditMode}
            existingBuildName={isEditMode && editingBuild ? editingBuild.name : ''}
            totalPrice={Object.values(selectedComponents).reduce((sum, component) => {
              if (Array.isArray(component)) {
                return sum + component.reduce((subSum, item) => {
                  const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || '0');
                  return subSum + price;
                }, 0);
              }
              const price = parseFloat(component.price?.toString().replace(/[^0-9.]/g, '') || '0');
              return sum + price;
            }, 0)}
          />
        )}
      </div>
    </div>
  );
};

export default ChooseParts;