import React from 'react';
import PropTypes from 'prop-types';

function GameCard({ game, onClick, onRemove }) {
  return (
    <div className="bg-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-200 transition-colors flex flex-col h-full relative">
      <div className="relative w-full mb-2 overflow-hidden rounded-md aspect-[4/3]" onClick={onClick}>
        <img
          src={game.image}
          alt={game.name}
          className="object-cover w-full h-full"
          loading="lazy"//Deferring image loading until it is needed
        />
      </div>
      <h3 className="font-medium truncate mt-auto" onClick={onClick}>{game.name}</h3>
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scores: PropTypes.shape({
      cpu: PropTypes.number,
      gpu: PropTypes.number,
      ram: PropTypes.number,
      total: PropTypes.number,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired, // New prop for removal
};

export default GameCard;