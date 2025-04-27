import React from "react";
import  { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios"

const Categoryposter = () => {



  const { categoryName } = useParams(); // Get the category name from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  // Fetch products by category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product/filter?attribute=type&value=${categoryName}`
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
    return <div>Loading...</div>;
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
      //image = "https://getwallpapers.com/wallpaper/full/b/7/d/563146.jpg";
      //image = "https://getwallpapers.com/wallpaper/full/c/3/6/563558.jpg";
      break;

    case "power":
      title = "POWER SUPPLYS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745693086/173624657469812_kusrs8.jpg";
      //image = "../../../../public/powersupplybanner.jpg";
      //image = "https://pctekreviews.com/Reviews/ROG_THOR_1200/35.jpg";
      break;

    case "storage":
      title = "STORAGE";
      //image = "https://www.cyberpowerpc.com/template/2022/page/WD/Black/images/c1.jpg?v2";
      //image = "https://www.techreviewer.com/virt/content/media/shared-graphics/tr-attr/ssd/1280x512-samsung-970-evo-ssd-m2-nvme_c9afca8c876d28d647914bb5eb7f5d40.webp/how-much-storage-for-gaming.webp";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421094/storagebanner_o3wqxs.png";

      break;

    case "casing":
      title = "CASINGS";
      image = "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421087/casingbanner2_tqzioi.jpg";
      //image = "../../../../public/casingbanner.jpg";

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


