import React from "react";
import { useNavigate } from "react-router-dom";

export default function PCBuilderBanners() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: "url('https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421097/modeposter_hq2tll.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const bannerGradient = {
    background: "linear-gradient(135deg, rgba(151,31,18,1) 15%, rgba(255,255,255,0.48) 100%)",
  };

  return (
    <div
      style={backgroundStyle}
      className="min-h-screen w-full px-4 py-20 flex flex-col items-center gap-8 shadow-black/50 shadow-2xl"
    >
      {/* Banner Box */}
      <div className="w-full max-w-5xl space-y-20">

        {/* Advanced Builder */}
        <div
          style={bannerGradient}
          className="h-auto rounded-md px-12 py-8 flex flex-wrap lg:flex-nowrap items-center text-white shadow-xl backdrop-blur-sm"
        >
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">ADVANCED MODE</h2>
            <p className="mb-8 text-sm md:text-base leading-relaxed">Build your ultimate custom PC—choose your components, and we'll ensure everything fits and works perfectly!
            </p>
            <button
              onClick={() => navigate('/chooseparts')}
              className="w-52 border border-white/80 text-white/90 font-semibold text-base py-2 bg-transparent hover:bg-white/10 transition rounded"
            >
              Customize Now
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/ddstqdrhm/image/upload/v1745693961/custom_main_1200x688_u53mls.avif"
              alt="Advanced Builder"
              className="max-w-full h-64 md:h-72 lg:h-80 object-contain"
            />
          </div>
        </div>

        {/* Easy Builder */}
        <div
          style={bannerGradient}
          className=" h-auto rounded-md px-12 py-8 flex flex-wrap lg:flex-nowrap items-center  text-white shadow-xl backdrop-blur-sm"
        >
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">EASY MODE</h2>
            <p className="mb-8 text-sm md:text-base leading-relaxed">
              Find your perfect gaming PC—choose your favorite games, set your budget, and let us do the rest!
            </p>
            <button
              onClick={() => navigate('/selectgame')}
              className="w-52 border border-white/80 text-white/90 font-semibold text-base py-2 bg-transparent hover:bg-white/10 transition rounded"
            >
              Customize Now
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/ddstqdrhm/image/upload/v1745694053/ezb_main_nocut_yevysk.avif"
              alt="Easy Builder"
              className=" max-w-full h-64 md:h-72 lg:h-80 object-contain"
            />
          </div>
        </div>

      </div>
    </div>

  );
}
