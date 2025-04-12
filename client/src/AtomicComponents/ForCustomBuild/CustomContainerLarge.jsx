import React from 'react';
import PropTypes from 'prop-types';
import CustomContainer from './CustomContainer';

const CustomContainerLarge = ({ heading, subheading, buttonText, imageUrl }) => {
  return (
    <div
      style={{
        width: '1180px',
        height: '556px',
        borderRadius: '6px',
        background: 'linear-gradient(to right, #971F12 0%, #FFFFFF 100%)',
        opacity: '1',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '146px',
        boxSizing: 'border-box',
      }}
    >
      
      <div style={{ flex: 1, marginRight: '40px' }}>
        <CustomContainer
          heading={heading}
          subheading={subheading}
          buttonText={buttonText}
        />
      </div>

      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <img
          src={imageUrl}
          alt="Container Image"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};


CustomContainerLarge.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CustomContainerLarge;