import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'; // Adjust the path to your Navbar component
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer'; // Adjust the path to your Footer component
import BannerLargeContainer2 from '../../AtomicComponents/ForCustomBuild/BannerLargeContainer2';
import easyModeImage from '../../assets/images/ForCustomBuild/easy-mode.png';
import advancedModeImage from '../../assets/images/ForCustomBuild/advanced-mode.png';

const ModeSelectPage = () => {
  const navigate = useNavigate();

  const handleEasyModeClick = () => {
    navigate('/selectgame');
  };

  const handleAdvancedModeClick = () => {
    navigate('/chooseparts');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <div className="text-center p-5 flex-grow w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-roboto font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight text-[#7B16AE] mb-8 sm:mb-16 mt-8 sm:mt-16">
            Select Your Build Mode
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mb-12 sm:mb-20 max-w-3xl mx-auto">
            Choose how you want to build your perfect PC
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20 px-4 sm:px-6 w-full">
          <BannerLargeContainer2
            heading="EASY MODE"
            subheading="Find your perfect gaming PC—choose your favorite games, set your budget, and let us do the rest!"
            buttonText="Start"
            imageUrl={easyModeImage}
            className="transform hover:scale-105 transition-transform duration-300"
            onClick={handleEasyModeClick}
          />
          <BannerLargeContainer2
            heading="ADVANCED MODE"
            subheading="Build your ultimate custom PC—choose your components, and we'll ensure everything fits and works perfectly!"
            buttonText="Start"
            imageUrl={advancedModeImage}
            className="transform hover:scale-105 transition-transform duration-300"
            onClick={handleAdvancedModeClick}
          />
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default ModeSelectPage;