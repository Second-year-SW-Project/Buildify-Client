import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import SelectPcHeader from '../../AtomicComponents/ForCustomBuild/SelectPcHeader';
import GameSelector from '../../AtomicComponents/ForCustomBuild/GameSelector';
import BudgetSelector from '../../AtomicComponents/ForCustomBuild/BudgetSelector';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import PrebuiltPcPopup from '../../AtomicComponents/ForCustomBuild/PrebuiltPcPopup';

function SelectGameAndBudgetPage() {
  const [budget, setBudget] = useState(800000);//Initial budget
  const [selectedGames, setSelectedGames] = useState([]);//Initial selected games
  const [showPrebuiltPopup, setShowPrebuiltPopup] = useState(false);//Initial show prebuilt popup
  const [prebuiltPcs, setPrebuiltPcs] = useState([]);//Initial prebuilt PCs
  const [loading, setLoading] = useState(false);//Initial loading
  const [error, setError] = useState(null);//Initial error

  const handleBudgetChange = (newBudget) => {
    setBudget(newBudget);
  };

  const handleGameSelect = (game) => {
    if (!selectedGames.some((g) => g.id === game.id)) {
      setSelectedGames([...selectedGames, game]);
    }
  };//Handles the game select

  const handleRemoveGame = (gameId) => {
    setSelectedGames(selectedGames.filter((game) => game.id !== gameId));
  };//Handles the game remove

  const handleApply = async () => {
    if (selectedGames.length === 0) {
      toast.error('Please select at least one game.', {
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },//Toast style
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const highestGameScore = Math.max(...selectedGames.map((game) => game.scores.total));
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/product/all`);//Fetch all products
      if (response.data.Success) {
        const allProducts = response.data.data;
        const prebuilds = allProducts.filter((product) => product.type === 'prebuild');
        setPrebuiltPcs(prebuilds);
        setShowPrebuiltPopup(true);
      } else {
        setError('Failed to fetch prebuilt PCs');
      }
    } catch (err) {
      console.error('Error fetching prebuilt PCs:', err.message);
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPrebuiltPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-50 py-8 px-4">
        <div className="flex flex-col items-center">
          <SelectPcHeader />
          <div className="w-full max-w-4xl mt-12">
            <GameSelector
              selectedGames={selectedGames}
              onGameSelect={handleGameSelect}
              onRemoveGame={handleRemoveGame}
            />
            <div className="mt-8">
              <BudgetSelector
                budget={budget}
                onBudgetChange={handleBudgetChange}
                onApply={handleApply}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/*Conditional rendering for the prebuilt popup, loading and error*/}
      {showPrebuiltPopup && (
        <PrebuiltPcPopup
          prebuiltPcs={prebuiltPcs}
          budget={budget}
          highestGameScore={Math.max(...selectedGames.map((game) => game.scores.total))}
          onClose={handleClosePopup}
        />
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <p className="text-white text-lg">Loading prebuilt PCs...</p>
        </div>
      )}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}
    </div>
  );
}

export default SelectGameAndBudgetPage;