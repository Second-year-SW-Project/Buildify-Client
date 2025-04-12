import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Itempath() {


  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(true);
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


  // const getCategoryLabel = (type) => {
  //   for (const category in subCategories) {
  //       const found = subCategories[category].find(item => item.value === type);
  //       if (found) return found.label;
  //   }
  // };


  const myArray = [

    { label: 'Home', href: '/' },
    { label: product.type, href: `/productcategorypage/${product.type}` },
    { label: product.name , href: '#' }


  ] ;

  


  

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;









  return (
    <nav className="text-gray-600  text-sm sm:text-xs md:text-sm flex flex-wrap items-center gap-2 mt-10 ml-14">
      {myArray.map((path, index) => (
        <span key={index} className="flex items-center">
          {index !== 0  && <span className="mx-1">{">"}</span>}
          {path.href !== '#'  ? (
            <a
              href={path.href}
              className="hover:underline hover:text-purple-700" 
            >
              {path.label}
            </a>
          ) : (
            <span className="text-black text-[15px]">{path.label}</span>
          )}
          
        </span>
      ))}
    </nav>
  );
}



