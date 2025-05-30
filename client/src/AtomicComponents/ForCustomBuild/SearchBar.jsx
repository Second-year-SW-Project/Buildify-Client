import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function SearchBar({ isExpanded, onExpand, onGameSelect }) {
  const [searchTerm, setSearchTerm] = useState('');//Stores the search term
  const [searchResults, setSearchResults] = useState([]);//Stores the search results
  const [showDropdown, setShowDropdown] = useState(false);//Stores the show dropdown
  const [availableGames, setAvailableGames] = useState([]);//Stores the available games
  const [isLoading, setIsLoading] = useState(false);//Stores the loading
  const [error, setError] = useState(null);//Stores the error

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/game/games`, {
          timeout: 5000,//5 seconds timeout
        });//When isExpanded is true, fetch games from the backend
        if (response.data.success) {
          const transformedGames = response.data.games.map((game) => ({
            id: game._id,
            name: game.name,
            description: game.description,
            image: game.image,
            cpu: {
              cores: parseFloat(game.cpu.cores) || 0,
              threads: parseFloat(game.cpu.threads) || 0,
              baseClock: parseFloat(game.cpu.baseClock) || 0,
              boostClock: parseFloat(game.cpu.boostClock) || 0,
              brand: game.cpu.brand || 'Generic',
              cache: parseFloat(game.cpu.cache) || 0,
              tdp: parseFloat(game.cpu.tdp) || 0,
              architecture: game.cpu.architecture || ''
            },
            gpu: {
              series: game.gpu.series || '',
              vramGB: parseFloat(game.gpu.vramGB) || 0,
              boostClockMHz: parseFloat(game.gpu.boostClockMHz) || 0,
              cores: parseFloat(game.gpu.cores) || 0,
              brand: game.gpu.brand || 'Generic',
              memoryBusWidth: parseFloat(game.gpu.memoryBusWidth) || 256,
              memoryType: game.gpu.memoryType || 'GDDR6',
              architecture: game.gpu.architecture || '',
              tdp: parseFloat(game.gpu.tdp) || 0
            },
            ram: {
              sizeGB: parseFloat(game.ram.sizeGB) || 0,
              speedMHz: parseFloat(game.ram.speedMHz) || 0,
              type: game.ram.type || 'DDR4',
              channels: parseFloat(game.ram.channels) || 2,
              latency: parseFloat(game.ram.latency) || 16
            }
          }));//Transforms the games to the desired format
          setAvailableGames(transformedGames);
        } else {
          setError('Failed to fetch games from server');
        }
      } catch (err) {
        console.error('Error fetching games:', err.message);
        setError('Unable to connect to the server. Please try again later.');
      } finally {
        setIsLoading(false);//Sets the loading to false
      }
    };

    if (isExpanded) {
      fetchGames();//On expanded, fetch games
    }
  }, [isExpanded]);

  //When the search term changes, filter the games
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filteredResults = availableGames.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm, availableGames]);

  //When a game is selected, set the search term to empty and close the dropdown
  const handleSelectGame = (game) => {
    onGameSelect(game);
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center bg-purple-700 rounded-full overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-12'
        }`}
      >
        <button
          onClick={onExpand}
          className="flex items-center justify-center text-white h-12 w-12 flex-shrink-0"
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        {isExpanded && (
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-purple-200 outline-none w-full pr-4"
            autoFocus
          />
        )}{/*When the search bar is expanded, show the input field*/}
      </div>
      {isExpanded && showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10 max-h-96 overflow-y-auto">
          {isLoading ? (
            <p className="p-3 text-gray-500">Loading games...</p>
          ) : error ? (
            <p className="p-3 text-red-500">{error}</p>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((game) => (
                <li
                  key={game.id}
                  className="p-3 hover:bg-purple-50 cursor-pointer flex items-center"
                  onClick={() => handleSelectGame(game)}
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-10 h-10 object-cover rounded mr-3"
                    loading="lazy"
                  />
                  <span>{game.name}</span>
                  {/*Displays the game name*/}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-gray-500">No games found</p>
          )}
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  onGameSelect: PropTypes.func.isRequired,
};

export default SearchBar;