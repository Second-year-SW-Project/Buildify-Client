import React, { useState, useCallback } from "react";
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import ChoosePartsHeader from "../../AtomicComponents/ForCustomBuild/ChoosePartsHeader";
import PartsTable from "../../AtomicComponents/ForCustomBuild/PartsTable";
import WarningMessage from "../../AtomicComponents/ForCustomBuild/WarningMessage";
import CompatibilityWarningBanner from "../../AtomicComponents/ForCustomBuild/CompatibilityWarningBanner";
import FinishButton from "../../AtomicComponents/ForCustomBuild/FinishButton";
import SelectedPartsSummaryPopup from "../../AtomicComponents/ForCustomBuild/SelectedPartsSummaryPopup";
import { checkCompatibility } from "../../utils/compatibilityChecker";
import { toast } from 'sonner';

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

  // State to control the summary popup visibility
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

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

    // Show the summary popup
    setShowSummaryPopup(true);
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
      </div>

      {/* Selected Parts Summary Popup */}
      {showSummaryPopup && (
        <SelectedPartsSummaryPopup
          onClose={() => setShowSummaryPopup(false)}
          selectedComponents={selectedComponents}
        />
      )}
    </div>
  );
};

export default ChooseParts;