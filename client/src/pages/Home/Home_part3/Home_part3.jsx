import React from "react";
import { useNavigate } from "react-router-dom";

export default function PCBuilderBanners() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: "url('../../../../public/modeposter.png')",
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
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">Advanced Builder</h2>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              Custom built to order. Our PC builder lets you choose the
              components you need to outclass your adversaries.
            </p>
            <button
              onClick={() => navigate("/advanced-builder")}
              className="bg-white text-red-700 font-semibold text-sm px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Customize Now
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center items-center">
            <img
              src="https://content.ibuypower.com/cdn-cgi/image/width=750,format=auto,quality=75/https://content.ibuypower.com//Images/en-US/Lobby/custom_main_1200x688.png?v=d06c6502df2519b6df5c0969713974d01c085129"
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
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">Easy Builder</h2>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              Custom build the perfect gaming PC based on the games you play and
              we will ship it out in 5 business days!
            </p>
            <button
              onClick={() => navigate("/easy-builder")}
              className="bg-white text-red-700 font-semibold text-sm px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Customize Now
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center items-center">
            <img
              src="https://content.ibuypower.com/cdn-cgi/image/width=750,format=auto,quality=75/https://content.ibuypower.com//Images/en-US/Lobby/ezb_main_nocut.png?v=d06c6502df2519b6df5c0969713974d01c085129"
              alt="Easy Builder"
              className=" max-w-full h-64 md:h-72 lg:h-80 object-contain"
            />
          </div>
        </div>

      </div>
    </div>
    
  );
}
