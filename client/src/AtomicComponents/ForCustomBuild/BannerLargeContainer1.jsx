import React from 'react';
import PropTypes from 'prop-types';
import BannerSmallContainer from './BannerSmallContainer';

const BannerLargeContainer1 = ({ heading, subheading, buttonText, imageUrl }) => {
  return (
    <div
      className="w-full sm:w-[73.75rem] h-[34.75rem] rounded-lg bg-gradient-to-r from-[#7B16AE] to-white opacity-100 overflow-hidden flex flex-col sm:flex-row items-center p-5 sm:pl-[9.125rem] box-border"
    >
      <div className="flex-1 sm:mr-10">
        <BannerSmallContainer
          heading={heading}
          subheading={subheading}
          buttonText={buttonText}
        />
      </div>
      <div className="flex-1 flex justify-end">
        <img
          src={imageUrl}
          alt="Container Image"
          className="w-full h-auto max-w-[31.25rem] object-cover"
        />
      </div>
    </div>
  );
};

BannerLargeContainer1.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default BannerLargeContainer1;