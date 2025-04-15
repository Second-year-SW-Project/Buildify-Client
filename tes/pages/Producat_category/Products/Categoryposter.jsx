import React from "react";
import { useEffect, useState } from 'react';
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

  switch (categoryName) {
    case "gpu":
      title = "GRAPHIC CARDS";
      image = '../../../../public/categorybg.jpg';
      break;

    case "ram":
      title = "RAM CARDS";
      image = '../rambanner.jpg';

      break;

    case "processor":
      title = "PROCESSORS";
      image = '../processorbannernew.jpg';
      break;

    case "motherboard":
      title = "MOTHERBOARDS";
      break;

    case "laptop":
      title = "LAPTOPS";
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


