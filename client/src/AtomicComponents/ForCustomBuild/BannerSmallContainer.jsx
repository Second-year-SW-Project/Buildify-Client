import React from 'react';
import PropTypes from 'prop-types';
import BannerButton from './BannerButton';

const BannerSmallContainer = ({ heading, subheading, buttonText, onClick }) => {
  return (
    <div className="w-full sm:w-[38rem] h-auto min-h-[19.75rem] bg-transparent p-5 flex flex-col justify-between text-left">
      <div className="space-y-6">
        <h1 className="font-roboto font-bold text-2xl sm:text-3xl leading-9 sm:leading-10 tracking-tight text-white">
          {heading}
        </h1>
        <p className="font-roboto font-medium text-base leading-7 text-white max-w-[30rem]">
          {subheading}
        </p>
      </div>
      <div className="mt-12 flex justify-start">
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