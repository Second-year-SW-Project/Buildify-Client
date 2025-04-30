import React from 'react';
import PropTypes from 'prop-types';

const AddButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-1.5 rounded bg-[#AE47E2] p-0 pl-2.5 pr-2.5 h-7 border-none cursor-pointer box-border w-fit ${className}`}
    >
      {/* + Sign */}
      <span className="flex items-center justify-center w-4 h-4 text-base text-white shrink-0">
        +
      </span>

      {/* Text */}
      <span className="font-roboto font-bold text-xs leading-5 text-white text-left whitespace-nowrap">
        {text}
      </span>
    </button>
  );
};

// Prop validation
AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string, // Optional className prop
};

export default AddButton;