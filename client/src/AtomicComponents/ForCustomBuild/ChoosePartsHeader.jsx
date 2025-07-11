import React from "react";
import PropTypes from "prop-types";

const ChoosePartsHeader = ({ isEditMode = false }) => {
  return (
    <header
      className="w-full bg-[#4D0A6E] shadow-md flex items-center justify-center"
      style={{ 
        backgroundSize: "1440px 150px", 
        margin: 0,
        minHeight: "150px" // Ensure consistent height
      }}
    >
      <h1 className="font-roboto font-bold text-[40.88px] text-[#ffffff]">
        {isEditMode ? "Edit Your Build" : "Choose Your Parts"}
      </h1>
    </header>
  );
};

ChoosePartsHeader.propTypes = {
  isEditMode: PropTypes.bool,
};

export default ChoosePartsHeader;