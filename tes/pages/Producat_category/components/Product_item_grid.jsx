import React from 'react';
import Itemcard from '../../../components/contents/cards/mediacards/Itemcard';



export default function Product_item_grid() {
  return (
    <div>

        

    <div className="ml-[230px] mt-[-1080px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-10 px-4 py-8">
      
      
      {Array.from({ length: 9 }).map((_, index) => (
        <Itemcard key={index} />
      ))}
    </div>



    </div>
    
  );
}
