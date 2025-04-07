import React from 'react';
import Rating from '@mui/material/Rating'; 








export default function Reviewcardhome({ name="thamoj dinujaya", image="/pc1.png", description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...", rating='3' }) {
  return (



    <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-4">
      
      
      <div className="flex items-center mb-2">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />


        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <Rating name="read-only" value={rating} readOnly /> 
        </div>
      </div>


      <p className="text-gray-700">{description}</p>

    </div>
  );
};





///this is only for home part 4 componet..
//the ratings is not working sometimes..

//<Reviewcardhome name='thamoj' image='src' discription='sdasdasdasdasd' rating='5'>