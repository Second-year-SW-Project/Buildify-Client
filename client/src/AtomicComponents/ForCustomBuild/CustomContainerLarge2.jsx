import React from 'react';
import PropTypes from 'prop-types';
import CustomContainer from './CustomContainer';

const CustomContainerLarge2 = ({ heading, subheading, buttonText, imageUrl }) => {
  return (
    <div
      style={{
        width: '567px',
        height: '892px',
        borderRadius: '25px',
        background: 'linear-gradient(to top, #7B16AE 0%, #FFFFFF 100%)',
        opacity: '1',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      
      <img
        src={imageUrl}
        alt="Container Image"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '500px',
          objectFit: 'cover',
          marginBottom: '20px',
        }}
      />

      
      <div style={{ marginBottom: '20px' }}>
        <CustomContainer
          heading={heading}
          subheading={subheading}
          buttonText={buttonText}
        />
      </div>

      
    </div>
  );
};


CustomContainerLarge2.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CustomContainerLarge2;