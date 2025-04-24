import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';

const WarningPopup = ({ onClose, messages }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-4 sm:p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-800 hover:text-purple-900"
          aria-label="Close"
        >
          <ClearIcon fontSize="large" />
        </button>
       
        {/* Header */}
        <div className="pt-8 sm:pt-10">
          <h2 className="text-center text-red-600 font-bold text-2xl sm:text-3xl mb-6 sm:mb-8">
            Critical Issues / Incompatibilities Detected!
          </h2>
         
          {/* Warning content */}
          <div className="flex flex-col sm:flex-row items-start mb-6 pb-6 px-4 sm:px-6">
            {/* Label */}
            <div className="min-w-[100px] mb-4 sm:mb-0">
              <span className="font-bold text-red-600 text-xl">Warning:</span>
            </div>
            {/* Messages */}
            <div className="text-gray-800 text-lg sm:text-xl">
              {messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop types validation
WarningPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WarningPopup;