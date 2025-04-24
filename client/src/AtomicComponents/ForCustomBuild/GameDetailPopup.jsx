import React from 'react';
import PropTypes from 'prop-types';

function GameDetailPopup({ game, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{game.name}</h2>
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
          <div className="mb-4">
            <img
              src={game.image}
              alt={game.name}
              className="w-2/3 h-auto rounded-lg mx-auto"
              loading="lazy"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700">{game.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Total Performance Score</h3>
            <p className="text-gray-700">
              Score: {game.scores?.total ? game.scores.total.toFixed(2) : 'N/A'}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Recommended Scores</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-700">CPU Score</p>
                <p className="font-medium">
                  {game.scores?.cpu ? game.scores.cpu.toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-700">GPU Score</p>
                <p className="font-medium">
                  {game.scores?.gpu ? game.scores.gpu.toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-700">RAM Score</p>
                <p className="font-medium">
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