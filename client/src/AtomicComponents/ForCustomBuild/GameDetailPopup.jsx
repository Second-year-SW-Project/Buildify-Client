import React from 'react';
import PropTypes from 'prop-types';

function GameDetailPopup({ game, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] overflow-y-auto shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{game.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-8">
            <img
              src={game.image}
              alt={game.name}
              className="w-full max-w-2xl h-auto rounded-xl mx-auto shadow-md"
              loading="lazy"
            />
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Description</h3>
            <p className="text-gray-700 leading-relaxed">{game.description}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Total Performance Score</h3>
            <p className="text-2xl font-bold text-purple-700">
              {game.scores?.total ? game.scores.total.toFixed(2) : 'N/A'}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Recommended Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-purple-700 mb-1">CPU Score</p>
                <p className="text-xl font-bold text-purple-800">
                  {game.scores?.cpu ? game.scores.cpu.toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-purple-700 mb-1">GPU Score</p>
                <p className="text-xl font-bold text-purple-800">
                  {game.scores?.gpu ? game.scores.gpu.toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-purple-700 mb-1">RAM Score</p>
                <p className="text-xl font-bold text-purple-800">
                  {game.scores?.ram ? game.scores.ram.toFixed(2) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

GameDetailPopup.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    scores: PropTypes.shape({
      cpu: PropTypes.number,
      gpu: PropTypes.number,
      ram: PropTypes.number,
      total: PropTypes.number,
    }),
    cpu: PropTypes.shape({
      cores: PropTypes.number.isRequired,
      threads: PropTypes.number.isRequired,
      baseClock: PropTypes.number.isRequired,
      boostClock: PropTypes.number.isRequired,
    }).isRequired,
    gpu: PropTypes.shape({
      series: PropTypes.string.isRequired,
      vramGB: PropTypes.number.isRequired,
      boostClockMHz: PropTypes.number.isRequired,
      cores: PropTypes.number.isRequired,
    }).isRequired,
    ram: PropTypes.shape({
      sizeGB: PropTypes.number.isRequired,
      speedMHz: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GameDetailPopup;