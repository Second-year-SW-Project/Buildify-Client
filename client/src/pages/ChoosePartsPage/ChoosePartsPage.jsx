import React, { useState, useCallback } from "react";
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import ChoosePartsHeader from "../../AtomicComponents/ForCustomBuild/ChoosePartsHeader";
import PartsTable from "../../AtomicComponents/ForCustomBuild/PartsTable";
import WarningMessage from "../../AtomicComponents/ForCustomBuild/WarningMessage";
import CompatibilityWarningBanner from "../../AtomicComponents/ForCustomBuild/CompatibilityWarningBanner";
import FinishButton from "../../AtomicComponents/ForCustomBuild/FinishButton";
import { checkCompatibility } from "../../utils/compatibilityChecker";

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

  // Listen for changes in the PartsTable component
  const handleComponentsChanged = useCallback((components) => {
    const compatibilityResult = checkCompatibility(components);
    setMessages(compatibilityResult.messages);
    setTotalTDP(compatibilityResult.totalTDP);
    setHasCompatibilityIssues(compatibilityResult.hasCompatibilityIssues);
  }, []);  // Empty dependency array means this function reference won't change

  // Function to handle "Finish & Add to Quote" button click
  const handleFinishAndAddToQuote = () => {
    console.log("Finish & Add to Quote clicked");
    // Add your logic here, e.g., save to database or redirect
  };

  // Function to handle "Finish & Save Draft" button click
  const handleFinishAndSaveDraft = () => {
    console.log("Finish & Save Draft clicked");
    // Add your logic here, e.g., save to local storage or database
  };

  return (
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
            {/* Finish & Save Draft Button */}
            <FinishButton
              text="Finish & Save Draft"
              onClick={handleFinishAndSaveDraft}
            />
            {/* Finish & Add to Quote Button */}
            <FinishButton
              text="Finish & Add to Quote"
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
  );
};

export default ChooseParts;