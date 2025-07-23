import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import BannerLargeContainer2 from '../../AtomicComponents/ForCustomBuild/BannerLargeContainer2';
import easyModeImage from '../../assets/images/ForCustomBuild/easy-mode.png';
import advancedModeImage from '../../assets/images/ForCustomBuild/advanced-mode.png';

const ModeSelectPage = () => {
  const navigate = useNavigate();

  //Handles the easy mode click by navigating to the select game page
  const handleEasyModeClick = () => {
    navigate('/selectgame');
  };

  //Handles the advanced mode click by navigating to the choose parts page
  const handleAdvancedModeClick = () => {
    navigate('/chooseparts');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#7B16AE] mb-4 sm:mb-6">
              Select Your Build Mode
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Choose how you want to build your perfect PC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
            <BannerLargeContainer2
              heading="EASY MODE"
              subheading="Find your perfect gaming PC choose your favorite games, set your budget, and let us do the rest!"
              buttonText="Start"
              imageUrl={easyModeImage}
              className="w-full transform hover:scale-105 transition-transform duration-300"
              onClick={handleEasyModeClick}
            />
            <BannerLargeContainer2
              heading="ADVANCED MODE"
              subheading="Build your ultimate custom PC choose your components, and we'll ensure everything fits and works perfectly!"
              buttonText="Start"
              imageUrl={advancedModeImage}
              className="w-full transform hover:scale-105 transition-transform duration-300"
              onClick={handleAdvancedModeClick}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModeSelectPage;