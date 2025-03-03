import React from 'react'
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Filteringsystem from './components/Filteringsystem'
import Product_item_grid from './components/Product_item_grid'





export default function Productcategorypage() {
  return (
    <div>
      <Navbar></Navbar>

      
      <p className='ml-52 mt-10 mb-[-26px] text-l'>All Products..</p>
      
      <Filteringsystem></Filteringsystem>

      <Product_item_grid></Product_item_grid>
            
    
    
          
    </div>
  )
}
