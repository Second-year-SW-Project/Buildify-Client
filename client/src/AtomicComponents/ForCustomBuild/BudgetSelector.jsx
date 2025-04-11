import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function BudgetSelector({ budget, onBudgetChange, onApply }) {
  const [sliderValue, setSliderValue] = useState(budget);
  const sliderRef = useRef(null);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    updateSliderProgress(value);
  };

  const handleSliderChangeEnd = () => {
    onBudgetChange(sliderValue);
  };

  const updateSliderProgress = (value) => {
    if (sliderRef.current) {
      const percentage = (value / 2000000) * 100;
      sliderRef.current.style.setProperty('--range-progress', `${percentage}%`);
    }
  };

  useEffect(() => {
    updateSliderProgress(budget);
  }, [budget]);

  const formatBudget = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-[400px] w-full mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium uppercase text-gray-700">Budget</h3>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">{formatBudget(budget)}LKR</h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm">0LKR</span>
        <div className="w-full mx-4">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max="2000000"
            step="10000"
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderChangeEnd}
            onTouchEnd={handleSliderChangeEnd}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
          />
        </div>
        <span className="text-sm">2,000,000LKR</span>
      </div>
      <div className="mt-6">
        <button
          onClick={onApply}
          className="w-full bg-purple-700 text-white py-3 rounded-lg font-medium text-lg hover:bg-purple-800 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

BudgetSelector.propTypes = {
  budget: PropTypes.number.isRequired,
  onBudgetChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default BudgetSelector;