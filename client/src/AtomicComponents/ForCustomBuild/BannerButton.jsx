import React from 'react';
import PropTypes from 'prop-types'; // For prop validation

const BannerButton = ({ text }) => {
  return (
    <button
      className="w-[180.89px] h-[44px] opacity-100 rounded-lg bg-white/0.002 border border-white flex items-center justify-center"
    >
      <span
        className="font-roboto font-medium text-base leading-6 text-white"
      >
        {text} {/* Text passed as a prop */}
      </span>
    </button>
  );
};

// Prop validation
BannerButton.propTypes = {
  text: PropTypes.string.isRequired, // Required text prop
};

export default BannerButton;