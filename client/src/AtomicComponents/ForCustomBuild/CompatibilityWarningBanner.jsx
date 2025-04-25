import React from 'react';
import PropTypes from 'prop-types';

const CompatibilityWarningBanner = ({
  warningText = "Warning! These parts have potential issues or incompatibilities. See details below",
  tdp = "",
  error = true, // Default to true to show the warning message
}) => {
  const handleScrollToWarnings = () => {
    const warningSection = document.getElementById('warning-message-section');
    if (warningSection) {
      warningSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="w-full max-w-[1200px] h-auto rounded-b-[20px] overflow-hidden mx-auto flex flex-row items-stretch flex-wrap"
    >
      {/* Conditional background and message */}
      <div
        className={`${error ? 'bg-red-600' : 'bg-green-600'} text-white py-3 px-4 flex-grow flex-1 basis-[70%] min-w-[200px]`}
      >
        <div className="flex items-center">
          <span className="font-medium mr-1">Compatibility:</span>
          <span>
            {error ? (
              <>
                Warning! These parts have potential issues or incompatibilities.{' '}
                <button
                  onClick={handleScrollToWarnings}
                  className="underline hover:text-gray-200 transition-colors"
                >
                  See details below
                </button>
              </>
            ) : (
              "No issues detected. You are good to go!"
            )}
          </span>
        </div>
      </div>

      {/* TDP section */}
      <div
        className="bg-orange-400 text-white py-3 px-4 flex items-center justify-center font-medium flex-1 basis-[30%] min-w-[150px]"
      >
        Estimated Wattage: {tdp}
      </div>
    </div>
  );
};

CompatibilityWarningBanner.propTypes = {
  warningText: PropTypes.string,
  tdp: PropTypes.string,
  error: PropTypes.bool,
};

export default CompatibilityWarningBanner;