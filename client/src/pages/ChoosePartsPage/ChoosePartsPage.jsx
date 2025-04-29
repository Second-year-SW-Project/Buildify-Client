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

const ChooseParts = () => {
  // State for warnings/messages
  const [messages, setMessages] = useState([
    { type: "note", text: "Choose components that are compatible with each other." },
    { type: "disclaimer", text: "Prices are subject to change based on availability." },
  ]);

  // State for total TDP
  const [totalTDP, setTotalTDP] = useState("0W");

  // State to track compatibility issues
  const [hasCompatibilityIssues, setHasCompatibilityIssues] = useState(false);

  // State to track selected components
  const [selectedComponents, setSelectedComponents] = useState({});

  // State for confirmation popup
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  // Listen for changes in the PartsTable component
  const handleComponentsChanged = useCallback((components) => {
    setSelectedComponents(components);
    const compatibilityResult = checkCompatibility(components);
    setMessages(compatibilityResult.messages);
    setTotalTDP(compatibilityResult.totalTDP);
    setHasCompatibilityIssues(compatibilityResult.hasCompatibilityIssues);
  }, []);  // Empty dependency array means this function reference won't change

  // Function to handle "Finish" button click
  const handleFinishAndAddToQuote = () => {
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
  const handleBuildConfirm = async (buildName) => {
    try {
      // Calculate total price
      const totalPrice = Object.values(selectedComponents).reduce((sum, component) => {
        if (Array.isArray(component)) {
          return sum + component.reduce((subSum, item) => {
            const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || '0');
            return subSum + price;
          }, 0);
        }
        const price = parseFloat(component.price?.toString().replace(/[^0-9.]/g, '') || '0');
        return sum + price;
      }, 0);

      // Prepare components array
      const components = Object.entries(selectedComponents).map(([type, component]) => {
        if (Array.isArray(component)) {
          return component.map(item => ({
            componentName: item.name,
            type: type,
            quantity: 1,
            price: parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || '0'),
            image: item.image,
            _id: item._id
          }));
        }
        return [{
          componentName: component.name,
          type: type,
          quantity: 1,
          price: parseFloat(component.price?.toString().replace(/[^0-9.]/g, '') || '0'),
          image: component.image,
          _id: component._id
        }];
      }).flat();

      // Prepare build data
      const buildData = {
        name: buildName,
        type: "custom",
        image: selectedComponents.Case.image,
        components: components,
        totalPrice: totalPrice
      };

      // Save build to database
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/build/builds`, buildData);

      if (response.data.success) {
        toast.success("Build saved successfully!");
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