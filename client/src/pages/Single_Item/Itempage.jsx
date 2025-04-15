import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Itempath from './components/Itempath';
import axios from 'axios';

import Itemimage from './components/Itemimage';
import ProductTabs from './components/Itemdiscription';
import Itemrelates from './components/Itemrelates';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import Itemspecs from './components/Itemspecs';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';












export let x = 1;





export default function Itempage() {


  const { id } = useParams(); {/* get paticular data from id */ }
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await fetch(`api/product/${id}`);
        // const data = await response.text();
        // setProduct(data);
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  product.id = id; // Add the id to the product object
  console.log("helloopooooooo");

  console.log(product.id);

  const handleAddToCart = () => {

    console.log(product.type);
    console.log(product.name);
    console.log(product.price);

    console.log(product.id);


    dispatch(addToCart(
      {
        _id: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
        image: product.imgUrls?.[0]?.url,
        quantity: 1, // Default quantity to 1
      }
    ));
    alert(`${product.name} added to cart`);
  };

  //console.log(id); // Log the product data to the console
  // Log the product data to the console

  var spec1; //x
  var spec2; //y
  var spec3; //z
  var spec4; //p
  var spec5; //q   
  var spec6; //r    //for warranty

  var x;
  var y;
  var z;
  var p;
  var q;
  var r;

  switch (product.type) {
    case "gpu":

      spec1 = "Brand:";
      spec2 = "Capacity:";
      spec3 = "PCI:";
      spec4 = "Series:";
      spec5 = "Power Connectors:"
      spec6 = "Warranty:";

      x = product.manufacturer;
      y = product.vram + " GB";
      z = product.interfaceType;
      p = product.series;
      q = product.powerConnectors;
      r = product.warranty;



      break;


    case "processor":
      spec1 = "Brand:";  //x
      spec2 = "Cores:";  //y
      spec3 = "Threads:";  //z
      spec4 = "Boost Clock:"  //p
      spec5 = "Socket Type:";  //q
      spec6 = "Warranty:";  //r


      x = product.manufacturer;
      y = product.coreCount;
      z = product.threadCount;
      p = product.boostClock + " GHz";
      q = product.socketType;
      r = product.warranty;

      break;

    case "ram":
      spec1 = "Brand:";  //x
      spec2 = "Capacity:";  //y
      spec3 = "Type:";  //z
      spec4 = "Speed:"  //p
      spec5 = "Cache:";  //q
      spec6 = "Warranty:";  //r


      x = product.manufacturer;
      y = product.memoryCapacity + " GB";
      z = product.memoryType;

      p = product.memoryType + " MHz";
      q = product.memoryCapacity + " MB";
      r = product.warranty;

      break;


    case "laptop":
      spec1 = "Brand:";  //x
      spec2 = "Ram:";  //y
      spec3 = "Graphic Card:";  //z
      spec4 = "Storage::"  //p
      spec5 = "Resolution:";  //q
      spec6 = "Warranty:";  //r


      x = product.manufacturer;
      y = product.ram + " GB";
      z = product.graphicCard;

      p = product.storage;
      q = product.resolution;
      r = product.warranty;

      break;




    default:
      break;
  }



  return (
    <div>
      <div>
        <Navbar />

        <Itempath />
        <div>{/* <h1>{product.name}</h1> */}</div>

        <div>
          <Itemimage />{" "}
          {/*individual item images are Here..basically 2 images */}
        </div>

        <div className="mt-[-560px] ml-[550px]">
          <div className="flex justify-end w-full">
            <div className="w-full md:mr-[50px] lg:w-1/2 xl:w-4/5 md:p-6 lg:p-8 text-gray-900">
              <h2 className="pb-3 text-base md:text-lg lg:text-3xl font-semibold">
                {product.name}
              </h2>

              <div className="mt-2 space-y-4 text-xs md:text-sm lg:text-base">
                <p>
                  <span className="font-bold">{spec1}</span> {x}
                </p>
                <p>
                  <span className="font-bold">{spec2}</span> {y}
                </p>
                <p>
                  <span className="font-bold">{spec3}</span> {z}
                </p>
                <p>
                  <span className="font-bold">{spec4}</span> {p}
                </p>
                <p>
                  <span className="font-bold">{spec5}</span> {q}
                </p>
                <p>
                  <span className="font-bold">{spec6}</span> {r} Years
                </p>
              </div>

              <div className="mt-8 text-lg md:text-xl lg:text-2xl font-bold">
                {product.price} LKR
              </div>

              <div className="mt-5">
                <span className="inline-block bg-blue-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-12 md:w-14 lg:w-16 h-8 md:h-9 border rounded-lg text-center"
                />
                <button
                  className="px-3 py-2 md:px-4 md:py-2 bg-black text-white text-xs md:text-sm font-medium rounded-lg hover:bg-gray-800 transition"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-44 mb-9">
          <ProductTabs />
        </div>

        <div>
          <Itemrelates category={product.type} />
        </div>

        <Footer />
      </div>
    </div>
  );
}


