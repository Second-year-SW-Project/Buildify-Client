import React from 'react';
import PropTypes from 'prop-types';

const AddButton = ({ text, onClick, width }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-1.5 rounded bg-[#AE47E2] p-0 pl-2.5 pr-2.5 h-7 border-none cursor-pointer box-border ${
        width ? `w-[${width}]` : 'w-auto'
      } min-w-[100px]`}
    >
      {/* + Sign */}
      <span className="flex items-center justify-center w-4 h-4 text-base text-white shrink-0">
        +
      </span>

      {/* Text */}
      <span className="font-roboto font-bold text-xs leading-5 text-white text-left whitespace-nowrap overflow-hidden text-ellipsis flex-grow">
        {text}
      </span>
    </button>
  );
};

// Prop validation
AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string, // Optional width prop
};

export default AddButton;