import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';

export default function PCcardhome({ product }) {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate(`/itempage/${product.id}`);
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-lg rounded-xl p-4 text-left border border-gray-200 
                transition-transform transform duration-300 hover:scale-105 hover:shadow-xl">
      
      {/* Product Image */}
      <div className="relative mb-4">
        <img 
          src={product?.imgUrls?.[0]?.url} 
          alt={product.name}
          className="w-full h-full rounded-lg"
        />
        
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        {product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}
      </h3>

      {/* name other part */}
      <p className="text-sm text-gray-500 mb-2">
      {product.name.length > 25 ? `${product.name.slice(30, 65)}...` : product.name}
      </p>

      {/* Rating */}
      <div className="flex items-center text-purple-600 text-sm mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} fontSize="small" color={i < product.rating ? "inherit" : "disabled"} />
        ))}
        <span className="ml-1 font-semibold">{product.rating}</span>
        <span className="ml-1 text-gray-400">({product.reviewCount || 716})</span>
      </div>

      {/* Key Specs */}
      <div className="text-sm text-gray-700 mb-2">
        <p className="font-semibold">Key Specs</p>
        <p>Windows 11 Home</p>
        <p>{product.ram}GB</p>
        <p>{(product.graphicCard).toUpperCase()}</p>
        <p>{(product.storage).toUpperCase()}GB HDD</p>
      </div>

      {/* Price */}
      <p className="text-lg font-bold text-gray-800 mb-3">{product.price} LKR</p>

      {/* Shop Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleShopClick}
        className="!bg-purple-600 !text-white hover:!bg-purple-700"
      >
        Shop
      </Button>
    </div>
  );
}
