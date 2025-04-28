import React from 'react';
import PropTypes from 'prop-types';
import { calculatePrebuiltPcScore } from '../../utils/scoreCalculator';
import { toast } from 'sonner';

function PrebuiltPcPopup({ prebuiltPcs, budget, highestGameScore, onClose }) {
  const filteredPrebuilds = prebuiltPcs
    .map((pc) => {
      const scores = calculatePrebuiltPcScore(pc);
      return { ...pc, scores };
    })
    .filter((pc) => pc.scores.total >= highestGameScore && pc.price <= budget);

  const handleAddToCart = (pc) => {
    console.log(`Added to cart: ${pc.name} (ID: ${pc._id})`);
    toast.success(`${pc.name} added to cart`, {
      duration: 2000,
      style: {
        background: '#a036b2',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 border-2 border-[#D099FE9C] shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-purple-800">Recommended Prebuilt PCs</h2>
          <button
            onClick={onClose}
            className="text-purple-600 hover:text-purple-800"
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
          <div className="grid grid-cols-1 gap-6">
            {filteredPrebuilds.map((pc) => (
              <div key={pc._id} className="w-full border-2 border-[#D099FE9C] rounded-2xl shadow-lg p-6 text-center relative transition-all hover:shadow-xl hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {pc.imgUrls.length > 0 && (
                      <img
                        src={pc.imgUrls[0].url}
                        alt={pc.name}
                        className="w-32 h-32 object-contain rounded-md"
                        loading="lazy"
                      />
                    )}
                    <div className="text-left">
                      <div className="bg-[#d9a8ff1C] text-black -mx-4 my-2 p-2">
                        <h3 className="text-xl font-semibold">{pc.name}</h3>
                      </div>
                      <p className="text-lg font-bold text-gray-900 my-1">Price: {pc.price.toLocaleString()} LKR</p>
                      <p className="text-md text-purple-700">Total Score: {pc.scores.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        CPU: {pc.scores.cpu.toFixed(2)} | GPU: {pc.scores.gpu.toFixed(2)} | RAM: {pc.scores.ram.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(pc)}
                    className="bg-[#7315E5] hover:bg-[#5A0DB2] text-white font-bold py-3 px-4 rounded text-lg mt-2 md:mt-0"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center py-4">No prebuilt PCs found within your budget that meet the required performance.</p>
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