import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';







export default function Itemspecs() {




  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;
  


  var spec1; //x
  var spec2; //y
  var spec3; //z
  var spec4; //p
  var spec5; //q   for warranty
  var spec6; //

  var x;
  var y;
  var z;
  var p;
  var q;
  var r;

  switch (product.type) {
    case "graphiccard":

       spec1 = "Brand:";
       spec2 = "Capacity:";
       spec3 = "PCI:";
       spec4 = "Speed:";
       spec5 ="Warranty:";
       spec6 = "Oveclock Speed:"

      x = product.manufacturer;
      y = product.capacity;
      z = product.pcibus;
      p = product.pcibus;
      q = product.warranty;
      r = product.warranty

      
      break;


      case "processor":
        spec1 = "Brand:";  //x
        spec2 = "Cores:";  //y
        spec3 = "Threads:";  //z
        spec6 = "Frequency:"  //r
        spec4 = "Cache:";  //p
        spec5 ="Warranty:";  //q
     
 
       x = product.brand;
       y = product.cores;
       z = product.threads;
       r = product.cache;
       p = product.speed;
       q = product.warranty;
    
        break;

        case "ram":
          spec1 = "Brand:";  //x
          spec2 = "Capacity:";  //y
          spec3 = "Type:";  //z
          spec6 = "Speed:"  //r
          spec4 = "Cache:";  //p
          spec5 ="Warranty:";  //q
       
   
         x = product.manufacturer;
         y = product.memoryCapacity;
         z = product.memoryType;
         r = product.memorySpeed;
         p = product.memoryType;
         q = product.memoryCapacity;
      
          break;
                    
          
  
    default:
      break;
  }


  return (

    <div className="flex justify-end w-full">
      <div className="w-full md:mr-[50px] lg:w-1/2 xl:w-4/5 md:p-6 lg:p-8 text-gray-900">
        <h2 className="pb-3 text-base md:text-lg lg:text-3xl font-semibold">
          {product.name}
        </h2>

        <div className="mt-2 space-y-4 text-xs md:text-sm lg:text-base">
          <p><span className="font-bold">{spec1}</span> {x}</p>
          <p><span className="font-bold">{spec2}</span> {y}</p>
          <p><span className="font-bold">{spec3}</span> {z}</p>
          <p><span className="font-bold">{spec4}</span> {p}MB</p>
          <p><span className="font-bold">{spec6}</span> {r}GHz</p>
          <p><span className="font-bold">{spec5}</span> {q} Years</p>
        </div>
   

        <div className="mt-8 text-lg md:text-xl lg:text-2xl font-bold">
          {product.price} LKR
        </div>

        <div className="mt-5">
          <span className="inline-block bg-blue-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
            {product.quantity> 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-4 flex items-center space-x-3">
          <input
            type="number"
            defaultValue="1"
            min="1"
            className="w-12 md:w-14 lg:w-16 h-8 md:h-9 border rounded-lg text-center"
          />
          <button className="px-3 py-2 md:px-4 md:py-2 bg-black text-white text-xs md:text-sm font-medium rounded-lg hover:bg-gray-800 transition">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
