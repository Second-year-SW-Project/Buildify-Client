import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WarningPopup from './WarningPopup';

const WarningMessage = ({ messages }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Group messages by their type
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.type]) {
      acc[message.type] = [];
    }
    acc[message.type].push(message.text);
    return acc;
  }, {});

  // Check if there are any "warning" messages
  const hasWarnings = groupedMessages.warning && groupedMessages.warning.length > 0;

  // Automatically show the popup if there are warnings
  useEffect(() => {
    if (hasWarnings) {
      setShowPopup(true);
    }
  }, [hasWarnings]);

  // Define the styles for each message type
  const messageStyles = {
    warning: {
      label: 'Warning:',
      color: '#D91E18',
    },
    note: {
      label: 'Note:',
      color: '#FF9400',
    },
    disclaimer: {
      label: 'Disclaimer:',
      color: '#2C87C3',
    },
  };

  return (
    <div>
      {/* Render the WarningPopup if there are warnings */}
      {hasWarnings && showPopup && (
        <WarningPopup
          onClose={() => setShowPopup(false)}
          messages={groupedMessages.warning}
        />
      )}

      {/* Main WarningMessage content */}
      <div className="border border-gray-300 rounded shadow-sm bg-white p-4 sm:p-6">
        {/* Heading */}
        <h2 className="font-roboto font-bold text-lg sm:text-xl leading-[27px] tracking-[0%] text-[#191B2A] mb-3 sm:mb-4">
          Potential Issues / Incompatibilities
        </h2>

        {/* Messages */}
        <div className="space-y-2 sm:space-y-3">
          {Object.entries(groupedMessages).map(([type, texts]) => (
            <div key={type} className="flex flex-col sm:flex-row items-baseline">
              {/* Label */}
              <div className="mr-2 min-w-[80px] mb-1 sm:mb-0">
                <span
                  className="font-roboto font-bold text-base sm:text-lg leading-[24px]"
                  style={{ color: messageStyles[type].color }}
                >
                  {messageStyles[type].label}
                </span>
              </div>
              {/* Messages */}
              <div className="font-roboto text-sm sm:text-base leading-[21px] tracking-[0%] text-[#191B2A]">
                {texts.map((text, index) => (
                  <div key={index}>{text}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Prop types validation
WarningMessage.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['warning', 'note', 'disclaimer']).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WarningMessage;