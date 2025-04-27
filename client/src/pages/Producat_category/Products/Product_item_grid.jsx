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
      filtered = filtered.filter((product) =>
        filters.brand.includes(product.manufacturer?.toUpperCase())
      );
    }





//  ----- FOR VGAS ---------



    //size filter/capacity filter for VGAs
    if (filters.capacity && filters.capacity.length > 0) {
      filtered = filtered.filter((product) =>
        filters.capacity.includes(product.vram)
      );
    }


    // VGA PCI Type filter
if (filters.pciType && filters.pciType.length > 0) {
  filtered = filtered.filter(product =>
    filters.pciType.includes(product.interfaceType?.toUpperCase())
  );
}



//  ----- FOR RAMS ---------

// RAM Memory Capacity filter
if (filters.memoryCapacity && filters.memoryCapacity.length > 0) {
  filtered = filtered.filter(product =>
    filters.memoryCapacity.includes(product.memoryCapacity?.toUpperCase())
  );
}

// RAM Memory Speed filter
if (filters.memorySpeed && filters.memorySpeed.length > 0) {
  filtered = filtered.filter(product =>
    filters.memorySpeed.includes(product.memorySpeed?.toUpperCase())
  );
}



//  ----- FOR PROCCESSORS ---------

// Processor Core Count filter
if (filters.coreCount && filters.coreCount.length > 0) {
  filtered = filtered.filter(product =>
    filters.coreCount.includes(product.coreCount)
  );
}

// Processor Threads filter
if (filters.threadCount && filters.threadCount.length > 0) {
  filtered = filtered.filter(product =>
    filters.threadCount.includes(product.threadCount)
  );
}



















    // Price range filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter((product) => {
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
