import React from 'react';
import PropTypes from 'prop-types'; // For prop validation

const FinishButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick} // Pass the onClick prop to the button
      className="w-full max-w-[200px] h-[42px] rounded bg-[#AE47E2] opacity-100 flex items-center justify-center border-none cursor-pointer p-0 px-4 box-border"
    >
      {/* Text */}
      <span className="font-roboto font-bold text-sm leading-5 text-white whitespace-nowrap overflow-hidden text-ellipsis">
        {text} {/* Text passed as a prop */}
      </span>
    </button>
  );
};

// Prop validation
FinishButton.propTypes = {
  text: PropTypes.string.isRequired, // Required text prop
  onClick: PropTypes.func, // Optional onClick prop
};

export default FinishButton;