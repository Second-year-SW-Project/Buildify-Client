import React from 'react';

const CustomButton = ({ text }) => {
  return (
    <button
      style={{
        width: '180.89px',
        height: '44px',
        opacity: '1',
        borderRadius: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.002)',
        border: '1px solid rgba(255, 255, 255, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0%',
          color: 'rgba(255, 255, 255, 1)',
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default CustomButton;