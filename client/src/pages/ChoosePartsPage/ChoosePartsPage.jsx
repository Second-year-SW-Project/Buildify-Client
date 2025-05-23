import React, { useState, useCallback } from "react";
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

  const user = useSelector((state) => state.auth.user);

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
      // Save build to database
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/build/builds`, buildData);

      if (response.data.success) {
        toast.success("Build saved successfully!", {
          duration: 3000,
          style: {
            background: '#a036b2',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        setShowConfirmationPopup(false);
      } else {
        throw new Error(response.data.message || "Failed to save build");
      }
    } catch (error) {
      console.error("Error saving build:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || "Failed to save build. Please try again.";
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
          <ChoosePartsHeader />

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
              <PartsTable onComponentsChanged={handleComponentsChanged} />
            </div>

            {/* Buttons Section - Center aligned */}
            <div className="flex justify-center gap-4 mb-36">
              {/* Finish Button */}
              <FinishButton
                text="Finish"
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