import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Itemcard from '../../../components/ItemCard';

export default function Product_item_grid({ filters, allProducts, setAllProducts }) {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products for the category once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product/filter?attribute=type&value=${categoryName}`
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryName, setAllProducts]);

  // Apply filters on client-side
  useEffect(() => {
    let filtered = [...allProducts];

    // Brand filter
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter(product =>
        filters.brand.includes(product.manufacturer?.toUpperCase())
      );
    }

    //size filter/capacity filter
    if (filters.capacity && filters.capacity.length > 0) {
      filtered = filtered.filter(product =>
        filters.capacity.includes(product.vram)
      );
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        return price >= min && price <= max;
      });
    }

    // TODO: Add other common filters here for GPU, RAM, Processor

    setFilteredProducts(filtered);
  }, [filters, allProducts]);

  if (!filteredProducts) return <div>Loading...</div>;









  return (


    <div className=" ml-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-y-10 gap-x-12 px-9 py-9">
      {filteredProducts.map(product => (
        <Itemcard key={product._id} product={product} />
      ))}
    </div>


  );




}
