import React from 'react';
import PropTypes from 'prop-types';
import { calculatePrebuiltPcScore } from '../../utils/scoreCalculator';

function PrebuiltPcPopup({ prebuiltPcs, budget, highestGameScore, onClose }) {
  const filteredPrebuilds = prebuiltPcs
    .map((pc) => {
      const scores = calculatePrebuiltPcScore(pc);
      return { ...pc, scores };
    })
    .filter((pc) => pc.scores.total >= highestGameScore && pc.price <= budget);

  const handleAddToCart = (pc) => {
    // Placeholder for cart logic
    console.log(`Added to cart: ${pc.name} (ID: ${pc._id})`);
    alert(`${pc.name} added to cart!`); // Temporary feedback
    // Future: Dispatch to a cart context or send to backend
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Recommended Prebuilt PCs</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {filteredPrebuilds.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredPrebuilds.map((pc) => (
              <div key={pc._id} className="bg-gray-100 rounded-lg p-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {pc.imgUrls.length > 0 && (
                      <img
                        src={pc.imgUrls[0].url}
                        alt={pc.name}
                        className="w-24 h-24 object-cover rounded-md mr-4"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-medium">{pc.name}</h3>
                      <p className="text-gray-700">Price: {pc.price.toLocaleString()} LKR</p>
                      <p className="text-gray-700">Total Score: {pc.scores.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        CPU: {pc.scores.cpu.toFixed(2)} | GPU: {pc.scores.gpu.toFixed(2)} | RAM: {pc.scores.ram.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(pc)}
                    className="bg-purple-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No prebuilt PCs found within your budget that meet the required performance.</p>
        )}
      </div>
    </div>
  );
}

PrebuiltPcPopup.propTypes = {
  prebuiltPcs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imgUrls: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
      cpuCores: PropTypes.string,
      cpuThreads: PropTypes.string,
      cpuBaseClock: PropTypes.string,
      cpuBoostClock: PropTypes.string,
      gpuSeries: PropTypes.string,
      gpuVramGb: PropTypes.string,
      gpuBoostClockMhz: PropTypes.string,
      gpuCores: PropTypes.string,
      ramSizeGb: PropTypes.string,
      ramSpeedMhz: PropTypes.string,
      ramType: PropTypes.string,
    })
  ).isRequired,
  budget: PropTypes.number.isRequired,
  highestGameScore: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PrebuiltPcPopup;