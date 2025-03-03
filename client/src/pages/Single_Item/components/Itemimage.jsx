import React, { useState } from "react";

export default function ItemImage({ images }) {
  const [mainImage, setMainImage] = useState(images[0]); // Default main image

  return (
    <div className="flex flex-col items-center w-full max-w-lg  ml-20 mt-10">
      {/* Main Image */}
      <div className="border rounded-lg p-4 w-full max-w-[450px]">
        <img 
          src={mainImage} 
          alt="Main Product" 
          className="w-full h-auto max-h-[450px] object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`border-2 rounded-lg p-2 transition ${
              mainImage === img ? "border-black" : "border-gray-300 hover:border-gray-500"
            }`}
          >
            <img 
              src={img} 
              alt="sub image"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Example Usage
/*
<ItemImage images={[
  "/images/cpu1.png",
  "/images/cpu2.png"
]} />
*/
