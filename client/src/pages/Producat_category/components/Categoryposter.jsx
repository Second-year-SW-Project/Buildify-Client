import React from "react";

const Categoryposter = ({ categoryName = 'GRAPHIC CARDS', imageSrc='./categorybg.jpg' }) => {
  return (
    <div
      className="relative w-full h-40 md:h-42 lg:h-34 flex items-center justify-center bg-cover bg-center text-white font-bold text-3xl md:text-3xl lg:text-4xl shadow-xl"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="relative z-10">{categoryName}</h1>
    </div>
  );
};

export default Categoryposter;


//how to use
//default text is graphic card and default image is categorybg.jpg in public folder//default means there are no props called in your component..


//if you want to pass props-->
//  <Categoryposter categoryName = 'processors'  imagesrc = './processor.jpg' />