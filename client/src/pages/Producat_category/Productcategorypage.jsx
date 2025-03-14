import React from 'react'
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Filteringsystem from './components/Filteringsystem'
import Product_item_grid from './components/Product_item_grid'
import Categoryposter from './components/Categoryposter'



export default function Productcategorypage() {
  return (
    <div>
      <Navbar></Navbar>
      <Categoryposter></Categoryposter>
      
      

      
      <p className='ml-52 mt-5 mb-[-26px] text-l font-semibold'>All Products</p>
      
      <Filteringsystem></Filteringsystem>

      <Product_item_grid></Product_item_grid>
            
    
    
          
    </div>
  )
}
