import React from "react";


const Laptopcategoryposter = () => {






// switch case for category title and poster changing //


  var image = "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?cs=srgb&dl=pexels-veeterzy-303383.jpg&fm=jpg";  //category background image








  return (
    <div
      className="relative w-full h-40 md:h-42 lg:h-34 flex items-center justify-center bg-cover bg-center text-white font-bold text-3xl md:text-3xl lg:text-4xl shadow-xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="relative z-10">LAPTOPS</h1>
    </div>
  );
};

export default Laptopcategoryposter;


