import React from 'react';
import PropTypes from 'prop-types';
import BannerSmallContainer from './BannerSmallContainer';

const BannerLargeContainer2 = ({ heading, subheading, buttonText, imageUrl, className, onClick }) => {
  return (
    <div
      className={`w-full h-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] rounded-[1.5625rem] bg-gradient-to-t from-[#7B16AE] to-white opacity-100 overflow-hidden flex flex-col items-center p-4 sm:p-6 box-border relative ${className}`}
    >
      <img
        src={imageUrl}
        alt="Container Image"
        className="w-full h-auto max-w-[20rem] sm:max-w-[25rem] md:max-w-[30rem] object-cover mb-4 sm:mb-6"
      />
      <div className="w-full sm:w-auto mb-4 sm:mb-6 sm:ml-[2rem] md:ml-[5rem] sm:mt-[1rem] md:mt-[2rem]">
        <BannerSmallContainer
          heading={heading}
          subheading={subheading}
          buttonText={buttonText}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

BannerLargeContainer2.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default BannerLargeContainer2;