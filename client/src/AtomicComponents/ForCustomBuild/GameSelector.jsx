import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';
import SearchBar from './SearchBar';
import GameDetailPopup from './GameDetailPopup';
import { calculateCPUScore, calculateGPUScore, calculateRAMScore, calculateTotalScore } from '../../utils/scoreCalculator';

function GameSelector({ selectedGames, onGameSelect, onRemoveGame }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGameDetail, setShowGameDetail] = useState(false);
  const searchRef = useRef(null);

  // Calculate highest score
  const highestScore = selectedGames.length > 0 
    ? Math.max(...selectedGames.map(game => game.scores.total))
    : 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleGameSelectInternal = (game) => {
    const cpuScore = calculateCPUScore(game.cpu);
    const gpuScore = calculateGPUScore(game.gpu);
    const ramScore = calculateRAMScore(game.ram);
    const totalScore = calculateTotalScore(cpuScore, gpuScore, ramScore);

    const gameWithScores = { 
      ...game, 
      scores: {
        cpu: cpuScore,
        gpu: gpuScore,
        ram: ramScore,
        total: totalScore
      }
    };
    onGameSelect(gameWithScores);
    setIsSearchExpanded(false);
  };

  const handleGameCardClick = (game) => {
    setSelectedGame(game);
    setShowGameDetail(true);
  };

  const handleCloseDetail = () => {
    setShowGameDetail(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium">Pick your favorite games</h2>
          {selectedGames.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Highest Score: <span className="font-semibold">{highestScore}</span>
            </p>
          )}
        </div>
        <div ref={searchRef}>
          <SearchBar
            isExpanded={isSearchExpanded}
            onExpand={() => setIsSearchExpanded(true)}
            onGameSelect={handleGameSelectInternal}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => handleGameCardClick(game)}
            onRemove={() => onRemoveGame(game.id)}
          />
        ))}
      </div>
      {showGameDetail && selectedGame && (
        <GameDetailPopup game={selectedGame} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

GameSelector.propTypes = {
  selectedGames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
    })
  ).isRequired,
  onGameSelect: PropTypes.func.isRequired,
  onRemoveGame: PropTypes.func.isRequired, // New prop for removing games
};

export default GameSelector;