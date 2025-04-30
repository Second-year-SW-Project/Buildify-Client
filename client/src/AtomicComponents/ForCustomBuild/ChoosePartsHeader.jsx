import React from "react";

const ChoosePartsHeader = () => {
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
        Choose Your Parts
      </h1>
    </header>
  );
};

export default ChoosePartsHeader;