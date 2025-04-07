import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';

const CustomContainer = ({ heading, subheading, buttonText }) => {
  return (
    <div
      style={{
        width: '608px',
        height: '316px',
        opacity: '1',
        borderRadius: '0px',
        backgroundColor: 'transparent',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      
      <div>
        
        <h1
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '700',
            fontSize: '30px',
            lineHeight: '36px',
            letterSpacing: '-1.2px',
            color: 'rgba(255, 255, 255, 1)',
            marginBottom: '16px',
          }}
        >
          {heading}
        </h1>

        
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: 'rgba(255, 255, 255, 1)',
          }}
        >
          {subheading}
        </p>
      </div>

      
      <CustomButton text={buttonText} />
    </div>
  );
};


CustomContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CustomContainer;