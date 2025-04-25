import React from 'react';
import PropTypes from 'prop-types';
import BannerSmallContainer from './BannerSmallContainer';

const BannerLargeContainer2 = ({ heading, subheading, buttonText, imageUrl }) => {
  return (
    <div
      className="w-full sm:w-[35.4375rem] h-[55.75rem] rounded-[1.5625rem] bg-gradient-to-t from-[#7B16AE] to-white opacity-100 overflow-hidden flex flex-col items-center p-5 box-border"
    >
      <img
        src={imageUrl}
        alt="Container Image"
        className="w-full h-auto max-w-[31.25rem] object-cover mb-5"
      />
      <div className="mb-5 sm:ml-[7.5rem] sm:mt-[10rem]">
        <BannerSmallContainer
          heading={heading}
          subheading={subheading}
          buttonText={buttonText}
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
};

export default BannerLargeContainer2;