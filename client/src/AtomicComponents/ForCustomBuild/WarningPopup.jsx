import React from 'react';
import PropTypes from 'prop-types';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const WarningPopup = ({ onClose, messages, type = 'warning' }) => {
  // Define styles based on message type
  const typeStyles = {
    warning: {
      icon: <WarningIcon className="text-red-500" fontSize="large" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      title: 'Warning',
    },
    note: {
      icon: <InfoIcon className="text-orange-500" fontSize="large" />,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      title: 'Note',
    },
    disclaimer: {
      icon: <ErrorOutlineIcon className="text-blue-500" fontSize="large" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      title: 'Disclaimer',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className={`relative ${styles.bgColor} rounded-lg shadow-xl w-full max-w-3xl mx-4 p-6 border-2 ${styles.borderColor} max-h-[80vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-3">
            {styles.icon}
            <h2 className={`text-2xl font-bold ${styles.textColor}`}>
              {styles.title}
            </h2>
          </div>
        </div>
        
        {/* Content */}
        <div className={`flex-1 overflow-y-auto ${styles.textColor} space-y-4 pr-2`}>
          {messages.map((message, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="mt-1">•</span>
              <p className="text-lg leading-relaxed">{message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center border-t border-gray-200 pt-4">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-md ${styles.textColor} ${styles.bgColor} hover:opacity-90 transition-opacity font-medium`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

WarningPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf(['warning', 'note', 'disclaimer']),
};

export default WarningPopup;