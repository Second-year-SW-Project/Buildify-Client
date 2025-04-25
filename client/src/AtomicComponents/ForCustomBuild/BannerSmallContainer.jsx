import React from 'react';
import PropTypes from 'prop-types';
import BannerButton from './BannerButton';

const BannerSmallContainer = ({ heading, subheading, buttonText, onClick }) => {
  return (
    <div className="w-full h-auto min-h-[15rem] sm:min-h-[17rem] md:min-h-[19.75rem] bg-transparent p-4 sm:p-6 flex flex-col justify-between text-left">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="font-roboto font-bold text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 md:leading-9 tracking-tight text-white">
          {heading}
        </h1>
        <p className="font-roboto font-medium text-sm sm:text-base leading-6 sm:leading-7 text-white max-w-[20rem] sm:max-w-[25rem] md:max-w-[30rem]">
          {subheading}
        </p>
      </div>
      <div className="mt-8 sm:mt-12 flex justify-start">
        <BannerButton text={buttonText} onClick={onClick} />
      </div>
    </div>
  );
};

BannerSmallContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BannerSmallContainer;