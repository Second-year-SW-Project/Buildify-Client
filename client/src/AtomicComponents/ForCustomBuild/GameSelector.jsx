import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';
import SearchBar from './SearchBar';
import GameDetailPopup from './GameDetailPopup';
import { calculateGameScore } from '../../utils/scoreCalculator';

function GameSelector({ selectedGames, onGameSelect, onRemoveGame }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);//State for the search bar
  const [selectedGame, setSelectedGame] = useState(null);//State for the selected game
  const [showGameDetail, setShowGameDetail] = useState(false);//State for the game detail popup
  const searchRef = useRef(null);//Ref for the search bar

  // Calculate highest score
  const highestScore = selectedGames.length > 0 
    ? Math.max(...selectedGames.map(game => game.scores?.total || 0))
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
  }, [searchRef]);//Adds an event listener to the document to close the search bar when the user clicks outside of it

  const handleGameSelectInternal = (game) => {
    // Calculate scores using the calculateGameScore function
    const scores = calculateGameScore(game);
    
    const gameWithScores = { 
      ...game, 
      scores
    };
    
    onGameSelect(gameWithScores);//Passes the game with the scores to the parent component
    setIsSearchExpanded(false);//Closes the search bar
  };

  const handleGameCardClick = (game) => {
    setSelectedGame(game);
    setShowGameDetail(true);
  };//Handles the game card click

  const handleCloseDetail = () => {
    setShowGameDetail(false);
  };//Handles the close detail

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium">Pick your favorite games</h2>
          {selectedGames.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Highest Score: <span className="font-semibold">{highestScore.toFixed(2)}</span>
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