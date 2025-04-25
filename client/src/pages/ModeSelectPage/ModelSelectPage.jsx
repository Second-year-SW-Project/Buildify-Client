import React from 'react';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'; // Adjust the path to your Navbar component
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer'; // Adjust the path to your Footer component
import BannerLargeContainer2 from '../../AtomicComponents/ForCustomBuild/BannerLargeContainer2';
import easyModeImage from '../../assets/images/ForCustomBuild/easy-mode.png';
import advancedModeImage from '../../assets/images/ForCustomBuild/advanced-mode.png';

const ModeSelectPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <div className="text-center p-5 flex-grow">
        <h1 className="font-roboto font-normal text-4xl sm:text-6xl lg:text-8xl leading-auto text-[#7B16AE] mb-10 sm:mb-20">
          Select a Mode
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-20">
          <BannerLargeContainer2
            heading="EASY MODE"
            subheading="Find your perfect gaming PC—choose your favorite games, set your budget, and let us do the rest!"
            buttonText="Start"
            imageUrl={easyModeImage}
          />
          <BannerLargeContainer2
            heading="ADVANCED MODE"
            subheading="Build your ultimate custom PC—choose your components, and we'll ensure everything fits and works perfectly!"
            buttonText="Start"
            imageUrl={advancedModeImage}
          />
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default ModeSelectPage;