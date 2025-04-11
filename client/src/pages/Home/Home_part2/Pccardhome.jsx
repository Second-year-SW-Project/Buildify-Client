import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function PCcardhome({ id,name, image, specs = "RTX 4060 Ti, Ryzen 7 5800X", price }) {

  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate(`/itempage/${id}`); // Redirect to ItemPage
  };



  return (
    <div className="w-full max-w-[280px] bg-white shadow-lg rounded-lg overflow-hidden p-4 text-center border border-gray-200 
                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img 
        src={image} 
        alt={name} 
        className="size-[250px] object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
      />

      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

      <p className="text-gray-500 text-sm">{specs}</p>

      <p className="text-lg font-bold mt-2 text-blue-600">{price}</p>

      <Button
        variant="contained"
        color="primary"
        className="!mt-4 !w-full transition-transform duration-300 hover:scale-105"
        onClick={handleShopClick}

      >
        Shop
      </Button>
    </div>
  );
}
