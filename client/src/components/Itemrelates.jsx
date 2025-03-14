import React from 'react'




export default function Itemrelates() {
    const products = [
      {
        id: 1,
        name: "Intel® Core Ultra 7 Processor 265K",
        brand: "Intel",
        price: "134,000 LKR",
        image: "/images/ultra7.png",
      },
      {
        id: 2,
        name: "Intel Core Ultra 5 Processor 245K",
        brand: "Intel",
        price: "110,000 LKR",
        image: "/images/ultra5.png",
      },
      {
        id: 3,
        name: "Intel Core i9 14900K (36M Cache, up to 6.00 GHz)",
        brand: "Intel",
        price: "165,000 LKR",
        image: "/images/i9-14900K.png",
      },
      {
        id: 4,
        name: "Intel Core i9 14900KS (36M Cache, up to 6.20 GHz)",
        brand: "Intel",
        price: "225,000 LKR",
        image: "/images/i9-14900KS.png",
      },
      {
        id: 5,
        name: "MSI GEFORCE RTX™ 3060 GAMING X 12GB",
        brand: "ASUS",
        price: "136,000 LKR",
        image: "/images/rtx-3060.png",
      },
    ];
  
    return (
      <div className="ml-35 mr-35 px-6 py-12">
        {/* Header */}
        <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-500 py-3 px-6 rounded-md text-center mb-8">
          Related Products
        </h2>
  
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow-md rounded-lg text-center hover:shadow-xl transition duration-300"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
  
              {/* Product Name */}
              <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                {product.name}
              </h3>
  
              {/* Brand */}
              <p className="text-xs text-gray-600 mt-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
  
              {/* Price */}
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
