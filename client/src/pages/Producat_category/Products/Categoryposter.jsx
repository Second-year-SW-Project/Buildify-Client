import React from "react";
import  { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios"

const Categoryposter = () => {



  const { categoryName } = useParams(); // Get the category name from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;




  // Fetch products by category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/filter?attribute=type&value=${categoryName}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1c1e] text-white">
        
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6"></div>
          <p className="text-xl font-semibold">Loading search results...</p>
        </div>
        
      </div>
    );
  }
  






// switch case for category title and poster changing //


  var title = "";  //category title
  var image = "";  //category background image
  var lapimage = "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?cs=srgb&dl=pexels-veeterzy-303383.jpg&fm=jpg";  //category background image


  switch (categoryName) {
    case "gpu":
      title = "GRAPHIC CARDS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421091/categorybg_ktodaq.jpg";
      break;

    case "ram":
      title = "RAM CARDS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421097/rambanner_rbd4zc.jpg";

      break;

    case "processor":
      title = "PROCESSORS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745692627/ChatGPT_Image_Apr_26_2025_10_22_07_PM_mmkefp.png";
      break;

    case "motherboard":
      title = "MOTHERBOARDS";
      image ="https://res.cloudinary.com/ddstqdrhm/image/upload/v1745692893/564101_nlbcea.jpg";

      break;

    case "power":
      title = "POWER SUPPLYS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745693086/173624657469812_kusrs8.jpg";

      break;

    case "storage":
      title = "STORAGE";

      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421094/storagebanner_o3wqxs.png";

      break;

    case "casing":
      title = "CASINGS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421087/casingbanner2_tqzioi.jpg";


      break;

    case "laptop":
      title = "LAPTOPS";
      image = lapimage;
      break;
    case "prebuild":
      title = "PRE BUILTS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421092/casingbanner_ppinjp.jpg";
      break;


      case "expansion_network":
        title = "EXPANTIONS";
        image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745693257/motherboard-with-peripherals-ujgn7eghtrr0jtyp_1_iohfuk.jpg";
        break;  


      case "monitor":
        title = "MONITORS";
        image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1748704205/gaming-room-dual-stacked-monitors-jjcy7wy2dh792fct_udd2kq.jpg";
        break; 


    default:
      break;
  }











  return (
    <div
      className="relative w-full h-40 md:h-42 lg:h-34 flex items-center justify-center bg-cover bg-center text-white font-bold text-3xl md:text-3xl lg:text-4xl shadow-xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="relative z-10">{title}</h1>
    </div>
  );
};

export default Categoryposter;


