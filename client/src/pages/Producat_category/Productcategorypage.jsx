import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Filteringsystem from './Products/Filteringsystem';
import Product_item_grid from './Products/Product_item_grid';
import Categoryposter from './Products/Categoryposter';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';




export default function Productcategorypage() {


  const { categoryName } = useParams();                   // ...to pass the category name as a prop to filtering sytem...
  const [filters, setFilters] = useState({});            // ...for storing filters...
  const [allProducts, setAllProducts] = useState([]);    // ...for storing all products for this category...

 
 
 
 
  return (
    <div>



      <Navbar></Navbar>

      <Categoryposter></Categoryposter> 

      <div className='font-bold  ml-[300px] mt-5 -mb-[41px]'>All Products</div>
      
      
      <div className="flex mt-1">
      <div className=''>
      <Filteringsystem     categoryName={categoryName}   setFilters={setFilters}   allProducts={allProducts}></Filteringsystem>
      </div>
      
      <div className=' mt-8 w-full'>
          <Product_item_grid    filters={filters}   allProducts={allProducts}   setAllProducts={setAllProducts}></Product_item_grid>
      </div>


      </div>
      
        <div className='mt-12'>
          <Footer></Footer>
          
        </div>
      
      
    </div>
  );
}
