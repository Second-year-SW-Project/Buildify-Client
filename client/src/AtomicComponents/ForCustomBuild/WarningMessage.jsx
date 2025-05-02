import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WarningPopup from './WarningPopup';

const WarningMessage = ({ messages }) => {
  const [activePopup, setActivePopup] = useState(null);//Tracks the type of popup that is currently open
  const prevMessagesRef = useRef([]);

  // Group messages by their type into an object
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.type]) {
      acc[message.type] = [];
    }
    acc[message.type].push(message.text);
    return acc;
  }, {});

  // Show warning popup automatically when new warnings are detected
  useEffect(() => {
    const currentWarnings = groupedMessages.warning || [];
    const prevWarnings = prevMessagesRef.current.filter(m => m.type === 'warning').map(m => m.text);
    
    // Check if there are new warnings
    const hasNewWarnings = currentWarnings.some(warning => !prevWarnings.includes(warning));
    
    if (hasNewWarnings && currentWarnings.length > 0) {
      setActivePopup('warning');
    }
    
    // Update previous messages
    prevMessagesRef.current = messages;
  }, [messages]);

  const handleSectionClick = (type) => {
    setActivePopup(type);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  // Define the styles for each message type
  const messageStyles = {
    warning: {
      label: 'Warnings:',
      color: '#D91E18',
      icon: '⚠️',
    },
    note: {
      label: 'Notes:',
      color: '#FF9400',
      icon: 'ℹ️',
    },
    disclaimer: {
      label: 'Disclaimers:',
      color: '#2C87C3',
      icon: 'ℹ️',
    },
  };

  return (
    <div>
      {/* Render popups for each message type */}
      {activePopup && groupedMessages[activePopup] && (
        <WarningPopup
          onClose={handleClosePopup}
          messages={groupedMessages[activePopup]}
          type={activePopup}
        />
      )}

      {/* Main WarningMessage content */}
      <div id="warning-message-section" className="border border-gray-300 rounded shadow-sm bg-white p-4 sm:p-6">
        {/* Heading */}
        <h2 className="font-roboto font-bold text-lg sm:text-xl leading-[27px] tracking-[0%] text-[#191B2A] mb-3 sm:mb-4">
          Potential Issues / Incompatibilities
        </h2>

        {/* Messages grouped by type */}
        <div className="space-y-4">
          {/* Warning messages */}
          {groupedMessages.warning && groupedMessages.warning.length > 0 && (
            <div className="space-y-2">
              <h3 
                className="font-roboto font-bold text-base text-[#D91E18] cursor-pointer hover:underline"
                onClick={() => handleSectionClick('warning')}
              >
                {messageStyles.warning.icon} Warnings:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {groupedMessages.warning.map((message, index) => (
                  <li key={index} className="text-[#D91E18]">{message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Note messages */}
          {groupedMessages.note && groupedMessages.note.length > 0 && (
            <div className="space-y-2">
              <h3 
                className="font-roboto font-bold text-base text-[#FF9400] cursor-pointer hover:underline"
                onClick={() => handleSectionClick('note')}
              >
                {messageStyles.note.icon} Notes:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {groupedMessages.note.map((message, index) => (
                  <li key={index} className="text-[#FF9400]">{message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer messages */}
          {groupedMessages.disclaimer && groupedMessages.disclaimer.length > 0 && (
            <div className="space-y-2">
              <h3 
                className="font-roboto font-bold text-base text-[#2C87C3] cursor-pointer hover:underline"
                onClick={() => handleSectionClick('disclaimer')}
              >
                {messageStyles.disclaimer.icon} Disclaimers:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {groupedMessages.disclaimer.map((message, index) => (
                  <li key={index} className="text-[#2C87C3]">{message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

WarningMessage.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['warning', 'note', 'disclaimer']).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WarningMessage;