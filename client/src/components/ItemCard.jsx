import React from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { addToCart } from '../../src/redux/cartSlice';
import { toast } from 'sonner';
import { calculateCPUScore, calculateGPUScore, calculateRAMScore, calculatePrebuiltPcScore } from '../utils/scoreCalculator';

const ItemCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // 
    e.preventDefault();  //
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`, {
      duration: 2000,
      style: {
        background: '#a036b2	',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  // Calculate score based on product type
  const calculateScore = () => {
    switch (product.type) {
      case 'processor':
        return calculateCPUScore({
          cores: product.coreCount,
          threads: product.threadCount,
          baseClock: product.baseClock,
          boostClock: product.boostClock,
          brand: product.manufacturer
        });
      case 'gpu':
        // Convert series format from product data to match score calculator format
        let normalizedSeries = '';
        if (product.series) {
          if (product.series.includes('rtx_2000')) normalizedSeries = 'RTX 20';
          else if (product.series.includes('rtx_3000')) normalizedSeries = 'RTX 30';
          else if (product.series.includes('rtx_4000')) normalizedSeries = 'RTX 40';
          else if (product.series.includes('rx_6000')) normalizedSeries = 'RX 6000';
          else if (product.series.includes('rx_7000')) normalizedSeries = 'RX 7000';
          else if (product.series.includes('gtx')) normalizedSeries = 'GTX';
        }

        // Ensure numeric values are properly parsed and handle undefined/null cases
        const vramGB = parseFloat(product.vram) || 0;
        const boostClockMHz = parseFloat(product.boostClock) || 0;
        const cores = parseFloat(product.cudaCores) || 0;

        // Log the values for debugging
        console.log('GPU Score Calculation:', {
          vramGB,
          boostClockMHz,
          cores,
          series: normalizedSeries,
          brand: product.manufacturer
        });

        return calculateGPUScore({
          vramGB,
          boostClockMHz,
          cores,
          series: normalizedSeries,
          brand: product.manufacturer
        });
      case 'ram':
        return calculateRAMScore({
          sizeGB: product.memoryCapacity,
          speedMHz: product.memorySpeed,
          type: product.memoryType
        });
      case 'prebuild':
        const scores = calculatePrebuiltPcScore(product);
        return scores.total;
      default:
        return null;
    }
  };

  const score = calculateScore();

  // Log the final score for debugging
  if (product.type === 'gpu' || product.type === 'prebuild') {
    console.log(`Final ${product.type.toUpperCase()} Score:`, score);
  }

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

        {/* Score Section */}
        {score && !isNaN(score) && (
          <div className="my-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
              <span className="text-sm font-semibold">Score: {score.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Price Section */}
        <p className="my-2 text-2xl md:text-xl sm:text-lg font-bold text-gray-900">
          {product.price} LKR
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
