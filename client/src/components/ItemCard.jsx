import React from 'react';
import { Link } from 'react-router-dom'; // ✅ FIXED
import { useDispatch } from 'react-redux';
import { addToCart } from '../../src/redux/cartSlice';

const ItemCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ✅ Prevent Link click
    e.preventDefault();  // ✅ Prevent navigation
    dispatch(addToCart(product));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="w-full max-w-[350px] md:max-w-[320px] sm:max-w-[300px] border-2 border-[#D099FE9C] rounded-2xl shadow-lg p-6 sm:p-4 text-center relative transition-all cursor-pointer hover:shadow-xl hover:scale-105">

      {/* Wrap only navigable content inside Link */}
      <Link to={`/itempage/${product._id}`} className="block no-underline">

        {/* Stock availability label */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-purple-600 text-sm md:text-xs sm:text-[10px] font-semibold px-3 py-1 rounded-[5px] border-2 border-purple-500">
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img src={product.imgUrls?.[0]?.url} className="w-[90%] md:w-[85%] sm:w-[80%] h-auto transition-all" alt={product.name} />
        </div>

        {/* Item Name Section */}
        <div className="bg-[#d9a8ff1C] text-black -mx-4 my-2 p-2">
          <h2 className="text-xl md:text-lg sm:text-sm font-semibold leading-tight">
            {product.name}
          </h2>
        </div>

        {/* Price Section */}
        <p className="my-2 text-2xl md:text-xl sm:text-lg font-bold text-gray-800">
          ${product.price}
        </p>
      </Link>

      {/* Add to Cart Button OUTSIDE the Link */}
      <div>
        <button
          className="bg-[#7315E5] hover:bg-[#5A0DB2] text-white font-bold py-3 px-4 rounded text-lg md:text-md sm:text-sm mt-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
